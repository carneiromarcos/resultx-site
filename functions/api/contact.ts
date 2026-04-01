interface Env {
  BREVO_API_KEY: string
  BREVO_CONTACT_LIST_ID: string
}

interface ContactPayload {
  nome?: string
  email?: string
  telefone?: string
  empresa?: string
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
    const { nome, email, telefone, empresa } =
      (await context.request.json()) as ContactPayload

    if (!email || !email.includes('@') || !nome) {
      return jsonResponse({ error: 'Campos obrigatórios faltando' }, 400)
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
          TELEFONE: telefone || '',
          NOME_EMPRESA: empresa || '',
          FONTE_CAPTACAO: 'resultx.app',
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
