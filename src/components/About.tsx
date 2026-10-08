import Icon from './Icon'
import { revealIndex } from '../hooks/useReveal'

/* Bloco 7 — Apresentação da ResultX. Texto da proposta de 07/10, incluindo
   as duas frases de "adoção pela equipe" e "resultado acompanhado". */

const COMMITMENTS = [
  'Implementamos a solução e preparamos sua equipe para usá-la no dia a dia.',
  'Acompanhe o impacto em horas economizadas, custos e desempenho da operação.',
]

export default function About() {
  return (
    <section className="band-tint" id="sobre" aria-labelledby="sobre-title">
      <div className="wrap about-grid">
        <div className="section-head about-head" data-reveal>
          <p className="eyebrow">A ResultX</p>
          <h2 id="sobre-title">Experiência em gestão e desenvolvimento de tecnologia.</h2>
        </div>
        <div className="about-copy" data-reveal style={revealIndex(1)}>
          <p className="about-lead">
            A ResultX une experiência em gestão e desenvolvimento de tecnologia para melhorar a
            operação das empresas. Analisamos processos, implementamos soluções e acompanhamos sua
            adoção pela equipe, com prioridades e indicadores definidos para cada projeto.
          </p>
          <ul className="about-list">
            {COMMITMENTS.map((item) => (
              <li key={item}>
                <span className="about-check" aria-hidden="true"><Icon name="check" size="sm" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
