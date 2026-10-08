# Story — Rastreamento Google do ResultX

## Status

**Done**

Escopo autorizado por Marcos em 08/10/2026 ("faca isso", após a auditoria). Código publicado na PR #53, merge 8b610a5; comprovações externas salvas. Classificação T2 confirmada por @devops e arquitetura aprovada por @architect. Parecer final sob autoridade @qa.

## Executor Assignment

- executor: @dev — código e testes.
- quality_gate: @qa — parecer independente; @architect valida arquitetura e classificação.
- quality_gate_tools: lint, TypeScript, testes de eventos, build, Tag Assistant, GA4 DebugView/Tempo real, HTTP/XML e Search Console.
- @devops: push, PR, merge e deploy, conforme autorização do coordenador. @sm prepara a story e não implementa código.

## Story

Como responsável pela captação da ResultX, quero medir visitas, início do formulário, contatos e diagnósticos recebidos nas duas páginas públicas, para entender a origem dos interessados e avaliar o funil sem contar tentativas malsucedidas como leads.

Escopo derivado da auditoria de 08/10: `/`, `/privacidade`, um formulário de diagnóstico e cliques de WhatsApp/e-mail/CTA. Âncoras são seções da home. Não há newsletter visível na versão atual. A indexação na busca deve ser verificada separadamente da medição no Analytics.

## Acceptance Criteria

1. O destino GA4 e contêiner GTM exclusivos da ResultX são verificados e documentados antes da ativação. Não reutilizar automaticamente IDs da Emprega+ ou da PR #11. Sem configuração válida, não transmitir eventos a uma propriedade de outro produto.
2. `/` e `/privacidade` carregam a configuração Google e registram uma visualização por carregamento, sem duplicação por inicialização React ou por tags paralelas. As duas URLs aparecem no destino GA4 confirmado em verificação de navegador.
3. O formulário registra `form_start` na primeira interação com o formulário por tentativa. Não registrar valores digitados. Enhanced measurement GA4 fica desligado para evitar duplicação e coleta automática não permitida.
4. Registrar exatamente um `generate_lead` quando `/api/contact` responder HTTP de sucesso e JSON `{success: true}`. Marcar o evento como evento principal no GA4 confirmado. Cliques, validação inválida, HTTP de erro, JSON inválido, `{success: false}` e falha de rede geram zero leads. Dois submits durante o mesmo pedido não geram duplicação. Um novo pedido confirmado pode gerar um novo lead.
5. Todos os links de WhatsApp, e-mail e CTA para o diagnóstico nas páginas identificadas registram, respectivamente, `click_whatsapp`, `click_email` e `click_diagnostico`, sem impedir a navegação e sem dupla contagem.
6. Payloads Google usam apenas metadados permitidos, como identificadores estáticos do formulário/posição. Nome, empresa informada, e-mail, telefone e desafio ficam no fluxo Brevo; não aparecem no dataLayer nem em parâmetros GA4. URLs são saneadas, preservando somente UTMs válidas sem e-mails/telefones. A política de privacidade descreve factual e corretamente a medição configurada e seu uso, e sua coerência é verificada por teste.
7. `/robots.txt` retorna texto de robots válido e aponta para `https://resultx.app/sitemap.xml`. `/sitemap.xml` retorna XML válido com exatamente as URLs canônicas públicas `/` e `/privacidade`, sem âncoras ou APIs. As respostas não são o fallback HTML da home.
8. Verificar/obter acesso à propriedade ResultX no Search Console, submeter o sitemap e documentar a inspeção das duas URLs. Registrar estado real da inspeção; não prometer indexação imediata nem confundir ausência de tag com ausência no índice.
9. Passam `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`, incluindo checagem das Functions. Evidências devem distinguir testes com respostas simuladas, eventos efetivamente entregues ao Google e pendências de conta. Um bloqueio externo em GA4/GTM/Search Console bloqueia somente a comprovação correspondente, sem impedir código/testes/SEO independentes.

## Tasks / Subtasks

- [x] Registrar auditoria, autorização, inventário e critérios nesta story.
- [x] Confirmar arquitetura com @architect e classificação T2 com @devops.
- [x] Confirmar propriedade/IDs exclusivos com fontes da conta (AC 1).
- [x] Reconciliar PR #11 com o site atual, sem incorporar IDs antigos automaticamente (AC 1).
- [x] Configurar carregamento Google nas duas entradas HTML e provar ausência de dupla tag/visualização (AC 2).
- [x] Instrumentar início do formulário e cliques, com payloads permitidos e sem alterar fluxo de contato (AC 3, 5, 6).
- [x] Instrumentar o ramo de sucesso real do diagnóstico preservando a proteção `sendingRef` (AC 4, 6).
- [x] Atualizar política de privacidade e testar coerência com a configuração factual (AC 6).
- [x] Criar robots e sitemap reais e validar saída do build/HTTP (AC 7).
- [x] Configurar evento principal e verificar eventos em Tag Assistant/GA4 (AC 2–6).
- [x] Verificar Search Console, submeter sitemap e inspecionar ambas as URLs; registrar falha de leitura do sitemap (AC 8).
- [x] Adicionar/executar gates e testes focados no funil, registrar evidências e parecer pré-publicação @qa (AC 9).
- [x] Atualizar checklist, lista real de arquivos e resultados; fechamento do gate final por @qa.

