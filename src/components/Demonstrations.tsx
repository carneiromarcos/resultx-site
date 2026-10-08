import Icon from './Icon'
import ScreenFrame, { type ScreenImage } from './ScreenFrame'
import { revealIndex } from '../hooks/useReveal'

/* Bloco 5 — Cases e demonstrações reais.
   Electia e Xscore são produtos do ResultX Labs que também atendem a
   consultoria ResultX (decisão do Marcos, 08/10). Nunca "clientes".
   Cada descrição vem de fonte verificável:
   - Electia: texto público de electia.empregamais.me (consultado em 07/10).
   - Xscore: módulo de financeiro e cobrança (definição do Marcos, 08/10);
     carteira e cobrança são telas reais do app. Sem site público
     conhecido, então sem link.
   Telas, todas com dados de demonstração e sem a barra lateral:
   - Electia: protótipos do DS (brands/electia/previews/prototypes, 05 e 06/10).
   - Xscore: rotas /styleguide/finance do app (fixtures fictícias, next dev
     local sem .env, 08/10). Visão geral só com os indicadores, o gráfico e a lista (sem cabeçalho,
     título nem rodapé, que falavam de crédito); Carteira até a coluna
     "Maior atraso", com o rótulo interno da faixa da tabela coberto pela cor
     da própria faixa. */

interface Product {
  name: string
  kind: string
  text: string
  href?: string
  hrefLabel?: string
  screens?: [ScreenImage, ScreenImage?]
}

const PRODUCTS: Product[] = [
  {
    name: 'Electia',
    kind: 'RH e gestão de pessoas',
    text: 'Plataforma de gestão de pessoas que reúne testes comportamentais, recrutamento e avaliação de desempenho.',
    href: 'https://electia.empregamais.me/',
    hrefLabel: 'electia.empregamais.me',
    screens: [
      {
        src: '/images/produtos/electia-dashboard.webp',
        width: 1600,
        height: 933,
        alt: 'Tela inicial do Electia: indicadores de colaboradores e testes concluídos, gráfico de testes por tipo e o assistente Nexus, com dados de demonstração.',
        address: 'electia · Dashboard',
      },
      {
        src: '/images/produtos/electia-assessments.webp',
        width: 1600,
        height: 1040,
        alt: 'Catálogo de testes do Electia: DISC, Tipologia Cognitiva, Eneagrama, Big Five, Temperamentos e Motivadores, cada um com botão Aplicar.',
        address: 'electia · Assessments',
      },
    ],
  },
  {
    name: 'Xscore',
    kind: 'Financeiro e cobrança',
    text: 'Produto do ResultX Labs para gestão financeira e cobrança, com acompanhamento da carteira.',
    screens: [
      {
        src: '/images/produtos/xscore-visao-geral.webp',
        width: 1600,
        height: 744,
        alt: 'Visão geral do Xscore: carteira a receber, total vencido, pontualidade em valor, clientes acima do limite, gráfico da evolução da carteira e lista de quem acompanhar, com dados de demonstração.',
        address: 'xscore · Visão geral',
      },
      {
        src: '/images/produtos/xscore-carteira.webp',
        width: 1600,
        height: 845,
        alt: 'Carteira de clientes do Xscore: filtros por situação, busca e tabela com limite, valor em uso, vencido e maior atraso de empresas fictícias.',
        address: 'xscore · Carteira de clientes',
      },
    ],
  },
]

function ProductLink({ product }: { product: Product }) {
  if (!product.href) return null
  return (
    <a className="product-link" href={product.href} target="_blank" rel="noopener">
      {product.hrefLabel}
      <Icon name="external-link" size="sm" />
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}

export default function Demonstrations() {
  return (
    <section className="band-tint" id="demonstracoes" aria-labelledby="demonstracoes-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Cases e demonstrações reais</p>
          <h2 id="demonstracoes-title">Tecnologia que desenvolvemos em produtos próprios.</h2>
          <p>
            Electia e Xscore são produtos do ResultX Labs, não clientes, e também atendem a
            consultoria ResultX. Eles mostram, em aplicações reais, o tipo de solução que
            desenvolvemos.
          </p>
        </div>
        <ul className="product-list">
          {PRODUCTS.map((product, index) => {
            const [front, back] = product.screens ?? []
            return (
              <li
                key={product.name}
                className={`card card-lift product-card${front ? ' product-feature' : ''}${index % 2 ? ' product-feature-mirror' : ''}`}
                data-reveal
                style={revealIndex(index)}
              >
                <div className="product-copy">
                  <span className="product-tag">ResultX Labs · {product.kind}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="card-text">{product.text}</p>
                  {front && <p className="product-note">Protótipo com dados de demonstração.</p>}
                  <ProductLink product={product} />
                </div>
                {front && (
                  <div className="screen-stack">
                    {back && <ScreenFrame screen={back} className="screen-back screen-tilt" />}
                    <ScreenFrame screen={front} className="screen-front screen-tilt" />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
