import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Stats.css'

const STATS = [
  { num: '200+', label: 'Projetos entregues' },
  { num: '97%', label: 'Satisfação dos clientes' },
  { num: '3x', label: 'Mais velocidade' },
  { num: '40%', label: 'Redução de custos' },
]

export default function Stats() {
  const ref = useScrollAnimation()

  return (
    <section id="stats" ref={ref}>
      <div className="stats-overlay" />
      <div className="container">
        <div className="stats-grid fade-in">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <div className="stat-item">
                <span className="stat-number">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
              {i < STATS.length - 1 && <div className="stat-divider" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
