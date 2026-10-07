import Icon, { type IconName } from './Icon'
import { CTA_DIAGNOSIS } from '../content/site'

/* Bloco 1 — Promessa e chamada principal. Texto da proposta de 07/10. */

const FLOW: { icon: IconName; title: string; text: string }[] = [
  { icon: 'clock', title: 'Identificar os gargalos', text: 'Onde a operação perde tempo e informação.' },
  { icon: 'bot', title: 'Implementar IA e automações', text: 'Soluções conectadas aos seus processos.' },
  { icon: 'graduation-cap', title: 'Capacitar a equipe', text: 'Para usar no dia a dia e ganhar autonomia.' },
]

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Implementação de IA e melhoria de processos</p>
          <h1 id="hero-title">Sua empresa pode produzir mais com menos trabalho manual.</h1>
          <p className="hero-lead">
            A ResultX identifica os gargalos da sua operação, implementa inteligência artificial e
            automações e capacita sua equipe para ganhar produtividade, reduzir custos e decidir com
            mais informação.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg btn-sheen" href={CTA_DIAGNOSIS.href}>
              Quero identificar oportunidades na minha empresa
              <Icon name="arrow-right" size="sm" />
            </a>
            <a className="btn btn-secondary btn-lg" href="#aplicacoes">
              Conhecer aplicações de IA
            </a>
          </div>
          <p className="hero-note">
            Comece com um diagnóstico gratuito dos seus desafios e das oportunidades de melhoria.
          </p>
        </div>

        <ol className="hero-flow" aria-label="Como a ResultX trabalha">
          {FLOW.map((step) => (
            <li key={step.title} className="hero-flow-step">
              <span className="icon-chip" aria-hidden="true"><Icon name={step.icon} /></span>
              <span>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
