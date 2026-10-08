import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DiagnosisForm from '../src/components/DiagnosisForm'
import { trackAnalytics } from '../src/lib/analytics'

vi.mock('../src/lib/analytics', () => ({ trackAnalytics: vi.fn() }))
Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true)
let root: Root
let host: HTMLDivElement
const fetchMock = vi.fn()
const tracker = vi.mocked(trackAnalytics)

beforeEach(async () => {
  tracker.mockClear()
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
  await act(async () => { root.render(<DiagnosisForm />) })
})
afterEach(async () => {
  await act(async () => { root.unmount() })
  host.remove()
  vi.unstubAllGlobals()
})

async function fill() {
  const values = { nome: 'Pessoa Teste', empresa: 'Empresa Teste', email: 'teste@example.com', whatsapp: '(11) 99999-0000', desafio: 'Desafio pessoal que não pode ir para o Google' }
  for (const [name, value] of Object.entries(values)) {
    const field = host.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)!
    const prototype = name === 'desafio' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(field, value)
    await act(async () => { field.dispatchEvent(new Event('input', { bubbles: true })) })
  }
  await act(async () => { host.querySelector<HTMLInputElement>('[name="consentimento"]')!.click() })
}
async function submit() { await act(async () => { host.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })) }) }
const leads = () => tracker.mock.calls.filter(([event]) => event === 'generate_lead')

describe('diagnosis event integration', () => {
  it('never sends or records a lead for invalid fields', async () => {
    await submit()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(leads()).toHaveLength(0)
    expect(host.querySelector('[aria-invalid="true"]')).not.toBeNull()
  })

  it.each([
    ['HTTP error', () => Promise.resolve({ ok: false, json: vi.fn() })],
    ['network failure', () => Promise.reject(new Error('offline'))],
    ['invalid JSON', () => Promise.resolve({ ok: true, json: () => Promise.reject(new SyntaxError()) })],
    ['JSON false', () => Promise.resolve({ ok: true, json: () => Promise.resolve({ success: false }) })],
    ['missing success', () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })],
    ['string success', () => Promise.resolve({ ok: true, json: () => Promise.resolve({ success: 'true' }) })],
  ])('records zero leads for %s', async (_label, response) => {
    fetchMock.mockImplementation(response)
    await fill()
    await submit()
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(leads()).toHaveLength(0)
    expect(host.textContent).toContain('Não foi possível enviar agora')
    expect(tracker.mock.calls.filter(([event]) => event === 'form_start')).toHaveLength(1)
  })

  it('counts one confirmed lead, prevents concurrent sends and permits another successful attempt', async () => {
    let resolve!: (value: unknown) => void
    fetchMock.mockImplementationOnce(() => new Promise((done) => { resolve = done }))
    await fill()
    await act(async () => {
      const form = host.querySelector('form')!
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(leads()).toHaveLength(0)
    await act(async () => { resolve({ ok: true, json: () => Promise.resolve({ success: true }) }) })
    expect(leads()).toHaveLength(1)
    expect(host.textContent).toContain('Pedido recebido.')
    await act(async () => { host.querySelector<HTMLButtonElement>('button')!.click() })
    await fill()
    fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) })
    await submit()
    expect(leads()).toHaveLength(2)
    expect(tracker.mock.calls.filter(([event]) => event === 'form_start')).toHaveLength(2)
    expect(tracker.mock.calls.every((call) => call.length === 1)).toBe(true)
    expect(JSON.stringify(tracker.mock.calls)).not.toMatch(/Pessoa|Empresa|teste@|99999|Desafio/)
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(payload).toMatchObject({ nome: 'Pessoa Teste', email: 'teste@example.com', telefone: '5511999990000', consentimento: true })
  })
})
