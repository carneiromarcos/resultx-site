import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    text: 'A ResultX transformou completamente nossa operação de análise de dados. Em 60 dias, automatizamos processos que levavam semanas. O ROI foi surpreendente.',
    name: 'Carlos Mendes',
    role: 'CTO, TechCorp',
  },
  {
    text: 'O treinamento em IA que a ResultX desenvolveu para nossa equipe foi excepcional. Hoje temos uma cultura de inovação que não tínhamos antes.',
    name: 'Ana Ribeiro',
    role: 'Head de RH, Grupo Vanguarda',
  },
  {
    text: 'O squad de desenvolvimento entregou nosso produto em metade do tempo previsto, com qualidade superior. A metodologia ágil deles é diferenciada.',
    name: 'Pedro Santos',
    role: 'CEO, StartupFlow',
  },
]

export default function Testimonials() {
  const ref = useScrollAnimation()

  return (
    <section id="testimonials" ref={ref}>
      <div className="container">
        <div className="test-header fade-in">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Depoimentos
          </div>
          <h2>
            O que nossos clientes <span className="gradient-text">dizem</span>
          </h2>
        </div>
        <div className="test-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="test-card fade-in">
              <div className="test-quote">"</div>
              <p className="test-text">{t.text}</p>
              <div className="test-author">
                <div className="test-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
