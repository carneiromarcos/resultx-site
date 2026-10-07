import Icon from './Icon'

/* Bloco 5 — Cases e demonstrações reais.
   Só produtos próprios do grupo, identificados como tais (não são clientes).
   Cada descrição vem de fonte verificável:
   - Emprega+: posicionamento oficial de www.empregamais.me, registrado em
     resultx-design-system/brands/emprega-mais/docs/BRAND-BOOK.md §1.
   - Electia: texto público de electia.empregamais.me (consultado em 07/10).
   - Xscore: brands/xscore (tokens e README de marca) — produto do ResultX Labs
     para crédito: score, explicação do resultado e IA. Sem site público
     conhecido, então sem link. */

interface Product {
  name: string
  kind: string
  text: string
  href?: string
  hrefLabel?: string
}

const PRODUCTS: Product[] = [
  {
    name: 'Emprega+',
    kind: 'Empregabilidade',
    text: 'Tecnologia para empregabilidade: infraestrutura digital que conecta governos, empresas e profissionais para fortalecer o mercado de trabalho.',
    href: 'https://www.empregamais.me/',
    hrefLabel: 'www.empregamais.me',
  },
  {
    name: 'Electia',
    kind: 'Avaliação comportamental e recrutamento',
    text: 'Plataforma de gestão de pessoas que reúne testes comportamentais, recrutamento e avaliação de desempenho.',
    href: 'https://electia.empregamais.me/',
    hrefLabel: 'electia.empregamais.me',
  },
  {
    name: 'Xscore',
    kind: 'Crédito',
    text: 'Produto do ResultX Labs para análise de crédito, com score e explicação do resultado apoiados por inteligência artificial.',
  },
]

export default function Demonstrations() {
  return (
    <section className="band-tint" id="demonstracoes" aria-labelledby="demonstracoes-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Cases e demonstrações reais</p>
          <h2 id="demonstracoes-title">Tecnologia que desenvolvemos em produtos do próprio grupo.</h2>
          <p>
            Emprega+, Electia e Xscore são produtos próprios do grupo ResultX, não clientes. Eles
            mostram, em aplicações reais, o tipo de solução que a ResultX desenvolve.
          </p>
        </div>
        <ul className="product-grid">
          {PRODUCTS.map((product) => (
            <li key={product.name} className="card product-card">
              <span className="product-tag">Produto próprio · {product.kind}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="card-text">{product.text}</p>
              {product.href && (
                <a className="product-link" href={product.href} target="_blank" rel="noopener">
                  {product.hrefLabel}
                  <Icon name="external-link" size="sm" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
