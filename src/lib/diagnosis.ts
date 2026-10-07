/* Formulário de diagnóstico: validação no cliente e montagem do envio.

   Contrato de /api/contact (functions/api/contact.ts), que NÃO muda:
     { nome, email, telefone, empresa } → { success: true } | { error }
   `desafio` e `consentimento` seguem no mesmo JSON como campos extras. A
   Function atual os ignora sem erro; para gravá-los no Brevo é preciso
   mudar a Function (decisão registrada no relatório da tarefa). */

export interface DiagnosisForm {
  nome: string
  empresa: string
  email: string
  whatsapp: string
  desafio: string
  consentimento: boolean
}

export type DiagnosisField = keyof DiagnosisForm
export type DiagnosisErrors = Partial<Record<DiagnosisField, string>>

export const EMPTY_DIAGNOSIS: DiagnosisForm = {
  nome: '',
  empresa: '',
  email: '',
  whatsapp: '',
  desafio: '',
  consentimento: false,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_MIN_DIGITS = 10
const PHONE_MAX_DIGITS = 13
const NAME_MIN = 2
const CHALLENGE_MAX = 1000

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function validateDiagnosis(form: DiagnosisForm): DiagnosisErrors {
  const errors: DiagnosisErrors = {}
  const phoneDigits = onlyDigits(form.whatsapp).length

  if (form.nome.trim().length < NAME_MIN) errors.nome = 'Informe seu nome.'
  if (!form.empresa.trim()) errors.empresa = 'Informe o nome da empresa.'
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Informe um e-mail válido.'
  if (phoneDigits < PHONE_MIN_DIGITS || phoneDigits > PHONE_MAX_DIGITS) {
    errors.whatsapp = 'Informe o WhatsApp com DDD.'
  }
  if (!form.desafio.trim()) errors.desafio = 'Conte qual é o principal gargalo da sua operação.'
  else if (form.desafio.length > CHALLENGE_MAX) errors.desafio = `Use até ${CHALLENGE_MAX} caracteres.`
  if (!form.consentimento) errors.consentimento = 'Precisamos da sua autorização para responder.'

  return errors
}

export function toContactPayload(form: DiagnosisForm) {
  return {
    nome: form.nome.trim(),
    email: form.email.trim(),
    telefone: onlyDigits(form.whatsapp),
    empresa: form.empresa.trim(),
    desafio: form.desafio.trim(),
    consentimento: form.consentimento,
  }
}

export const DIAGNOSIS_LIMITS = { challengeMax: CHALLENGE_MAX } as const
