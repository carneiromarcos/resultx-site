/* Conteúdo compartilhado entre header, gaveta, rodapé e diagnóstico. */

export const NAV_LINKS = [
  { label: 'Aplicações', href: '#aplicacoes' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Demonstrações', href: '#demonstracoes' },
  { label: 'Método', href: '#metodo' },
  { label: 'Perguntas', href: '#perguntas' },
] as const

export const CONTACT = {
  email: 'contato@resultx.app',
  whatsappHref: 'https://wa.me/5511967947557',
  whatsappLabel: '(11) 96794-7557',
} as const

/* Página estática privacidade.html, servida em /privacidade pelo Cloudflare Pages. */
export const PRIVACY_HREF = '/privacidade'

export const CTA_DIAGNOSIS = {
  href: '#diagnostico',
  label: 'Solicitar diagnóstico gratuito',
} as const
