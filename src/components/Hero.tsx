import './Hero.css'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-overlay" />
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
