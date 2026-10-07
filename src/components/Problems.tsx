import Icon, { type IconName } from './Icon'

/* Bloco 2 — Problemas reconhecíveis na operação. Texto da proposta de 07/10. */

const PAINS: { icon: IconName; text: string }[] = [
  { icon: 'message-square', text: 'Leads esperando resposta.' },
  { icon: 'sheet', text: 'Informações espalhadas em planilhas.' },
  { icon: 'file-check', text: 'Documentos conferidos manualmente.' },
  { icon: 'chart', text: 'Gestores gastando horas para conseguir um relatório.' },
]

export default function Problems() {
  return (
    <section className="section" id="problemas" aria-labelledby="problemas-title">
      <div className="wrap problems-grid">
        <div className="section-head">
          <p className="eyebrow">Problemas na operação</p>
          <h2 id="problemas-title">Onde sua operação está perdendo eficiência?</h2>
        </div>
        <ul className="pain-list">
          {PAINS.map((pain) => (
            <li key={pain.text} className="pain-item">
              <span className="icon-chip" aria-hidden="true"><Icon name={pain.icon} /></span>
              {pain.text}
            </li>
          ))}
        </ul>
        <div className="problems-copy">
          <p className="problems-lead">Esses gargalos consomem tempo da equipe e dificultam o crescimento.</p>
          <p>
            A ResultX analisa seus processos para identificar onde automação, inteligência artificial e
            melhoria de gestão podem gerar mais valor.
          </p>
          <p>
            Começamos pelo problema prioritário, com uma entrega definida e indicadores para acompanhar
            o resultado.
          </p>
        </div>
      </div>
    </section>
  )
}
