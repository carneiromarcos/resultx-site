/* Bloco 6 — Método de trabalho: etapas e entregáveis da proposta de 07/10. */

const STEPS = [
  { title: 'Entender a operação', deliverable: 'Resumo do problema prioritário, processo atual e indicador inicial.' },
  { title: 'Definir o primeiro projeto', deliverable: 'Escopo, responsáveis, investimento, prazos e critérios de sucesso.' },
  { title: 'Implementar e preparar a equipe', deliverable: 'Solução validada no fluxo acordado e orientação para uso.' },
  { title: 'Acompanhar e melhorar', deliverable: 'Comparação dos indicadores e definição dos próximos ajustes.' },
]

export default function Method() {
  return (
    <section className="section" id="metodo" aria-labelledby="metodo-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Método de trabalho</p>
          <h2 id="metodo-title">Cada etapa termina em um entregável.</h2>
        </div>
        <ol className="method-list">
          {STEPS.map((step, index) => (
            <li key={step.title} className="method-step">
              <span className="method-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p className="method-deliverable">
                <span>Entregável</span>
                {step.deliverable}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
