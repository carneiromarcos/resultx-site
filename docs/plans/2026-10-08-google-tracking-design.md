# Desenho funcional — Rastreamento Google ResultX

Data: 08/10/2026. Story: [resultx-google-tracking-2026-10-08](../stories/resultx-google-tracking-2026-10-08.md).

O escopo funcional foi autorizado por Marcos com "faca isso", em resposta à auditoria do ResultX. Arquitetura aprovada por @architect e classificação T2 confirmada por @devops, conforme comunicação do coordenador em 08/10/2026. IDs reais verificados: GA4 G-7LHE3BLF2Z, propriedade558121580 e GTM-56DCXS3G. Consentimento estatístico separado do contato, Google carrega somente após aceite em produção.

## Resultado

As duas páginas públicas e as interações de captação são medidas em um destino GA4 confirmado para ResultX. Um diagnóstico passa a contar como lead somente quando a API confirma o recebimento. Robots e sitemap deixam de devolver a home e a situação das duas URLs é inspecionada no Search Console.

## Inventário

| Superfície | Entrada | Medição |
| --- | --- | --- |
| Home | `index.html` / `/` | page_view, início de formulário, cliques, lead confirmado |
| Privacidade | `privacidade.html` / `/privacidade` | page_view e contatos presentes |
| Diagnóstico | POST `/api/contact` | generate_lead após HTTP ok e success true |
| WhatsApp / e-mail / CTA | Links existentes | Eventos de clique, sem interromper navegação |

As âncoras da home não são páginas adicionais. Não ampliar para newsletter histórica ou subdomínios de outros produtos.

## Contrato de eventos

| Evento | Gatilho | Regra de contagem |
| --- | --- | --- |
| `page_view` | Carregamento de uma das duas páginas | Um evento por carregamento, sem tag duplicada |
| `form_start` | Primeira interação na tentativa do diagnóstico | Uma vez por tentativa; sem capturar valores |
| `generate_lead` | API retorna HTTP ok e JSON success true | Uma vez por envio confirmado; evento principal GA4 |
| `click_whatsapp` | Acionar link WhatsApp | Um por clique |
| `click_email` | Acionar link de e-mail | Um por clique |
| `click_diagnostico` | Acionar CTA para o formulário | Um por clique; não conta como lead |

Eventos customizados de clique são os nomes propostos na auditoria e autorizados neste escopo. Metadados devem ter lista permitida, como `form_id: diagnostico` e identificador estático da posição do link. Nome, empresa digitada, e-mail, telefone e desafio nunca entram no dataLayer/GA4. URLs são saneadas, preservando somente UTMs válidas sem e-mails/telefones. Enhanced measurement fica desligado para impedir duplicação e coleta automática fora do contrato. A política de privacidade será atualizada com descrição factual da medição e testada quanto à coerência com a configuração implantada.

O fluxo de sucesso já existente da API/Brevo continua sendo a fonte da conversão. Não há requisito de medir evento no backend. Bloqueio de Analytics não pode quebrar o formulário ou a navegação.

## Configuração e decisões pendentes

- Confirmar/criar propriedade e fluxo GA4 para ResultX, registrar propriedade, domínio e ID real. A conta acessada na auditoria não disponibilizou propriedade ResultX; isso não prova inexistência em outras contas.
- Decisão @architect: GA4 e GTM exclusivos da ResultX, bootstrap nas duas entradas e allowlist de eventos. Não usar contêiner Emprega+ automaticamente.
- Estratégia única de `page_view` e `form_start`, com enhanced measurement desligado; não combinar disparos manuais e automáticos duplicados.
- IDs confirmados: **G-7LHE3BLF2Z / GTM-56DCXS3G**, ver docs/analytics/resultx-google-setup.md. Não inserir placeholders válidos ou números de outros produtos. PR #11 exige reconciliação com o formulário/entradas atuais.
- Classificação T2 confirmada por @devops. O contrato da API permanece intacto.

## Busca Google

Servir `robots.txt` como texto de regras e `sitemap.xml` como XML com `https://resultx.app/` e `https://resultx.app/privacidade`. Arquivos estáticos devem chegar ao artefato final sem cair no fallback SPA. Não listar `/api/contact` nem fragmentos. A entrega de sitemap organiza descoberta e não garante indexação.

Verificar propriedade Search Console com o método que os acessos reais permitirem, submeter sitemap e inspecionar as duas URLs. Registrar a conclusão concreta (acesso, descoberta, rastreamento, indexação ou pendência), sem declarar sucesso pelo simples HTTP 200.

## Validação e conclusão

Testes locais usam respostas simuladas para verificar success/invalid/erro/concorrência e payloads. Tags são conferidas em ambas as páginas; entrega ao Google é verificada com Tag Assistant e GA4 DebugView/Tempo real. Um teste de API simulada prova instrumentação, não prova recebimento Brevo real. Antes de conclusão, documentar qual evidência foi obtida em cada sistema.

Gates: lint, typecheck de app e Functions, testes e build. Scripts typecheck/test estavam ausentes ao preparar o desenho; implementador deve tornar os gates executáveis. @qa concede o parecer; @devops faz operações remotas. Rollback técnico deve permitir remover/desativar a medição sem desfazer a integração Brevo e sem perder robots/sitemap válidos.

Se faltar acesso/configuração Google, avançar código, testes, artefatos SEO e preparação. Somente ativação/validação externa correspondente fica pendente; não declarar tracking de produção funcionando até comprovar o destino e recebimento.

## Referências

- Auditoria local: `/Users/marcos/meus-projetos/project-management/research/resultx-google-tracking-audit-2026-10-08.md`.
- Código base verificado: `index.html`, `privacidade.html`, `src/components/DiagnosisForm.tsx`, `src/content/site.ts`, `functions/api/contact.ts`, `package.json`, `.github/workflows/ci.yml`.
- [Google: evento generate_lead](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead).
- [Google: verificação de eventos GA4](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).
