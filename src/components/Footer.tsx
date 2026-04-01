import Newsletter from './Newsletter'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logo-resultx.svg" alt="ResultX" className="footer-logo" />
            <p>
              Consultoria em transformação digital. Unimos estratégia, tecnologia e IA para
              acelerar resultados.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn" title="LinkedIn" aria-label="LinkedIn">in</a>
              <a href="#" className="social-btn" title="Instagram" aria-label="Instagram">ig</a>
              <a href="#" className="social-btn" title="YouTube" aria-label="YouTube">yt</a>
              <a href="https://wa.me/5511997955029" className="social-btn" title="WhatsApp" aria-label="WhatsApp">wa</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Soluções</h4>
            <ul>
              <li><a href="#solutions">Implementação de IA</a></li>
              <li><a href="#solutions">Cursos e Treinamento</a></li>
              <li><a href="#solutions">Mudanças Estruturais</a></li>
              <li><a href="#solutions">Squads de Desenvolvimento</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#about">Sobre a ResultX</a></li>
              <li><a href="#methodology">Metodologia</a></li>
              <li><a href="#differentials">Diferenciais</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#cta">Carreiras</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <ul>
              <li><a href="mailto:marcos@empregamais.me">marcos@empregamais.me</a></li>
              <li><a href="https://wa.me/5511997955029">+55 (11) 9 9795-5029</a></li>
              <li><a href="#cta">Agendar Reunião</a></li>
              <li><a href="#cta">Diagnóstico Gratuito</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <Newsletter />
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ResultX. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
