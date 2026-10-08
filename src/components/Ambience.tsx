import { AMBIENT_MEDIA, type AmbientSlot } from '../content/media'

/* Imagem decorativa de fundo de uma seção (slot em content/media.ts).
   Slot vazio = nada no DOM. A seção que a usa precisa de position: relative
   e isolation: isolate (ver .has-ambience em sections.css). */

interface AmbienceProps {
  slot: AmbientSlot
  /* Só o hero carrega cedo; o resto espera a rolagem. */
  priority?: boolean
}

export default function Ambience({ slot, priority = false }: AmbienceProps) {
  const image = AMBIENT_MEDIA[slot]
  if (!image) return null
  return (
    <img
      className={`ambience ambience-${slot}`}
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.sizes}
      width={image.width}
      height={image.height}
      alt=""
      aria-hidden="true"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
