import { useState, type FormEvent } from 'react'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="newsletter">
      <h4>Newsletter</h4>
      <p>Receba insights sobre IA e transformação digital.</p>
      {status === 'success' ? (
        <p className="nl-success">Inscrito com sucesso!</p>
      ) : (
        <form onSubmit={handleSubmit} className="nl-form">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-sm" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : '→'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="nl-error">Erro ao inscrever. Tente novamente.</p>}
    </div>
  )
}
