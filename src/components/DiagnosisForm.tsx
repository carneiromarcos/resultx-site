import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import Icon from './Icon'
import { PRIVACY_HREF } from '../content/site'
import { trackAnalytics } from '../lib/analytics'
import {
  DIAGNOSIS_LIMITS,
  EMPTY_DIAGNOSIS,
  toContactPayload,
  validateDiagnosis,
  type DiagnosisErrors,
  type DiagnosisField,
  type DiagnosisForm as FormValues,
} from '../lib/diagnosis'

type Status = 'idle' | 'sending' | 'success' | 'error'

const FIELD_ORDER: DiagnosisField[] = ['nome', 'empresa', 'email', 'whatsapp', 'desafio', 'consentimento']
const fieldId = (field: DiagnosisField) => `diag-${field}`
const errorId = (field: DiagnosisField) => `diag-${field}-erro`

async function sendDiagnosis(values: FormValues): Promise<boolean> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toContactPayload(values)),
  })
  if (!res.ok) return false
  const data = (await res.json().catch(() => null)) as { success?: boolean } | null
  return data?.success === true
}

interface TextFieldProps {
  field: Exclude<DiagnosisField, 'consentimento' | 'desafio'>
  label: string
  type: string
  autoComplete: string
  placeholder: string
  value: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function TextField({ field, label, type, autoComplete, placeholder, value, error, onChange }: TextFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={fieldId(field)}>{label}</label>
      <input
        id={fieldId(field)}
        className="form-input"
        name={field}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(field) : undefined}
        required
      />
      {error && <p className="field-error" id={errorId(field)}>{error}</p>}
    </div>
  )
}

export default function DiagnosisForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_DIAGNOSIS)
  const [errors, setErrors] = useState<DiagnosisErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const successRef = useRef<HTMLDivElement>(null)
  const sendingRef = useRef(false)
  const startedRef = useRef(false)

  function update(field: DiagnosisField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!startedRef.current) {
        startedRef.current = true
        trackAnalytics('form_start')
      }
      const target = event.target
      const next = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value
      setValues((prev) => ({ ...prev, [field]: next }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /* Ref, não estado: dois submits no mesmo tick enxergariam o mesmo
       `status` antigo e passariam os dois. */
    if (sendingRef.current) return
    const found = validateDiagnosis(values)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((field) => found[field])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    sendingRef.current = true
    setStatus('sending')
    try {
      const ok = await sendDiagnosis(values)
      setStatus(ok ? 'success' : 'error')
      if (ok) {
        trackAnalytics('generate_lead')
        setValues(EMPTY_DIAGNOSIS)
        requestAnimationFrame(() => successRef.current?.focus())
      }
    } catch {
      setStatus('error')
    } finally {
      sendingRef.current = false
    }
  }

  if (status === 'success') {
    return (
      <div className="diagnosis-card diagnosis-success" ref={successRef} tabIndex={-1} role="status">
        <span className="success-mark" aria-hidden="true"><Icon name="check" size="lg" /></span>
        <h3>Pedido recebido.</h3>
        <p>Obrigado. Vamos entrar em contato para combinar o diagnóstico.</p>
        <button type="button" className="btn btn-secondary" onClick={() => { startedRef.current = false; setStatus('idle') }}>
          Enviar outro pedido
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form className="diagnosis-card" onSubmit={handleSubmit} noValidate aria-labelledby="diagnostico-form-title">
      <h3 id="diagnostico-form-title" className="diagnosis-form-title">Diagnóstico gratuito</h3>
      <div className="form-row">
        <TextField field="nome" label="Nome" type="text" autoComplete="name" placeholder="Seu nome"
          value={values.nome} error={errors.nome} onChange={update('nome')} />
        <TextField field="empresa" label="Empresa" type="text" autoComplete="organization" placeholder="Nome da empresa"
          value={values.empresa} error={errors.empresa} onChange={update('empresa')} />
      </div>
      <div className="form-row">
        <TextField field="email" label="E-mail" type="email" autoComplete="email" placeholder="voce@empresa.com.br"
          value={values.email} error={errors.email} onChange={update('email')} />
        <TextField field="whatsapp" label="WhatsApp" type="tel" autoComplete="tel" placeholder="(11) 90000-0000"
          value={values.whatsapp} error={errors.whatsapp} onChange={update('whatsapp')} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor={fieldId('desafio')}>Principal gargalo ou desafio</label>
        <textarea
          id={fieldId('desafio')}
          className="form-textarea"
          name="desafio"
          rows={4}
          maxLength={DIAGNOSIS_LIMITS.challengeMax}
          placeholder="Ex.: leads sem resposta, relatórios feitos à mão, documentos conferidos um a um."
          value={values.desafio}
          onChange={update('desafio')}
          aria-invalid={errors.desafio ? true : undefined}
          aria-describedby={errors.desafio ? errorId('desafio') : undefined}
          required
        />
        {errors.desafio && <p className="field-error" id={errorId('desafio')}>{errors.desafio}</p>}
      </div>
      <div className="form-group consent">
        <input
          id={fieldId('consentimento')}
          type="checkbox"
          name="consentimento"
          checked={values.consentimento}
          onChange={update('consentimento')}
          aria-invalid={errors.consentimento ? true : undefined}
          aria-describedby={errors.consentimento ? errorId('consentimento') : undefined}
          required
        />
        <label htmlFor={fieldId('consentimento')}>
          Autorizo a ResultX a usar estes dados para entrar em contato sobre o diagnóstico, conforme a{' '}
          {/* Nova aba: abrir na mesma perderia o que já foi digitado. */}
          <a href={PRIVACY_HREF} target="_blank" rel="noopener">
            Política de Privacidade<span className="sr-only"> (abre em nova aba)</span>
          </a>{' '}
          (LGPD).
        </label>
        {errors.consentimento && <p className="field-error" id={errorId('consentimento')}>{errors.consentimento}</p>}
      </div>
      <button type="submit" className="btn btn-primary btn-lg diagnosis-submit" disabled={sending} aria-busy={sending}>
        {sending ? 'Enviando…' : 'Solicitar diagnóstico gratuito'}
      </button>
      {/* Contêiner estável: existe desde o início, então o leitor de tela
          anuncia a mensagem quando ela entra. */}
      <div className="form-status" aria-live="assertive" aria-atomic="true">
        {status === 'error' && <p>Não foi possível enviar agora. Tente de novo ou fale com a gente pelo WhatsApp.</p>}
      </div>
    </form>
  )
}