## Dev Notes

- Stack verificada: React 19, Vite 8, TypeScript 6, Cloudflare Pages/Functions e Brevo. Node 22 é a versão do CI. Fonte: `package.json` e `.github/workflows/ci.yml`.
- A home entra por `index.html`; privacidade é `privacidade.html`, servida em `/privacidade`. Não presumir que a página estática executa o bundle React. Fonte: `index.html`, `privacidade.html`, `src/content/site.ts`.
- `src/components/DiagnosisForm.tsx` faz POST `/api/contact`, exige `res.ok` e `data.success === true`, e usa `sendingRef` para impedir concorrência. Inserir evento somente no sucesso confirmado. O botão "Enviar outro pedido" inicia nova tentativa. Fonte: componente atual e auditoria, seção "Formulário e Brevo".
- `functions/api/contact.ts` já cuida do Brevo. Analytics não recebe o payload de `toContactPayload`. Não adicionar chamada Google ao backend sem decisão @architect.
- O repositório inicialmente tem scripts `lint` e `build`, sem `test` ou `typecheck`; os gates exigidos precisam ser funcionais. O build não cobre automaticamente as Functions: incluir `tsconfig.functions.json` na checagem. Fonte: `package.json`, `.github/workflows/ci.yml` e memória ResultX.
- Não há orientação específica adicional de arquitetura no `docs/` deste repositório. O [desenho desta entrega](../plans/2026-10-08-google-tracking-design.md) registra o contrato funcional autorizado e a aprovação @architect: GA4/GTM exclusivos, bootstrap nas duas páginas, allowlist de eventos, URLs saneadas, enhanced measurement desligado e lead somente após API true. O contrato da API não muda.
- PR #11 é preparação antiga aberta, não evidência de rastreamento instalado. Fonte: auditoria, seção "Contas e configuração pendente".

## Testing

Testes focados em comportamento: sucesso confirmado = um lead; invalid/error/rede/JSON inválido = zero; submit simultâneo = um pedido/um lead; nova tentativa bem-sucedida = um novo lead; início de formulário só uma vez por tentativa; cliques mantêm navegação; ausência de dados pessoais em todo payload. Usar API simulada nos testes para evitar criar leads artificiais no Brevo. A entrega ao Google exige evidência de navegador além dos testes locais. Validar tags também na página estática e robots/sitemap no build e em produção.

## CodeRabbit Integration

- Tipo primário: Integration; secundários: Frontend e Deployment. Complexidade: média, por envolver site, Google e publicação.
- Agentes: @dev na implementação; @architect para decisões; @qa no parecer; @devops para operações remotas.
- [ ] Pre-Commit (@dev): `coderabbit --prompt-only -t uncommitted`, quando disponível.
- [ ] Pre-PR (@devops): `coderabbit --prompt-only --base main`, quando disponível.
- [ ] Pre-Deployment (@devops): revisão de configuração, ausência de dupla tag e rollback.
- Self-healing @dev: light, máximo duas iterações/15 minutos, correção de CRITICAL; HIGH documentado. Ausência de CLI deve ser registrada e segue fallback de revisão independente previsto na configuração AIOX, sem afirmar revisão executada.
- Focos: conversão somente no sucesso, duplicação, payloads/PII, cobertura das duas entradas, funcionamento sem Google disponível, configuração de produção e arquivos SEO reais.

## Story Draft Checklist

| Categoria | Resultado | Observação |
| --- | --- | --- |
| Objetivo e contexto | PASS | Auditoria e autorização identificadas; sem epic inventado |
| Orientação técnica | PASS | Integrações, arquivos e limites descritos; IDs pendentes explicitamente |
| Referências | PASS | Código atual, auditoria e desenho funcional apontados |
| Autossuficiência | PASS | Escopo, exceções, duplicação e falhas explicitados |
| Testes | PASS | Resultados mensuráveis e separação local/externa |
| CodeRabbit | PASS | Gates e fallback documentados, execução pendente |

Pronta para trabalho independente de código/SEO. Ativação e comprovação externa dependem de configuração Google real. Este checklist avalia a preparação da story; não substitui o parecer de qualidade @qa.

## Dev Agent Record

Implementação publicada: consentimento estatístico específico, bootstrap comum nas duas páginas, seis eventos permitidos, lead apenas após sucesso confirmado, URLs saneadas e arquivos SEO reais. Functions/Brevo intactos. @dev e @qa executaram lint, typecheck, 16 testes, build e diff --check com PASS; CI da PR e do main passou.

PR #53 merged em `8b610a517e2fd8788c12686903f2799c5912fc43`; Cloudflare Production deployment `248c86d0-f69d-4269-94cd-ae840c43b787`. GTM versão 2 publicada em 08/10 às 15:42 (Fortaleza), `GTM-56DCXS3G`; GA4 propriedade `558121580`, fluxo `16070118656`, `G-7LHE3BLF2Z`. `generate_lead` é evento principal por evento, sem valor padrão.

