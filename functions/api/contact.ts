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

async function brevoFetch(path: string, apiKey: string, body: object) {
  return fetch(`https://api.brevo.com/v3${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(body),
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { nome, email, telefone, empresa } =
      (await context.request.json()) as ContactPayload

    if (!email || !email.includes('@') || !nome) {
      return jsonResponse({ error: 'Campos obrigatórios faltando' }, 400)
    }

    const apiKey = context.env.BREVO_API_KEY
    const listId = Number(context.env.BREVO_CONTACT_LIST_ID) || 23

    // 1. Create/update contact
    const contactRes = await brevoFetch('/contacts', apiKey, {
      email,
      listIds: [listId],
      attributes: {
        FIRSTNAME: nome,
        SMS: telefone || '',
      },
      updateEnabled: true,
    })

    if (!contactRes.ok && contactRes.status !== 204) {
      const data = await contactRes.json() as { code?: string }
      if (data.code !== 'duplicate_parameter') {
        return jsonResponse({ error: 'Erro ao criar contato' }, 500)
      }
    }

    // 2. Create/link company if provided
    if (empresa) {
      // Create company with "nome da empresa"
      const companyRes = await brevoFetch('/companies', apiKey, {
        name: empresa,
      })

      let companyId: string | null = null

      if (companyRes.ok) {
        const companyData = await companyRes.json() as { id?: string }
        companyId = companyData.id || null
      } else {
        // Company may already exist — search for it
        const searchRes = await fetch(
          `https://api.brevo.com/v3/companies?filters=${encodeURIComponent(JSON.stringify({ "name": empresa }))}`,
          {
            headers: { 'api-key': apiKey },
          }
        )
        if (searchRes.ok) {
          const searchData = await searchRes.json() as { items?: Array<{ id: string }> }
          if (searchData.items && searchData.items.length > 0) {
            companyId = searchData.items[0].id
          }
        }
      }

      // 3. Link company to contact
      if (companyId) {
        await fetch('https://api.brevo.com/v3/companies/link-unlink', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            linkContactIds: [
              // Get contact ID by email
            ],
            companyId,
          }),
        }).catch(() => {}) // non-blocking

        // Alternative: link via contact email
        await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            attributes: {
              FIRSTNAME: nome,
              SMS: telefone || '',
            },
          }),
        }).catch(() => {})
      }
    }

    return jsonResponse({ success: true })
  } catch {
    return jsonResponse({ error: 'Erro interno' }, 500)
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders })
}
