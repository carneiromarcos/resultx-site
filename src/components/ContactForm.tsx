import { useState, type FormEvent } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './ContactForm.css'

interface FormData {
  nome: string
  email: string
  telefone: string
  empresa: string
}

const INITIAL: FormData = { nome: '', email: '', telefone: '', empresa: '' }

export default function ContactForm() {
  const ref = useScrollAnimation()
  const [form, setForm] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function update(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info fade-in-left">
            <div className="section-label">Fale com um especialista</div>
            <h2>
              Pronto para <span className="gradient-text">transformar</span> seu negócio?
            </h2>
            <p>
              Preencha o formulário e nossa equipe entrará em contato em até 24 horas para
              agendar seu diagnóstico gratuito.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <a href="mailto:marcos@empregamais.me">marcos@empregamais.me</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="https://wa.me/5511997955029">+55 (11) 9 9795-5029</a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap fade-in-right">
            {status === 'success' ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Mensagem enviada!</h3>
                <p>Entraremos em contato em até 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={update('nome')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail corporativo</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@empresa.com"
                    value={form.email}
                    onChange={update('email')}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <input
                      id="telefone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={form.telefone}
                      onChange={update('telefone')}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="empresa">Empresa</label>
                    <input
                      id="empresa"
                      type="text"
                      placeholder="Nome da empresa"
                      value={form.empresa}
                      onChange={update('empresa')}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Solicitar Diagnóstico Gratuito →'}
                </button>
                {status === 'error' && (
                  <p className="form-error">Erro ao enviar. Tente novamente.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
