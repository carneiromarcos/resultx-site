import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CONSENT_KEY, createAnalytics, safePageLocation, safeReferrer } from '../src/lib/analytics'

type Entry = { event?: string; [key: string]: unknown }
const queue = () => (Reflect.get(window, 'dataLayer') ?? []) as Entry[]
const events = () => queue().filter((entry) => ['page_view', 'form_start', 'generate_lead', 'click_whatsapp', 'click_email', 'click_diagnostico'].includes(entry.event ?? ''))

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  localStorage.clear()
  Reflect.deleteProperty(window, 'dataLayer')
  Reflect.deleteProperty(window, 'ga-disable-G-7LHE3BLF2Z')
  window.history.replaceState(null, '', '/')
})
afterEach(() => vi.restoreAllMocks())

describe('analytics consent and allowed payloads', () => {
  it('does not load or queue any Google event before consent, or after refusal', () => {
    const analytics = createAnalytics(window, true)
    analytics.track('form_start')
    analytics.track('generate_lead')
    analytics.setConsent(false)
    expect(queue()).toEqual([])
    expect(document.querySelector('script')).toBeNull()
    analytics.setConsent(true)
    expect(events().map((entry) => entry.event)).toEqual(['page_view'])
    expect(document.querySelector('script')?.src).toBe('https://www.googletagmanager.com/gtm.js?id=GTM-56DCXS3G')
  })

  it('has one page view, even across repeated starts and anchor navigation', () => {
    const analytics = createAnalytics(window, true)
    analytics.setConsent(true)
    analytics.setConsent(true)
    window.history.replaceState(null, '', '/#diagnostico')
    analytics.track('page_view')
    expect(events()).toHaveLength(1)
    expect(document.querySelectorAll('#resultx-gtm')).toHaveLength(1)
    const consentCommands = queue().slice(0, 2).map((entry) => Array.from(entry as unknown as ArrayLike<unknown>))
    expect(consentCommands[0]).toEqual(['consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }])
    expect(consentCommands[1]).toEqual(['consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }])
  })

  it('never loads Google for dev, localhost, or preview domains', () => {
    const analytics = createAnalytics(window, false)
    analytics.setConsent(true)
    analytics.track('generate_lead')
    expect(queue()).toEqual([])
    const previewWindow = { location: { origin: 'https://preview.resultx-site.pages.dev' }, localStorage } as unknown as Window
    createAnalytics(previewWindow, true).setConsent(true)
    const localhostWindow = { location: { origin: 'http://localhost:5173' }, localStorage } as unknown as Window
    createAnalytics(localhostWindow, true).setConsent(true)
    expect(queue()).toEqual([])
  })

  it('immediately stops events and clears Google cookies when consent is revoked', () => {
    const reload = vi.fn()
    const analytics = createAnalytics(window, true, reload)
    analytics.setConsent(true)
    document.cookie = '_ga=test; Path=/'
    document.cookie = '_ga_7LHE3BLF2Z=test; Path=/'
    document.cookie = 'essential=keep; Path=/'
    analytics.setConsent(false)
    analytics.track('generate_lead')
    expect(events().map((entry) => entry.event)).toEqual(['page_view'])
    expect(analytics.hasConsent()).toBe(false)
    expect(reload).toHaveBeenCalledOnce()
    expect(document.cookie).not.toContain('_ga')
    expect(document.cookie).toContain('essential=keep')
    expect(document.querySelector('#resultx-gtm')).toBeNull()
    expect(Reflect.get(window, 'ga-disable-G-7LHE3BLF2Z')).toBe(true)
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toEqual({ version: 1, statistics: false })
  })

  it('uses canonical paths, campaign tokens and origin-only referrer, never arbitrary query/hash', () => {
    const hostile = 'https://resultx.app/privacidade?email=pessoa%40empresa.com&phone=5511967947557&utm_source=sisra&utm_medium=evento&utm_campaign=outubro-2026&utm_term=pessoa%40empresa.com&utm_content=whatsapp5511967947557&other=segredo#nome'
    expect(safePageLocation(hostile)).toBe('https://resultx.app/privacidade?utm_source=sisra&utm_medium=evento&utm_campaign=outubro-2026')
    expect(safePageLocation('https://resultx.app/private/pessoa@email.com?utm_source=123')).toBe('https://resultx.app/')
    expect(safePageLocation('https://resultx.app/?utm_campaign=tel-5511-96794-7557')).toBe('https://resultx.app/')
    expect(safeReferrer('https://search.example/pessoa@email.com?phone=5511967947557#nome')).toBe('https://search.example')
    expect(safeReferrer('javascript:segredo')).toBe('')
    window.history.replaceState(null, '', hostile)
    const analytics = createAnalytics(window, true)
    analytics.setConsent(true)
    analytics.track('form_start')
    analytics.track('generate_lead')
    const payload = JSON.stringify(queue())
    expect(payload).not.toMatch(/pessoa|5511967947557|segredo/)
    expect(events()[1].form_id).toBe('diagnostico')
    expect(events()[2].form_id).toBe('diagnostico')
    expect(Object.keys(events()[2])).toEqual(['event', 'page_location', 'page_referrer', 'form_id', 'placement'])
  })

  it('keeps the site usable if an installed Google listener fails', () => {
    const analytics = createAnalytics(window, true)
    analytics.setConsent(true)
    const dataLayer = Reflect.get(window, 'dataLayer') as unknown[]
    dataLayer.push = () => { throw new Error('blocked measurement') }
    expect(() => analytics.track('generate_lead')).not.toThrow()
  })
})

describe('shared bootstrap and preferences', () => {
  it('allows refusal and reopening, and measures nested link clicks without canceling them', async () => {
    vi.resetModules()
    const { initAnalytics } = await import('../src/lib/analytics')
    const reload = vi.fn()
    const analytics = initAnalytics(window, true, reload)
    expect(initAnalytics(window, true)).toBe(analytics)
    const panel = document.querySelector<HTMLElement>('.statistics-panel')!
    document.querySelector<HTMLButtonElement>('[data-choice="reject"]')!.click()
    expect(panel.hidden).toBe(true)
    expect(queue()).toEqual([])
    document.querySelector<HTMLButtonElement>('.statistics-preferences')!.click()
    expect(panel.hidden).toBe(false)
    document.querySelector<HTMLButtonElement>('[data-choice="accept"]')!.click()
    document.body.insertAdjacentHTML('beforeend', '<a href="#diagnostico" data-analytics-event="click_diagnostico" data-analytics-placement="hero"><span>Diagnóstico</span></a>')
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })
    document.querySelector('a span')!.dispatchEvent(click)
    expect(click.defaultPrevented).toBe(false)
    expect(events().filter((entry) => entry.event === 'click_diagnostico')).toEqual([{ event: 'click_diagnostico', page_location: 'https://resultx.app/', page_referrer: '', form_id: undefined, placement: 'hero' }])
    for (const name of ['click_whatsapp', 'click_email']) {
      const link = document.createElement('a')
      link.href = '#contato'
      link.dataset.analyticsEvent = name
      link.dataset.analyticsPlacement = 'privacidade'
      document.body.append(link)
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      expect(events().filter((entry) => entry.event === name)).toHaveLength(1)
    }
    window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY, newValue: JSON.stringify({ version: 1, statistics: false }) }))
    expect(analytics.hasConsent()).toBe(false)
    expect(reload).toHaveBeenCalledOnce()
  })
})