GA4 Tempo real recebeu ambas as páginas, os três tipos de clique, um `form_start` e um `generate_lead`/evento principal. O único envio de teste usou dados fictícios marcados DESCONSIDERAR; UI confirmou "Pedido recebido.". Essa prova confirma resposta positiva da API e entrega GA4, sem alegar inspeção do contato na interface Brevo. Não incluir o teste em indicadores comerciais. Tag Assistant mostrou somente os parâmetros permitidos, sem valores do formulário. Após revogação explícita e reload, inspeção readonly do DOM encontrou zero scripts Google.

Search Console `sc-domain:resultx.app`: home indexada (captura salva na retomada); privacidade desconhecida no índice, mas teste publicado confirmou que é indexável e solicitação de indexação foi aceita. Sitemap submetido; ainda "Não foi possível buscar o sitemap", zero URLs descobertas. HTTP 200/XML válido com duas URLs não comprova leitura pelo Google. Causa não estabelecida; proteções Cloudflare preservadas. Pendência TEST-SEO-001: reconsultar em 09/10 e investigar logs Cloudflare se persistir. PR #11 permanece aberta, IDs antigos não incorporados.

Evidências: `/Users/marcos/meus-projetos/project-management/research/evidence/resultx-google-tracking-2026-10-08/`; configuração e mapa das provas em [Google setup](../analytics/resultx-google-setup.md). CodeRabbit signed out: revisão não executada. Dívida MNT-REVIEW-001, @devops/@qa, prazo 15/10/2026. Parecer final e transição da story exclusivamente @qa.

### File List

Lista real da entrega:

- `.github/workflows/ci.yml`
- `docs/analytics/resultx-google-setup.md`
- `docs/analytics/resultx-gtm-container.json`
- `docs/plans/2026-10-08-google-tracking-design.md`
- `docs/qa/reports/2026-10-08-google-tracking-prepublication.md`
- `docs/qa/reports/2026-10-08-google-tracking-final.md`
- `docs/qa/gates/resultx-google-tracking-2026-10-08.yml`
- `docs/review-debt.md`
- `docs/stories/resultx-google-tracking-2026-10-08.md`
- `package-lock.json`
- `package.json`
- `privacidade.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/components/Diagnosis.tsx`
- `src/components/DiagnosisForm.tsx`
- `src/components/Footer.tsx`
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/lib/analytics.ts`
- `src/main.tsx`
- `src/privacy.ts`
- `src/styles/analytics.css`
- `tests/DiagnosisForm.test.tsx`
- `tests/analytics.test.ts`
- `tests/static-build.test.ts`
- `vite.config.ts`
- `vitest.config.ts`

## QA Results

Parecer independente pré-publicação @qa: **CONCERNS, apto publicar para validação externa**, sem defeito bloqueante. [Relatório](../qa/reports/2026-10-08-google-tracking-prepublication.md).

Parecer independente final Quinn (@qa), 08/10/2026: **CONCERNS**, com transição **InReview → Done** conforme `qa-gate.md`. [Relatório final](../qa/reports/2026-10-08-google-tracking-final.md). Integridade dos 21 arquivos revisados confirmada no merge `8b610a517e2fd8788c12686903f2799c5912fc43`; gates locais anteriores PASS e cinco checks da PR SUCCESS. Provas salvas comprovam duas páginas no GA4, início, lead como evento principal, três cliques, payload permitido, recusa/revogação sem scripts Google após reload e arquivos SEO corretos. Home indexada; privacidade indexável com solicitação aceita, sem indexação comprovada.

Pendências não bloqueantes: **TEST-SEO-001**, @devops/coordenador, reconsulta em **09/10/2026** (sitemap submetido, porém ainda não buscado pelo Search Console; causa desconhecida); **MNT-REVIEW-001**, @devops/@qa, prazo **15/10/2026** (CodeRabbit signed out, revisão não executada). Nenhuma aprovação CodeRabbit ou indexação de todas as páginas foi alegada.

Gate: CONCERNS → docs/qa/gates/resultx-google-tracking-2026-10-08.yml

## Change Log

| Data | Versão | Descrição | Autor |
| --- | --- | --- | --- |
| 2026-10-08 | 1.0.0 | Escopo autorizado, critérios, dependências e preparação | @sm River |
| 2026-10-08 | 1.1.0 | Implementação, publicação PR #53/8b610a5 e provas externas; leitura do sitemap pendente | Coordenador |
| 2026-10-08 | 1.1.1 | QA Gate CONCERNS — Status: InReview → Done; pendências TEST-SEO-001 e MNT-REVIEW-001 registradas | @qa |

## Sources

- Auditoria: `/Users/marcos/meus-projetos/project-management/research/resultx-google-tracking-audit-2026-10-08.md`, seções Cobertura, Formulário e Brevo, Contas, Prioridade recomendada.
- [GA4 generate_lead](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead) — nomenclatura proposta na auditoria.
- [GA4 verificação de eventos](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters) — DebugView/Tempo real.
