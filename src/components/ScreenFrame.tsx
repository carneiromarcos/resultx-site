/* Moldura de navegador para telas reais de produto.
   A inclinação/parallax vem de CSS com scroll-driven animation (sem JS) e
   fica desligada com movimento reduzido ou sem suporte do navegador. */

export interface ScreenImage {
  src: string
  width: number
  height: number
  alt: string
  /* Texto da barra de endereço; só ilustrativo, não é link. */
  address: string
}

interface ScreenFrameProps {
  screen: ScreenImage
  className?: string
}

export default function ScreenFrame({ screen, className = '' }: ScreenFrameProps) {
  return (
    <figure className={`screen-frame ${className}`.trim()}>
      <div className="screen-frame-bar" aria-hidden="true">
        <span className="screen-frame-dots"><i /><i /><i /></span>
        <span className="screen-frame-address">{screen.address}</span>
      </div>
      <img
        className="screen-frame-img"
        src={screen.src}
        width={screen.width}
        height={screen.height}
        alt={screen.alt}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}
