import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Differentials.css'

const DIFFS = [
  {
    icon: '🧠',
    title: 'IA Aplicada ao Negócio',
    desc: 'Não apenas teoria — implementamos IA que gera ROI desde as primeiras semanas.',
  },
  {
    icon: '📊',
    title: 'Foco em Resultados',
    desc: 'KPIs definidos desde o dia 1. Cada entrega é medida pelo impacto no seu negócio.',
  },
  {
    icon: '⚡',
    title: 'Velocidade de Execução',
    desc: 'Squads ágeis + metodologia própria = entregas 3x mais rápidas que o mercado.',
  },
  {
    icon: '🏢',
    title: 'Para Todo Tamanho',
    desc: 'De startups a grandes corporações. Adaptamos escopo e investimento à sua realidade.',
  },
  {
    icon: '🤝',
    title: 'Parceria de Longo Prazo',
    desc: 'Não somos fornecedores — somos parceiros estratégicos do seu crescimento.',
  },
  {
    icon: '👥',
    title: 'Equipe Multidisciplinar',
    desc: 'Desenvolvedores, designers, cientistas de dados e gestores trabalhando integrados.',
  },
]

export default function Differentials() {
  const ref = useScrollAnimation()

  return (
    <section id="differentials" ref={ref}>
      <div className="container">
        <div className="diff-header fade-in">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Por que a ResultX
          </div>
          <h2>
            Diferenciais que geram <span className="gradient-text">resultados reais</span>
          </h2>
        </div>
        <div className="diff-grid">
          {DIFFS.map((d) => (
            <div key={d.title} className="diff-card fade-in">
              <div className="diff-icon">{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
