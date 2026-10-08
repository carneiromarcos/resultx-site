import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Icon from './Icon'
import Logo from './Logo'
import { CTA_DIAGNOSIS, NAV_LINKS } from '../content/site'
import './Header.css'

/* .header-float e .menu-drawer são componentes do DS (só CSS aqui).
   O comportamento que dist/header-float.js e dist/menu-drawer.js dão às
   páginas estáticas é refeito em React: o script da gaveta troca <a> por
   <button> no DOM, o que brigaria com a reconciliação do React. */

const DRAWER_MEDIA = '(max-width: 1023.98px)'

function useScrolledFlag() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver((entries) => {
      const last = entries[entries.length - 1]
      setScrolled(!last.isIntersecting)
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return { sentinelRef, scrolled }
}

function focusableIn(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
}

export default function Header() {
  const { sentinelRef, scrolled } = useScrolledFlag()
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    /* Com a gaveta aberta, o resto da página sai do foco e da árvore de
       acessibilidade. O header fica de fora: o botão do menu recebe o foco
       de volta no fechamento, antes de esta limpeza rodar. */
    const background = [document.getElementById('conteudo'), document.querySelector<HTMLElement>('.site-footer')]
      .filter((el): el is HTMLElement => el !== null)
    background.forEach((el) => { el.inert = true })
    const drawer = drawerRef.current
    if (drawer) focusableIn(drawer)[0]?.focus()

    const media = window.matchMedia(DRAWER_MEDIA)
    const onMediaChange = () => { if (!media.matches) setOpen(false) }
    media.addEventListener('change', onMediaChange)

    return () => {
      root.style.overflow = previousOverflow
      background.forEach((el) => { el.inert = false })
      media.removeEventListener('change', onMediaChange)
    }
  }, [open])

  function onDrawerKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== 'Tab' || !drawerRef.current) return
    const items = focusableIn(drawerRef.current)
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const openAttr = open ? '' : undefined

  return (
    <>
      <div ref={sentinelRef} className="header-float-sentinel" aria-hidden="true" />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="header-float" data-scrolled={scrolled ? '' : undefined}>
        <div className="header-float-bar">
          <a className="header-float-brand" href="#inicio" aria-label="ResultX, voltar ao início">
            <Logo />
          </a>
          <nav className="header-float-links" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <div className="header-float-actions">
            <a className="btn btn-primary btn-sm" href={CTA_DIAGNOSIS.href} data-analytics-event="click_diagnostico" data-analytics-placement="header">
              Solicitar diagnóstico
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="header-float-icon header-float-menu"
              aria-label="Abrir menu"
              aria-controls="menu-gaveta"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" size="sm" />
            </button>
          </div>
        </div>
      </header>

      <section
        ref={drawerRef}
        id="menu-gaveta"
        className="menu-drawer"
        aria-label="Menu"
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        data-menu-drawer-ready=""
        data-open={openAttr}
        onKeyDown={onDrawerKeyDown}
      >
        <div className="menu-drawer-head">
          <span className="menu-drawer-label">Menu</span>
          <button type="button" className="menu-drawer-close" aria-label="Fechar menu" onClick={close}>
            <Icon name="close" size="sm" />
          </button>
        </div>
        <div className="menu-drawer-body">
          <nav className="menu-drawer-nav" aria-label="Principal (móvel)">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            ))}
          </nav>
          <div className="menu-drawer-actions">
            <a className="btn btn-primary" href={CTA_DIAGNOSIS.href} data-analytics-event="click_diagnostico" data-analytics-placement="menu" onClick={() => setOpen(false)}>
              {CTA_DIAGNOSIS.label}
            </a>
          </div>
        </div>
      </section>
      <div className="menu-drawer-scrim" aria-hidden="true" data-open={openAttr} onClick={close} />
    </>
  )
}
