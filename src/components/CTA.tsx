import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './CTA.css'

export default function CTA() {
  const ref = useScrollAnimation()

  return (
    <section id="cta" ref={ref}>
      <div className="cta-bg" />
      <div className="container">
        <div className="cta-content fade-in">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Pronto para começar?
          </div>
          <h2>
            Transforme seu negócio com{' '}
            <span className="gradient-text">IA e estratégia</span>
          </h2>
          <p>
            Agende um diagnóstico gratuito e descubra como a ResultX pode acelerar seus
            resultados em até 90 dias.
          </p>
          <div className="cta-actions">
            <a href="mailto:marcos@empregamais.me" className="btn btn-primary btn-lg">
              Agendar Diagnóstico Gratuito →
            </a>
            <a href="https://wa.me/5511997955029" className="btn btn-gold btn-lg">
              Falar no WhatsApp
            </a>
          </div>
          <p className="cta-note">
            Sem compromisso. Diagnóstico 100% gratuito. Resposta em até 24 horas.
          </p>
        </div>
      </div>
    </section>
  )
}
