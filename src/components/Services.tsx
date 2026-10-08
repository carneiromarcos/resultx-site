import Ambience from './Ambience'
import Icon, { type IconName } from './Icon'
import { revealIndex } from '../hooks/useReveal'

/* Bloco 4 — Serviços e formas de entrega. Texto da proposta de 07/10. */

const SERVICES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'bot',
    title: 'IA e automação na operação',
    text: 'Automatize tarefas recorrentes, organize informações e apoie decisões com soluções conectadas aos processos da sua empresa.',
  },
  {
    icon: 'graduation-cap',
    title: 'Sua equipe preparada para usar IA',
    text: 'Capacitação prática com atividades do seu negócio, para aplicar as ferramentas na rotina e desenvolver autonomia.',
  },
  {
    icon: 'workflow',
    title: 'Processos organizados para crescer',
    text: 'Revise fluxos, responsabilidades e indicadores para reduzir retrabalho e melhorar a execução.',
  },
  {
    icon: 'code',
    title: 'Software para os desafios do seu negócio',
    text: 'Desenvolva sistemas, integrações e aplicações sob medida, com prioridades claras e entregas acompanhadas.',
  },
]

export default function Services() {
  return (
    <section className="section has-ambience" id="servicos" aria-labelledby="servicos-title">
      <Ambience slot="servicos" />
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Serviços</p>
          <h2 id="servicos-title">Da melhoria dos processos à tecnologia funcionando na sua empresa.</h2>
        </div>
        <ol className="service-grid">
          {SERVICES.map((service, index) => (
            <li key={service.title} className="card card-lift service-card" data-reveal style={revealIndex(index)}>
              <div className="service-top">
                <span className="icon-chip icon-chip-lg" aria-hidden="true"><Icon name={service.icon} size="lg" /></span>
                <span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-text">{service.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
