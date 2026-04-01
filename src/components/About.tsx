import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './About.css'

const VALUES = [
  'Inovação com propósito',
  'Resultados mensuráveis',
  'Agilidade real',
  'Parceria estratégica',
]

export default function About() {
  const ref = useScrollAnimation()

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap fade-in-left">
            <img
              src="/images/about.jpg"
              alt="Equipe ResultX em ação"
              loading="lazy"
            />
            <div className="about-image-badge">
              <span className="num">10+</span>
              <span className="lbl">Anos de experiência</span>
            </div>
          </div>
          <div className="about-content fade-in-right">
            <div className="section-label">Quem Somos</div>
            <h2>
              O fator <span className="gradient-text">multiplicador</span> do seu negócio
            </h2>
            <p>
              A ResultX é uma consultoria em transformação digital que une estratégia, tecnologia e
              inteligência artificial para acelerar resultados. Atuamos como braço direito de
              empresas que precisam evoluir — rápido e com segurança.
            </p>
            <p>
              Nosso time multidisciplinar combina experiência em gestão de projetos, desenvolvimento
              de software, ciência de dados e design para entregar soluções que realmente funcionam.
            </p>
            <div className="about-values">
              {VALUES.map((v) => (
                <div key={v} className="value-item">
                  <span className="value-dot" />
                  {v}
                </div>
              ))}
            </div>
            <a href="#cta" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Conheça Nossa História →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
