# Google tracking — ResultX

Implementação autorizada em 08/10/2026 após auditoria; risco T2. Produção e entrega externa ainda em validação.

## Destinos confirmados na conta

- Conta GA4: Google Ads - emprega+ (`253639157`), propriedade dedicada ResultX · resultx.app (`558121580`).
- Fluxo ResultX Web: `16070118656`, domínio `https://resultx.app`, ID `G-7LHE3BLF2Z`.
- Conta GTM emprega+: `6375965151`; contêiner dedicado resultx.app `266527430`, ID `GTM-56DCXS3G`.
- GA4 enhanced measurement desligado. Google signals/ad personalization desabilitados na tag.
- `generate_lead` cadastrado como evento principal, uma vez por evento, sem valor monetário padrão. Não há derivação automática de page_view para lead.
- GTM importa [configuração versionada](resultx-gtm-container.json): tag Google sem page_view automático e tag GA4 apenas para seis eventos permitidos. Parâmetros page_location/page_referrer saneados também na tag base. Consentimento adicional analytics_storage nas duas tags.

## Contrato

Consentimento básico: Google não carrega antes de aceitar estatísticas. A recusa permite contato normal. Preferência persistida e editável nas duas páginas; revogação nega consentimento, desabilita GA, remove cookies Google e recarrega a página; sincronização entre abas. Nenhum evento anterior ao aceite é reenviado. Ambientes locais/previews não medem.

Eventos: page_view (uma vez por documento), form_start (primeira alteração por pedido), generate_lead (somente HTTP ok + JSON success true), click_whatsapp, click_email e click_diagnostico (delegação única e placement estático). Nenhum campo do formulário é enviado ao Google. Referrer usa apenas origem; localização aceita só canônica e tokens UTM sem e-mail/telefone. Enhanced measurement desligado previne form_submit automático e page views por âncoras.

A API/Brevo não mudou. Testes simulam API; não criam contatos no Brevo. O recebimento real no Google e a situação de indexação precisam ser registrados como evidência externa separada.

## Revisão e rollback

CodeRabbit indisponível por autenticação (signed out); revisão não executada. Parecer independente @qa exigido antes da publicação. Dívida: autenticar CodeRabbit e revisar esta integração posteriormente, sem alegar aprovação.

Rollback disponível: Cloudflare deployment anterior `2740993c-217d-4e86-90ea-508443b12c23` / commit `24beaa0027eff64ee47cc310e7fc4f036f9fb895`. Alternativamente, publicar versão vazia anterior do contêiner GTM desativa a coleta, preservando site e Brevo. Somente @devops executa push/PR/merge/deploy.

## Busca — inspeção antes da publicação

Acesso Search Console `sc-domain:resultx.app` disponível nesta sessão (a auditoria anterior não o encontrou). Relatórios agregados ainda em processamento.
- `https://resultx.app/`: O URL está no Google; página indexada.
- `https://resultx.app/privacidade`: O URL não está no Google; Google não reconhece o URL; sem sitemap de referência/último rastreamento.
- Correção local prepara robots.txt e sitemap.xml reais. Envio ao Search Console e inspeção do publicado pendentes.

## Validação local

@dev confirmou lint, typecheck do app e Functions, 16 testes em três arquivos e build; diff --check passou. Cobertura de sucesso/erro/JSON/rede/invalidade/concorrência/novo pedido, payloads, consentimento/revogação, cliques e duas entradas/SEO. @qa executa gates independentemente.
