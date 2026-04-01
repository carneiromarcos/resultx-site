import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Methodology.css'

const STEPS = [
  {
    num: '01',
    title: 'Diagnóstico & Mapeamento',
    desc: 'Imersão no seu negócio para entender processos, dores e oportunidades. Mapeamento completo do cenário atual.',
  },
  {
    num: '02',
    title: 'Estratégia & Planejamento',
    desc: 'Definição de roadmap com prioridades, KPIs e marcos de entrega. Alinhamento total com seus objetivos.',
  },
  {
    num: '03',
    title: 'Implementação Ágil',
    desc: 'Execução em sprints com entregas incrementais. Transparência total via dashboards e reuniões semanais.',
  },
  {
    num: '04',
    title: 'Monitoramento & Evolução',
    desc: 'Acompanhamento contínuo dos resultados. Ajustes baseados em dados para maximizar o impacto.',
  },
]

export default function Methodology() {
  const ref = useScrollAnimation()

  return (
    <section id="methodology" ref={ref}>
      <div className="container">
        <div className="method-grid">
          <div className="method-content fade-in-left">
            <div className="section-label">Nossa Metodologia</div>
            <h2>
              Do diagnóstico à <span className="gradient-text">transformação real</span>
            </h2>
            <div className="method-steps">
              {STEPS.map((s) => (
                <div key={s.num} className="method-step">
                  <div className="step-num">{s.num}</div>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#cta" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Iniciar Diagnóstico Gratuito →
            </a>
          </div>
          <div className="method-image fade-in-right">
            <img
              src="/images/methodology.jpg"
              alt="Metodologia ResultX"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
