/* Slots de imagem de ambiência (geradas por IA, 08/10).
   Se um slot for null, <Ambience> não renderiza nada: nenhum
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
   Opção A ativa. A opção B (alternativa) não é publicada: o original está no
   scratch da sessão de 08/10 (hero/hero-b.png, 2752 × 1536). Para usá-la,
   gere hero-b.webp e hero-b-800.webp com o mesmo recorte e troque os caminhos. */
const HERO_A: AmbientImage = {
  src: '/images/ambiencia/hero-a.webp',
  width: 1360,
  height: 1536,
  srcSet: '/images/ambiencia/hero-a-800.webp 800w, /images/ambiencia/hero-a.webp 1360w',
  sizes: '(min-width: 1024px) 50vw, 100vw',
}

/* Seções (08/10, geradas por IA, aprovadas). Originais 2048 × 1152 (16:9)
   recortados em 12:5 com sharp; a fonte não chega a 2400 de largura, então
   a versão grande fica com a largura do original. Recortes (x, y, l × a):
   - servicos:    servicos-v2.png    0,   220, 2048 × 853  (painéis ouro → roxo)
   - metodo:      metodo.png         0,   160, 2048 × 853  (linhas se ordenando)
   - diagnostico: diagnostico-v2.png 176, 260, 1872 × 780  (feixe de luz; corta
                  a faixa escura vertical da borda esquerda do original) */
const SERVICOS: AmbientImage = {
  src: '/images/ambiencia/servicos.webp',
  width: 2048,
  height: 853,
  srcSet: '/images/ambiencia/servicos-1000.webp 1000w, /images/ambiencia/servicos.webp 2048w',
  sizes: '100vw',
}

const METODO: AmbientImage = {
  src: '/images/ambiencia/metodo.webp',
  width: 2048,
  height: 853,
  srcSet: '/images/ambiencia/metodo-1000.webp 1000w, /images/ambiencia/metodo.webp 2048w',
  sizes: '100vw',
}

/* Fica só atrás da coluna de texto (à esquerda), longe do formulário. */
const DIAGNOSTICO: AmbientImage = {
  src: '/images/ambiencia/diagnostico.webp',
  width: 1872,
  height: 780,
  srcSet: '/images/ambiencia/diagnostico-1000.webp 1000w, /images/ambiencia/diagnostico.webp 1872w',
  sizes: '(min-width: 1024px) 60vw, 100vw',
}

export const AMBIENT_MEDIA: Record<AmbientSlot, AmbientImage | null> = {
  hero: HERO_A,
  servicos: SERVICOS,
  metodo: METODO,
  diagnostico: DIAGNOSTICO,
}
