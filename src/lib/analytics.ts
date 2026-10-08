// Shared by the React home and the static privacy entry. No form values enter here.
export const GTM_ID = 'GTM-56DCXS3G'
export const MEASUREMENT_ID = 'G-7LHE3BLF2Z'
export const CONSENT_KEY = 'resultx:statistics:v1'
const ORIGIN = 'https://resultx.app'
const EVENTS = ['page_view', 'form_start', 'generate_lead', 'click_whatsapp', 'click_email', 'click_diagnostico'] as const
const PLACEMENTS = ['header', 'menu', 'hero', 'footer', 'diagnostico', 'privacidade'] as const
type AnalyticsEvent = typeof EVENTS[number]
type Placement = typeof PLACEMENTS[number]
type AnalyticsWindow = Window & { dataLayer?: unknown[] }

export function safePageLocation(href: string): string {
  const url = new URL(href)
  const path = url.pathname === '/privacidade' || url.pathname === '/privacidade.html' ? '/privacidade' : '/'
  const clean = new URL(path, ORIGIN)
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id']) {
    const value = url.searchParams.get(key)
    // Campaign tokens only: reject emails, phone-like sequences and free text.
    if (value && /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{1,80}$/.test(value) && value.replace(/\D/g, '').length < 7) clean.searchParams.set(key, value)
  }
  return clean.href
}

export function safeReferrer(referrer: string): string {
  try {
    const url = new URL(referrer)
    // Origin only: other sites may put personal identifiers in paths as well as queries.
    return ['https:', 'http:'].includes(url.protocol) ? url.origin : ''
  } catch { return '' }
}

export interface AnalyticsController {
  track: (event: AnalyticsEvent, placement?: Placement) => void
  setConsent: (allowed: boolean) => void
  hasConsent: () => boolean
}

export function createAnalytics(win: Window, production: boolean, reload: () => void = () => win.location.reload()): AnalyticsController {
  const w = win as AnalyticsWindow
  const enabled = production && win.location.origin === ORIGIN
  let allowed = false
  let loaded = false
  let viewed = false
  const context = () => ({ page_location: safePageLocation(win.location.href), page_referrer: safeReferrer(win.document.referrer) })
  const push = (entry: unknown) => { (w.dataLayer ??= []).push(entry) }
  // Google's command interface uses Arguments objects, not plain arrays.
  // eslint-disable-next-line prefer-rest-params -- gtag's documented queue accepts Arguments objects.
  function command(...args: unknown[]) { void args; push(arguments) }
  const consent = (statistics: boolean) => ({
    analytics_storage: statistics ? 'granted' : 'denied',
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  })

  function track(event: AnalyticsEvent, placement?: Placement) {
    if (!enabled || !allowed || !EVENTS.includes(event)) return
    if (event === 'page_view' && viewed) return
    if (event === 'page_view') viewed = true
    try {
      push({ event, ...context(), form_id: event === 'form_start' || event === 'generate_lead' ? 'diagnostico' : undefined,
        placement: placement && PLACEMENTS.includes(placement) ? placement : undefined })
    } catch { /* Measurement must never interrupt contact or navigation. */ }
  }

  function clearGoogleCookies() {
    for (const cookie of win.document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim()
      if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) continue
      for (const path of ['/', '/privacidade']) {
        for (const domain of ['', '; Domain=resultx.app', '; Domain=.resultx.app']) {
          win.document.cookie = `${name}=; Max-Age=0; Path=${path}${domain}; SameSite=Lax`
        }
      }
    }
  }

  function setConsent(next: boolean) {
    const revoke = allowed && !next && loaded
    allowed = next
    try { win.localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, statistics: next })) } catch { /* Storage may be unavailable. */ }
    if (!enabled) return
    if (revoke) {
      command('consent', 'update', consent(false))
      Reflect.set(win, `ga-disable-${MEASUREMENT_ID}`, true)
      clearGoogleCookies()
      win.document.getElementById('resultx-gtm')?.remove()
      // A loaded third-party tag can retain listeners/timers: reload with the saved refusal.
      reload()
      return
    }
    if (!next || loaded) return
    loaded = true
    command('consent', 'default', consent(false))
    command('consent', 'update', consent(true))
    push({ 'gtm.start': Date.now(), event: 'gtm.js', ...context() })
    const script = win.document.createElement('script')
    script.id = 'resultx-gtm'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    win.document.head.append(script)
    track('page_view')
  }

  return { track, setConsent, hasConsent: () => enabled && allowed }
}

