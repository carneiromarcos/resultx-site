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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const { nome, email, telefone, empresa } =
      (await context.request.json()) as ContactPayload

    if (!email || !email.includes('@') || !nome) {
      return new Response(JSON.stringify({ error: 'Campos obrigatórios faltando' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const listId = Number(context.env.BREVO_CONTACT_LIST_ID) || 3

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
          FIRSTNAME: nome,
          SMS: telefone || '',
          EMPRESA: empresa || '',
        },
        updateEnabled: true,
      }),
    })

    if (res.ok || res.status === 204) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const data = await res.json() as { code?: string }
    if (data.code === 'duplicate_parameter') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    return new Response(JSON.stringify({ error: 'Erro ao enviar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Erro interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
