import DiagnosisForm from './DiagnosisForm'
import Icon from './Icon'
import { CONTACT } from '../content/site'

/* Bloco 9 — Diagnóstico e formulário de contato. Texto da proposta de 07/10.
   Sem prazo de resposta: a proposta condiciona a promessa de 24 h a
   capacidade operacional confirmada. */

export default function Diagnosis() {
  return (
    <section className="section diagnosis" id="diagnostico" aria-labelledby="diagnostico-title">
      <div className="wrap diagnosis-grid">
        <div className="diagnosis-copy">
          <p className="eyebrow">Diagnóstico gratuito</p>
          <h2 id="diagnostico-title">Descubra por onde começar com IA na sua empresa.</h2>
          <p>
            No diagnóstico inicial, vamos entender seus principais gargalos, os sistemas utilizados e
            as tarefas que mais consomem tempo da equipe.
          </p>
          <p>Você recebe uma indicação das oportunidades prioritárias e do próximo passo recomendado.</p>
          <ul className="diagnosis-contacts" aria-label="Outros canais">
            <li>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener">
                <Icon name="message-circle" size="sm" />
                WhatsApp {CONTACT.whatsappLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <Icon name="mail" size="sm" />
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
        <DiagnosisForm />
      </div>
    </section>
  )
}
