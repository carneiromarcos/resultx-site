# Google tracking — ResultX

Implementação autorizada em 08/10/2026 após auditoria; risco T2. Código publicado e entrega dos eventos comprovada no GA4. PR [#53](https://github.com/carneiromarcos/resultx-site/pull/53), merge `8b610a517e2fd8788c12686903f2799c5912fc43`, deployment Cloudflare Production `248c86d0-f69d-4269-94cd-ae840c43b787`.

## Destinos confirmados na conta

- Conta GA4: Google Ads - emprega+ (`253639157`), propriedade dedicada ResultX · resultx.app (`558121580`).
- Fluxo ResultX Web: `16070118656`, domínio `https://resultx.app`, ID `G-7LHE3BLF2Z`.
- Conta GTM emprega+: `6375965151`; contêiner dedicado resultx.app `266527430`, ID `GTM-56DCXS3G`.
- GA4 enhanced measurement desligado. Google signals/ad personalization desabilitados na tag.
- `generate_lead` cadastrado como evento principal, uma vez por evento, sem valor monetário padrão. Não há derivação automática de page_view para lead.
- GTM versão **2 publicada**, 08/10/2026 às 15:42 (Fortaleza); importa [configuração versionada](resultx-gtm-container.json): tag Google sem page_view automático e tag GA4 apenas para seis eventos permitidos. Parâmetros page_location/page_referrer saneados também na tag base. Consentimento adicional analytics_storage nas duas tags.

## Contrato

Consentimento básico: Google não carrega antes de aceitar estatísticas. A recusa permite contato normal. Preferência persistida e editável nas duas páginas; revogação nega consentimento, desabilita GA, remove cookies Google e recarrega a página; sincronização entre abas. Nenhum evento anterior ao aceite é reenviado. Ambientes locais/previews não medem.

Eventos: page_view (uma vez por documento), form_start (primeira alteração por pedido), generate_lead (somente HTTP ok + JSON success true), click_whatsapp, click_email e click_diagnostico (delegação única e placement estático). Nenhum campo do formulário é enviado ao Google. Referrer usa apenas origem; localização aceita só canônica e tokens UTM sem e-mail/telefone. Enhanced measurement desligado previne form_submit automático e page views por âncoras.

A API/Brevo não mudou. Os 16 testes automatizados simulam a API e não criam contatos. Separadamente, um envio técnico em produção com dados fictícios marcados DESCONSIDERAR recebeu confirmação da API/UI e gerou exatamente um lead no GA4. Não foi feita inspeção do contato na interface Brevo; esse teste não é dado comercial.

## Revisão e rollback

CodeRabbit indisponível por autenticação (signed out); revisão não executada. Parecer independente @qa pré-publicação: CONCERNS, sem defeito bloqueante; revisão final em [relatório QA](../qa/reports/2026-10-08-google-tracking-final.md). Dívida: autenticar CodeRabbit e revisar esta integração posteriormente, sem alegar aprovação.

Rollback disponível: Cloudflare deployment anterior `2740993c-217d-4e86-90ea-508443b12c23` / commit `24beaa0027eff64ee47cc310e7fc4f036f9fb895`. Alternativamente, publicar versão vazia anterior do contêiner GTM desativa a coleta, preservando site e Brevo. Somente @devops executa push/PR/merge/deploy.

## Busca — estado verificado após publicação

Search Console `sc-domain:resultx.app` disponível; relatórios agregados ainda em processamento. O acesso não estava disponível na auditoria inicial; nenhuma permissão/verificação foi alterada por esta implementação.

- `https://resultx.app/`: **URL no Google, página indexada**. Reinspeção e captura na retomada confirmaram o estado.
- `https://resultx.app/privacidade`: ainda desconhecida no índice na inspeção; teste da URL publicada confirmou **disponível para o Google / é possível indexar**. Solicitação de indexação aceita, sem garantia de inclusão imediata.
- Sitemap submetido e registrado na tabela; permanece **Não foi possível buscar o sitemap**, tipo desconhecido, zero páginas encontradas, inclusive na retomada. Não declarar leitura bem-sucedida ou todas as páginas indexadas.
- HTTP público: robots `200 text/plain`; sitemap `200 application/xml`, XML válido com exatamente duas URLs canônicas. Respostas sem fallback HTML. Causa da falha Search Console não estabelecida: user-agent Python encontrou proteção Cloudflare; user-agents de navegador/curl/Googlebot receberam 200, o que não prova acesso do crawler Google verificado. Consulta readonly de segurança/logs Cloudflare limitada pelas permissões do OAuth; proteção não alterada.
- Followup **TEST-SEO-001**, @devops/coordenador: reconsultar Search Console em 09/10/2026; se persistir, obter logs/read-only adequados e identificar a causa antes de propor qualquer configuração de segurança.

## Validação e evidências

Lint, typecheck de app/Functions, 16 testes em três arquivos, build e diff --check passaram com @dev e foram reproduzidos por @qa. CI PR #53 e main verde. Testes cobrem sucesso, erro, JSON, rede, invalidade, concorrência, novo pedido, payloads, consentimento/revogação, cliques e duas entradas/SEO. Integridade dos 21 arquivos de código/configuração de execução confirmada pelo QA final contra o merge publicado.

Provas salvas em `project-management/research/evidence/resultx-google-tracking-2026-10-08/` no workspace do coordenador:

| Verificação | Artefato | Resultado / limite |
| --- | --- | --- |
| GA4: ambas as páginas | ga4-both-pages-dom.txt / ga4-both-pages.jpg | Home e privacidade recebidas; as duas visitas da home correspondem a contextos distintos, não duplicação por documento |
| Funil / cliques | ga4-first-lead-dom.txt / ga4-final-events-dom.txt | Um início, um lead e um evento principal; três tipos de clique recebidos |
| API/UI | form-confirmed-dom.txt | "Pedido recebido." para teste fictício; não é inspeção Brevo |
| Parâmetros | lead-datalayer-dom.txt / lead-datalayer.jpg | Valores pessoais do formulário ausentes |
| Revogação | privacy-revocation-google-scripts.json / privacy-revocation-dom.txt | Duas tags Google antes; nenhuma após recusar e reload; observação de DOM, não captura de todas as requisições |
| GTM | gtm-version-2-dom.txt / gtm-version-2.jpg | Versão 2 publicada e ativa |
| Home no índice | search-home-indexed-dom.txt / search-home-indexed.jpg | Página indexada |
| Privacidade | search-privacy-index-request-dom.txt / .jpg | Live test indexável e solicitação aceita |
| Sitemap | sitemap-resumed-status-dom.txt / .jpg | Falha de fetch persiste; submissão aceita não significa processamento |
| HTTP/Cloudflare | seo-http-user-agents.json / cloudflare-sitemap-readonly.json | XML público válido; causa GSC não comprovada |
| Publicação/CI | production-deployment.json / github-pr-53.json | SHA/deploy production e cinco checks aprovados |

Pendência de revisão **MNT-REVIEW-001** em [review-debt](../review-debt.md), @devops/@qa, prazo 15/10/2026: CodeRabbit signed out; não foi executado e não há aprovação desse serviço.
