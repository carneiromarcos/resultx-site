/* Conteúdo compartilhado entre header, gaveta, rodapé e diagnóstico. */

export const NAV_LINKS = [
  { label: 'Aplicações', href: '#aplicacoes' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Demonstrações', href: '#demonstracoes' },
  { label: 'Método', href: '#metodo' },
  { label: 'Perguntas', href: '#perguntas' },
] as const

export const CONTACT = {
  email: 'marcos@empregamais.me',
  whatsappHref: 'https://wa.me/5511976947557',
  whatsappLabel: '(11) 97694-7557',
} as const

export const CTA_DIAGNOSIS = {
  href: '#diagnostico',
  label: 'Solicitar diagnóstico gratuito',
} as const
