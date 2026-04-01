import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Sobre', href: '#about' },
  { label: 'Soluções', href: '#solutions' },
  { label: 'Metodologia', href: '#methodology' },
  { label: 'Diferenciais', href: '#differentials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contato', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <img src="/images/logo-resultx.svg" alt="ResultX" />
          </a>

          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <a href="#contact" className="btn btn-outline btn-sm">
              Falar com Especialista
            </a>
            <a href="#contact" className="btn btn-primary btn-sm">
              Começar Agora →
            </a>
          </div>

          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
