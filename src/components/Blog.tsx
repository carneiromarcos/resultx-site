import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Blog.css'

const POSTS = [
  {
    tag: 'Inteligência Artificial',
    title: 'Como implementar IA no seu negócio em 90 dias: um guia prático',
    excerpt: 'Descubra o passo a passo que usamos com mais de 200 empresas para implementar IA de forma rápida, segura e com ROI mensurável.',
    img: '/images/blog-1.jpg',
  },
  {
    tag: 'Transformação Digital',
    title: 'Os 5 erros mais comuns na transformação digital e como evitá-los',
    excerpt: 'A maioria das iniciativas de transformação digital falha por razões previsíveis. Conheça os erros mais comuns e as estratégias para superá-los.',
    img: '/images/blog-2.jpg',
  },
  {
    tag: 'Desenvolvimento',
    title: 'Squads de desenvolvimento: como montar equipes que entregam 3x mais rápido',
    excerpt: 'A estrutura de squads ágeis é o segredo das empresas tech mais bem-sucedidas. Veja como replicar esse modelo na sua organização.',
    img: '/images/blog-3.jpg',
  },
]

export default function Blog() {
  const ref = useScrollAnimation()

  return (
    <section id="blog" ref={ref}>
      <div className="container">
        <div className="blog-header">
          <div>
            <div className="section-label">Conhecimento</div>
            <h2>
              Últimas do <span className="gradient-text">Blog ResultX</span>
            </h2>
          </div>
          <a href="#blog" className="btn btn-outline">
            Ver todos os artigos →
          </a>
        </div>
        <div className="blog-grid">
          {POSTS.map((p) => (
            <article key={p.title} className="blog-card fade-in">
              <div className="blog-img-wrap">
                <img src={p.img} alt={p.title} loading="lazy" />
              </div>
              <div className="blog-body">
                <span className="blog-tag">{p.tag}</span>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
