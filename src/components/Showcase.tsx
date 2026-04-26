import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Showcase.css'

export default function Showcase() {
  const ref = useScrollAnimation()

  return (
    <section
      id="showcase"
      ref={ref}
      data-theme="vibrant-dark"
      className="showcase-section"
    >
      <div className="container showcase-content fade-in">
        <header className="showcase-header">
          <span className="showcase-eyebrow">Painéis em tempo real</span>
          <h2 className="showcase-title">
            Acompanhe o impacto em <span className="showcase-accent">dashboards vivos</span>
          </h2>
          <p className="showcase-subtitle">
            Cada projeto entrega visibilidade total — KPIs, jornadas de IA, performance de squads
            e ROI em um painel único, atualizado em tempo real.
          </p>
        </header>

        <div className="showcase-frame">
          <div className="showcase-browser-bar">
            <div className="showcase-browser-dots">
              <span /><span /><span />
            </div>
            <div className="showcase-browser-url">app.resultx.com/dashboard</div>
          </div>

          <div className="showcase-app">
            <div className="showcase-stats">
              <article className="dl-statcard">
                <header className="dl-statcard-header">
                  <span className="dl-statcard-label">Implantações ativas</span>
                  <div className="dl-coin dl-coin--cyan dl-coin--sm" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                </header>
                <div className="dl-statcard-value">42</div>
                <footer className="dl-statcard-footer">
                  <span className="dl-delta dl-delta--positive">↑ 18.4%</span>
                  <span className="dl-statcard-compare">vs trimestre anterior</span>
                  <div className="dl-sparkline dl-sparkline--positive showcase-spark">
                    <span className="dl-sparkline-bar" style={{ '--h': '30%' } as React.CSSProperties}></span>
                    <span className="dl-sparkline-bar" style={{ '--h': '55%' } as React.CSSProperties}></span>
                    <span className="dl-sparkline-bar" style={{ '--h': '40%' } as React.CSSProperties}></span>
                    <span className="dl-sparkline-bar" style={{ '--h': '70%' } as React.CSSProperties}></span>
                    <span className="dl-sparkline-bar dl-sparkline-bar--active" style={{ '--h': '95%' } as React.CSSProperties}></span>
                  </div>
                </footer>
              </article>

              <article className="dl-statcard">
                <header className="dl-statcard-header">
                  <span className="dl-statcard-label">Horas economizadas/mês</span>
                  <div className="dl-coin dl-coin--magenta dl-coin--sm" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                </header>
                <div className="dl-statcard-value">3.840</div>
                <footer className="dl-statcard-footer">
                  <span className="dl-delta dl-delta--positive">↑ 32.1%</span>
                  <span className="dl-statcard-compare">com IA</span>
                </footer>
              </article>

              <article className="dl-statcard">
                <header className="dl-statcard-header">
                  <span className="dl-statcard-label">ROI acumulado</span>
                  <div className="dl-coin dl-coin--green dl-coin--sm" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  </div>
                </header>
                <div className="dl-statcard-value">R$ 8,4M</div>
                <footer className="dl-statcard-footer">
                  <span className="dl-delta dl-delta--positive">↑ 47%</span>
                  <span className="dl-statcard-compare">12 meses</span>
                </footer>
              </article>
            </div>

            <div className="showcase-duo">
              <div className="showcase-donut-card">
                <h3 className="showcase-card-title">Distribuição por área</h3>
                <div className="dl-donut" style={{ '--donut-seg-1': '47%', '--donut-seg-2': '74%', '--donut-seg-3': '92%' } as React.CSSProperties}>
                  <div className="dl-donut-track"></div>
                  <div className="dl-donut-inner">
                    <div className="dl-donut-value">42</div>
                    <div className="dl-donut-label">projetos</div>
                  </div>
                </div>
                <div className="dl-donut-legend">
                  <div className="dl-donut-legend-item">
                    <span className="dl-donut-legend-dot" style={{ background: 'var(--grad-cyan-end)' }}></span>
                    <span className="dl-donut-legend-count">20</span> IA &amp; Dados
                  </div>
                  <div className="dl-donut-legend-item">
                    <span className="dl-donut-legend-dot" style={{ background: 'var(--grad-purple-end)' }}></span>
                    <span className="dl-donut-legend-count">14</span> Squads
                  </div>
                  <div className="dl-donut-legend-item">
                    <span className="dl-donut-legend-dot" style={{ background: 'var(--grad-amber-end)' }}></span>
                    <span className="dl-donut-legend-count">8</span> Processos
                  </div>
                </div>
              </div>

              <div className="dl-chart">
                <header className="dl-chart-header">
                  <h3 className="dl-chart-title">Velocidade de entrega</h3>
                  <div className="dl-chart-meta">
                    3.2x <span className="dl-delta dl-delta--positive">↑ 24%</span>
                  </div>
                </header>
                <div className="dl-chart-canvas">
                  <svg className="dl-chart-svg" viewBox="0 0 320 140" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="showcase-chart-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--grad-cyan-start)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="var(--grad-cyan-start)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g className="dl-chart-grid">
                      <line x1="0" x2="320" y1="40" y2="40" />
                      <line x1="0" x2="320" y1="80" y2="80" />
                    </g>
                    <path d="M 0 110 L 40 90 L 80 100 L 120 60 L 160 40 L 200 70 L 240 50 L 280 30 L 320 60 L 320 140 L 0 140 Z" fill="url(#showcase-chart-grad)" />
                    <path d="M 0 110 L 40 90 L 80 100 L 120 60 L 160 40 L 200 70 L 240 50 L 280 30 L 320 60" className="dl-chart-line" />
                    <circle cx="280" cy="30" r="6" className="dl-chart-point dl-chart-point--active" />
                  </svg>
                  <div className="dl-tooltip-callout" style={{ left: '87.5%', top: '18%' }}>
                    <span className="dl-tooltip-value">3.2x</span>
                    <span className="dl-tooltip-label">vs baseline</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dl-table-wrap showcase-table">
              <table className="dl-table">
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="dl-table-primary">Squad IA — Atendimento</div>
                      <div className="dl-table-secondary">12 modelos ativos · 4 integrações</div>
                    </td>
                    <td>
                      <div className="dl-avatar-stack dl-avatar-stack--sm">
                        <div className="dl-avatar"><span style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#FFA28F,#E6695C)' }} /></div>
                        <div className="dl-avatar"><span style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#9FD1FF,#5B9FE6)' }} /></div>
                        <div className="dl-avatar dl-avatar--more">+3</div>
                      </div>
                    </td>
                    <td><span className="dl-status dl-status--in-progress">Em andamento</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="dl-table-primary">Reestruturação Compras</div>
                      <div className="dl-table-secondary">RPA + dashboards Tetra</div>
                    </td>
                    <td>
                      <div className="dl-avatar-stack dl-avatar-stack--sm">
                        <div className="dl-avatar"><span style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#C4F0C5,#7DCB7E)' }} /></div>
                        <div className="dl-avatar"><span style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#E8C4FF,#A77AE6)' }} /></div>
                      </div>
                    </td>
                    <td><span className="dl-status dl-status--done">Entregue</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="dl-table-primary">Plataforma de assessments</div>
                      <div className="dl-table-secondary">Electia · 6 segmentos</div>
                    </td>
                    <td>
                      <div className="dl-avatar-stack dl-avatar-stack--sm">
                        <div className="dl-avatar"><span style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#FFE08A,#E6BC52)' }} /></div>
                        <div className="dl-avatar"><span style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#9FD1FF,#5B9FE6)' }} /></div>
                        <div className="dl-avatar dl-avatar--more">+2</div>
                      </div>
                    </td>
                    <td><span className="dl-status dl-status--need-review">Em revisão</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="dl-table-primary">Squad Crescimento</div>
                      <div className="dl-table-secondary">5 sprints · GTM B2B</div>
                    </td>
                    <td>
                      <div className="dl-avatar-stack dl-avatar-stack--sm">
                        <div className="dl-avatar"><span style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#FFA28F,#E6695C)' }} /></div>
                      </div>
                    </td>
                    <td><span className="dl-status dl-status--pending">Planejamento</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
