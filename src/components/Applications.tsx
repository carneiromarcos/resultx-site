import Icon, { type IconName } from './Icon'
import { revealIndex } from '../hooks/useReveal'

/* Bloco 3 — Aplicações por área. Texto da proposta de 07/10. */

const AREAS: { icon: IconName; area: string; text: string }[] = [
  { icon: 'trending-up', area: 'Comercial', text: 'Organizar leads, apoiar propostas e acompanhar contatos pendentes.' },
  { icon: 'message-square', area: 'Atendimento', text: 'Responder dúvidas recorrentes e encaminhar solicitações.' },
  { icon: 'wallet', area: 'Financeiro', text: 'Apoiar cobranças, consolidar informações e acompanhar a carteira.' },
  { icon: 'users', area: 'RH', text: 'Organizar candidaturas, apoiar recrutamento e acompanhar pessoas.' },
  { icon: 'chart', area: 'Gestão', text: 'Consolidar indicadores e transformar reuniões em ações acompanháveis.' },
  { icon: 'file-text', area: 'Documentos', text: 'Extrair informações, classificar arquivos e apoiar conferências.' },
]

export default function Applications() {
  return (
    <section className="band-tint" id="aplicacoes" aria-labelledby="aplicacoes-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Aplicações por área</p>
          <h2 id="aplicacoes-title">Como isso pode funcionar na sua empresa.</h2>
          <p>Exemplos de aplicações. O escopo de cada projeto é definido na proposta comercial.</p>
        </div>
        <ul className="area-grid">
          {AREAS.map((item, index) => (
            <li key={item.area} className="card card-lift area-card" data-reveal style={revealIndex(index)}>
              <span className="icon-chip" aria-hidden="true"><Icon name={item.icon} /></span>
              <h3 className="card-title">{item.area}</h3>
              <p className="card-text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