let active: AnalyticsController | undefined
export function trackAnalytics(event: AnalyticsEvent, placement?: Placement) { active?.track(event, placement) }

export function initAnalytics(win: Window = window, production: boolean = import.meta.env.PROD, reload?: () => void) {
  if (active) return active
  active = createAnalytics(win, production, reload)
  const controller = active
  let saved: boolean | null = null
  try {
    const value = JSON.parse(win.localStorage.getItem(CONSENT_KEY) ?? 'null') as { version?: number; statistics?: boolean } | null
    if (value?.version === 1 && typeof value.statistics === 'boolean') saved = value.statistics
  } catch { /* A malformed preference does not grant consent. */ }
  if (saved !== null) controller.setConsent(saved)
  mountPreferences(win.document, controller, saved !== null)
  win.addEventListener('storage', (event) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return
    let statistics = false
    try {
      const value = JSON.parse(event.newValue ?? 'null') as { version?: number; statistics?: boolean } | null
      statistics = value?.version === 1 && value.statistics === true
    } catch { /* Missing/malformed preferences revoke consent, including in other tabs. */ }
    controller.setConsent(statistics)
    win.document.querySelector<HTMLElement>('.statistics-panel')!.hidden = true
  })
  win.document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return
    const link = event.target.closest<HTMLAnchorElement>('a[data-analytics-event]')
    const name = link?.dataset.analyticsEvent as AnalyticsEvent | undefined
    const placement = link?.dataset.analyticsPlacement as Placement | undefined
    if (name && EVENTS.includes(name) && name.startsWith('click_')) controller.track(name, placement)
  })
  return controller
}

function mountPreferences(doc: Document, controller: AnalyticsController, decided: boolean) {
  const panel = doc.createElement('section')
  panel.className = 'statistics-panel'
  panel.setAttribute('aria-labelledby', 'statistics-title')
  panel.hidden = decided
  panel.innerHTML = `<h2 id="statistics-title">Estatísticas do site</h2>
    <p>Com sua autorização, usamos o Google Analytics para entender as visitas e os pedidos de diagnóstico. Você pode recusar e continuar usando o site e o formulário.</p>
    <p><a href="/privacidade">Como tratamos seus dados</a></p>
    <div class="statistics-actions"><button type="button" class="btn btn-primary" data-choice="accept">Aceitar estatísticas</button><button type="button" class="btn btn-secondary" data-choice="reject">Recusar estatísticas</button><button type="button" class="btn btn-secondary" data-choice="close" hidden>Fechar preferências</button></div>`
  const opener = doc.createElement('button')
  opener.type = 'button'
  opener.className = 'statistics-preferences'
  opener.textContent = 'Preferências de cookies'
  opener.setAttribute('aria-controls', 'statistics-preferences')
  panel.id = 'statistics-preferences'
  const close = panel.querySelector<HTMLButtonElement>('[data-choice="close"]')!
  opener.addEventListener('click', () => { panel.hidden = false; close.hidden = !decided; panel.querySelector<HTMLButtonElement>('button')?.focus() })
  panel.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-choice]')
    if (!button) return
    if (button.dataset.choice !== 'close') {
      decided = true
      controller.setConsent(button.dataset.choice === 'accept')
    }
    panel.hidden = true
    opener.focus()
  })
  doc.body.append(panel, opener)
}
