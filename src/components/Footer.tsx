import Icon from './Icon'
import Logo from './Logo'
import { CONTACT, CTA_DIAGNOSIS, NAV_LINKS, PRIVACY_HREF } from '../content/site'

/* Rodapé no padrão do hub Emprega+ (DS, 07/10): marca + resumo, colunas com
   rótulo em mono, base com direitos. Só links que levam a algum lugar. */

/* Só produtos do ResultX Labs com site público. Xscore ainda não tem,
   então aparece só em Demonstrações. */
const PRODUCTS = [
  { label: 'Electia', href: 'https://electia.empregamais.me/' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <a href="#inicio" aria-label="ResultX, voltar ao início"><Logo /></a>
          <p className="footer-about">Implementação de IA e melhoria de processos.</p>
        </div>

        <nav className="footer-col" aria-labelledby="ft-navegue">
          <h2 id="ft-navegue">Navegue</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
            <li><a href={CTA_DIAGNOSIS.href}>Diagnóstico gratuito</a></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-labelledby="ft-produtos">
          <h2 id="ft-produtos">ResultX Labs</h2>
          <ul>
            {PRODUCTS.map((product) => (
              <li key={product.href}>
                <a href={product.href} target="_blank" rel="noopener">{product.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-labelledby="ft-contato">
          <h2 id="ft-contato">Contato</h2>
          <ul>
            <li>
              <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size="sm" />{CONTACT.email}</a>
            </li>
            <li>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener">
                <Icon name="message-circle" size="sm" />{CONTACT.whatsappLabel}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} ResultX. Todos os direitos reservados.</p>
        <a href={PRIVACY_HREF}>Política de Privacidade</a>
      </div>
    </footer>
  )
}
