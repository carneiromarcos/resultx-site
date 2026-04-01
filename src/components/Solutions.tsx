import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Solutions.css'

const SOLUTIONS = [
  {
    num: '01',
    icon: '🤖',
    title: 'IA em Negócios',
    desc: 'Integramos soluções de Inteligência Artificial diretamente nos processos de negócio, automatizando tarefas, gerando insights e acelerando decisões.',
    img: '/images/sol-ia.jpg',
  },
  {
    num: '02',
    icon: '🎓',
    title: 'Cursos e Treinamento em IA',
    desc: 'Capacitamos equipes para compreender, utilizar e evoluir com as ferramentas de IA. Programas práticos, orientados a resultados.',
    img: '/images/sol-training.jpg',
  },
  {
    num: '03',
    icon: '⚙️',
    title: 'Mudanças Estruturais',
    desc: 'Fornecemos liderança especializada para gerenciar transformações organizacionais complexas. Reestruturação de processos e gestão da mudança cultural.',
    img: '/images/sol-structure.jpg',
  },
  {
    num: '04',
    icon: '👥',
    title: 'Squads de Desenvolvimento',
    desc: 'Montamos e gerenciamos equipes ágeis e multidisciplinares dedicadas ao desenvolvimento de software sob medida.',
    img: '/images/sol-squads.jpg',
  },
]

export default function Solutions() {
  const ref = useScrollAnimation()

  return (
    <section id="solutions" ref={ref}>
      <div className="container-wide">
        <div className="solutions-header fade-in">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Portfólio de Soluções
          </div>
          <h2>
            Quatro frentes estratégicas para sua{' '}
            <span className="gradient-text">transformação</span>
          </h2>
          <p>
            Cada solução é desenhada para gerar impacto mensurável no seu negócio, com
            metodologia própria e acompanhamento dedicado.
          </p>
        </div>
        <div className="solutions-grid">
          {SOLUTIONS.map((s) => (
            <div key={s.num} className="solution-card fade-in">
              <img src={s.img} alt={s.title} className="solution-img" loading="lazy" />
              <div className="solution-overlay" />
              <div className="solution-icon">{s.icon}</div>
              <div className="solution-content">
                <div className="solution-num">{s.num}</div>
                <h3 className="solution-title">{s.title}</h3>
                <p className="solution-desc">{s.desc}</p>
                <a href="#cta" className="solution-link">Saiba mais →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
