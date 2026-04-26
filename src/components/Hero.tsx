import './Hero.css'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-overlay" />
      <div className="hero-coins" aria-hidden="true">
        <div className="hero-coin hero-coin--cyan dl-coin dl-coin--cyan dl-coin--lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div className="hero-coin hero-coin--magenta dl-coin dl-coin--magenta dl-coin--lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
          </svg>
        </div>
      </div>
      <div className="container hero-content">
        <div className="hero-badge">
          <span className="pulse-dot" />
          Consultoria em Transformação Digital
        </div>
        <h1 className="hero-title">
          Transformamos negócios com <span className="accent">IA e estratégia</span> de verdade
        </h1>
        <p className="hero-subtitle">
          Implementamos inteligência artificial, reestruturamos processos e montamos squads de
          desenvolvimento para empresas que querem resultados reais — não apenas relatórios.
        </p>
        <div className="hero-actions">
          <a href="#cta" className="btn btn-primary">
            Agendar Diagnóstico Gratuito →
          </a>
          <a href="#solutions" className="btn btn-outline">
            Conhecer Soluções
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">200+</span>
            <span className="hero-stat-label">Empresas atendidas</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">97%</span>
            <span className="hero-stat-label">Satisfação</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">3x</span>
            <span className="hero-stat-label">Mais velocidade</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
