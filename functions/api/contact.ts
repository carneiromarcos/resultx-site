interface Env {
  BREVO_API_KEY: string
  BREVO_CONTACT_LIST_ID: string
}

interface ContactPayload {
  nome?: string
  email?: string
  telefone?: string
  empresa?: string
  desafio?: unknown
  consentimento?: unknown
}

/* Mesmo limite do cliente (src/lib/diagnosis.ts, CHALLENGE_MAX). */
const DESAFIO_MAX = 1000
const TIME_ZONE = 'America/Sao_Paulo'

/* Data do consentimento no formato do atributo de data da Brevo (YYYY-MM-DD),
   no fuso de São Paulo: um envio às 22h de Brasília conta para o mesmo dia. */
function consentDate(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

function cleanDesafio(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, DESAFIO_MAX) : ''
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { nome, email, telefone, empresa, desafio, consentimento } =
      (await context.request.json()) as ContactPayload

    // O corpo é JSON de fora: tipo errado é erro do pedido (400), não do servidor.
    if (typeof nome !== 'string' || typeof email !== 'string' || !email.includes('@') || !nome) {
      return jsonResponse({ error: 'Campos obrigatórios faltando' }, 400)
    }

    // Sem consentimento explícito (LGPD), nada é gravado.
    if (consentimento !== true) {
      return jsonResponse({ error: 'Consentimento obrigatório' }, 400)
    }

    const listId = Number(context.env.BREVO_CONTACT_LIST_ID) || 23

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': context.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        attributes: {
          NOME: nome,
          TELEFONE: typeof telefone === 'string' ? telefone : '',
          NOME_EMPRESA: typeof empresa === 'string' ? empresa : '',
          FONTE_CAPTACAO: 'resultx.app',
          DESAFIO: cleanDesafio(desafio),
          CONSENTIMENTO_LGPD: consentDate(new Date()),
        },
        updateEnabled: true,
      }),
    })

    if (res.ok || res.status === 204) {
      return jsonResponse({ success: true })
    }

    const data = await res.json() as { code?: string }
    if (data.code === 'duplicate_parameter') {
      return jsonResponse({ success: true })
    }

    return jsonResponse({ error: 'Erro ao enviar' }, 500)
  } catch {
    return jsonResponse({ error: 'Erro interno' }, 500)
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders })
}
