import { useEffect, type CSSProperties } from 'react'

/* Revelação ao rolar, por melhoria progressiva.
   O CSS só esconde [data-reveal] quando <html> tem a classe .js-reveal.
   Quem a liga primeiro é o script inline do <head> (index.html), antes da
   primeira pintura, com as MESMAS condições daqui: há IntersectionObserver e
   a pessoa não pediu movimento reduzido. O hook confirma (liga de novo, sem
   efeito) ou desliga se as condições falharem, e observa a rolagem.
   Sem suporte ou com movimento reduzido, tudo fica visível e parado.
   Só opacity e translate mudam: nada empurra o layout (sem CLS). */

const REVEAL_SELECTOR = '[data-reveal]'
const ENABLED_CLASS = 'js-reveal'
const REVEALED_CLASS = 'is-revealed'
/* Revela um pouco antes de a borda inferior da tela chegar ao elemento. */
const ROOT_MARGIN = '0px 0px -8% 0px'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function useReveal(): void {
  useEffect(() => {
    const canAnimate =
      'IntersectionObserver' in window && !window.matchMedia(REDUCED_MOTION_QUERY).matches
    const root = document.documentElement
    if (!canAnimate) {
      root.classList.remove(ENABLED_CLASS)
      return
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add(REVEALED_CLASS)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    )

    root.classList.add(ENABLED_CLASS)
    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      root.classList.remove(ENABLED_CLASS)
      targets.forEach((target) => target.classList.remove(REVEALED_CLASS))
    }
  }, [])
}

/* Índice de escalonamento (stagger) para itens de uma lista revelada. */
export function revealIndex(index: number): CSSProperties {
  return { '--reveal-i': index } as CSSProperties
}
