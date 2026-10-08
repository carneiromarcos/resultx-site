/* Slots de imagem de ambiência (a gerar por IA depois).
   Enquanto um slot for null, <Ambience> não renderiza nada: nenhum
   placeholder vai para produção. Para preencher, coloque o arquivo em
   public/images/ambiencia/ e troque null por { src, width, height }.

   Tamanhos pedidos (WebP, qualidade ~78, < 250 KB):
   - hero:        2400 × 1350 (16:9), assunto à direita, esquerda escura e
                  limpa para o texto; sem orb, sem pessoas reconhecíveis.
   - servicos:    2400 × 1000 (12:5), textura/luz de fundo, baixo contraste.
   - metodo:      2400 × 1000 (12:5), fluxo/linhas da esquerda para a direita.
   - diagnostico: 2400 × 1000 (12:5), luz quente vindo de baixo à esquerda.
   Todas sobre o grafite #0B0E14 com ouro (#c4993b) e roxo (#6f32b1) da ponte. */

export interface AmbientImage {
  src: string
  width: number
  height: number
  /* Versões menores para telas estreitas (atributo srcset). */
  srcSet?: string
  sizes?: string
}

export type AmbientSlot = 'hero' | 'servicos' | 'metodo' | 'diagnostico'

/* Abertura (08/10, Higgsfield · Nano Banana Pro, aprovada pelo Marcos).
   O original tem 2752 × 1536 com a metade esquerda em grafite liso e uma
   emenda vertical no meio: o arquivo publicado é só a metade direita
   (recorte a partir de x = 1392), e o CSS funde a borda esquerda no fundo.
   Opção A ativa; a opção B fica pronta em /images/ambiencia/hero-b*.webp —
   para trocar, substitua "hero-a" por "hero-b" nos três caminhos abaixo. */
const HERO_A: AmbientImage = {
  src: '/images/ambiencia/hero-a.webp',
  width: 1360,
  height: 1536,
  srcSet: '/images/ambiencia/hero-a-800.webp 800w, /images/ambiencia/hero-a.webp 1360w',
  sizes: '(min-width: 1024px) 50vw, 100vw',
}

export const AMBIENT_MEDIA: Record<AmbientSlot, AmbientImage | null> = {
  hero: HERO_A,
  servicos: null,
  metodo: null,
  diagnostico: null,
}
