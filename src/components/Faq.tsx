import Icon from './Icon'

/* Bloco 8 — Perguntas frequentes. Respostas tiradas só da proposta de 07/10:
   sem preço, prazo ou número que a proposta não traga. */

const QUESTIONS = [
  {
    q: 'O que é o diagnóstico gratuito?',
    a: 'É a conversa inicial em que entendemos seus principais gargalos, os sistemas utilizados e as tarefas que mais consomem tempo da equipe.',
  },
  {
    q: 'O que eu recebo no diagnóstico?',
    a: 'Você recebe uma indicação das oportunidades prioritárias e do próximo passo recomendado.',
  },
  {
    q: 'Como um projeto começa?',
    a: 'Começamos pelo problema prioritário, com uma entrega definida e indicadores para acompanhar o resultado. Antes da implementação, o primeiro projeto tem escopo, responsáveis, investimento, prazos e critérios de sucesso definidos.',
  },
  {
    q: 'Minha equipe vai conseguir usar as soluções?',
    a: 'Implementamos a solução e preparamos sua equipe para usá-la no dia a dia. A capacitação é prática, com atividades do seu negócio, para aplicar as ferramentas na rotina e desenvolver autonomia.',
  },
  {
    q: 'Que tipo de empresa a ResultX atende?',
    a: 'Empresas que querem reduzir trabalho manual e melhorar a operação, em áreas como comercial, atendimento, financeiro, RH, gestão e documentos. O escopo de cada projeto é definido na proposta comercial.',
  },
  {
    q: 'Como o resultado é acompanhado?',
    a: 'Cada projeto tem indicadores definidos desde o início. Na etapa de acompanhamento, comparamos os indicadores e definimos os próximos ajustes.',
  },
  {
    q: 'Emprega+, Electia e Xscore são clientes da ResultX?',
    a: 'Não. São produtos próprios do grupo ResultX. Aparecem no site como demonstração do tipo de solução que desenvolvemos.',
  },
]

export default function Faq() {
  return (
    <section className="section" id="perguntas" aria-labelledby="perguntas-title">
      <div className="wrap faq-grid">
        <div className="section-head">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 id="perguntas-title">Antes de começar.</h2>
        </div>
        <div className="faq-list">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                {item.q}
                <span className="faq-toggle" aria-hidden="true"><Icon name="plus" size="sm" /></span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
