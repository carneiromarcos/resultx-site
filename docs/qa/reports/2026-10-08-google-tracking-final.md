# Parecer independente final — ResultX Google tracking

Revisor: Quinn (@qa). Data: 08/10/2026. Story: `docs/stories/resultx-google-tracking-2026-10-08.md`. Escopo T2. Revisão de evidências de produção após publicação, sem alteração de código ou uso concorrente do navegador.

**Parecer: CONCERNS.** Medição, conversão após sucesso, cliques e arquivos SEO estão comprovados. Permanecem duas pendências não bloqueantes: o Search Console ainda não conseguiu buscar o sitemap e a revisão CodeRabbit não foi executada por falta de autenticação. Não há evidência de defeito bloqueante no código publicado. O parecer não afirma indexação de todas as páginas nem aprovação CodeRabbit.

## Vínculo com a versão publicada

- PR [#53](https://github.com/carneiromarcos/resultx-site/pull/53), merge `8b610a517e2fd8788c12686903f2799c5912fc43`, deploy `https://248c86d0.resultx-site.pages.dev`.
- Conferência independente por `git show` dos 21 arquivos da revisão de pré-publicação: SHA-256 ordenado `01f13093100693d9c1b191869b31df4042ee42fdf0ad70bc9f41b187140c7c7a`, idêntico ao candidato aprovado para publicação. Nenhuma diferença nesses arquivos entre worktree e merge.
- O [parecer de pré-publicação](2026-10-08-google-tracking-prepublication.md) executou lint, typecheck de app/node/Functions, 16 testes em três arquivos, build e diff check: PASS. Estes resultados se aplicam ao código idêntico; testes não foram repetidos nesta revisão documental. Respostas da API nesses testes são simuladas.
- `github-pr-53.json` registra cinco checks SUCCESS: Lint, Build, Functions (typecheck), Tracking and form tests e PR shape. Não representam revisão CodeRabbit.

## Critérios e evidências

Os nomes de evidência abaixo referem-se ao diretório `/Users/marcos/meus-projetos/project-management/research/evidence/resultx-google-tracking-2026-10-08/`. DOMs, registros JSON de scripts e seis capturas visuais foram inspecionados pelo revisor; ações externas foram realizadas pelo coordenador, não repetidas por @qa.

| Critério | Resultado e limite da evidência |
| --- | --- |
| AC 1 — destino próprio | Configuração versionada/documentada: propriedade ResultX `558121580`, fluxo `16070118656`, `G-7LHE3BLF2Z` e `GTM-56DCXS3G`. `gtm-version-2-dom.txt` comprova versão 2 ativa, com duas tags e um acionador. `lead-datalayer-dom.txt/.jpg` mostra esses IDs na sessão pública. A conta agrupa produtos, mas o contêiner e o fluxo usados são dedicados à ResultX. |
| AC 2 — duas páginas e contagem | `ga4-both-pages-dom.txt/.jpg`: home com 2 visualizações e privacidade com 1, total 3, compatível com os dois carregamentos da home e um da privacidade informados pelo coordenador. A captura anterior `ga4-first-lead-dom.txt` mostra 1 page_view no primeiro carregamento. Testes do candidato cobrem reinicialização/âncoras/aceite repetido sem duplicação. |
| AC 3 — início do formulário | `ga4-first-lead-dom.txt`: form_start = 1. Contrato de enhanced measurement desligado está documentado em `docs/analytics/resultx-google-setup.md`; proteção por tentativa e ausência de valores digitados foram revisadas/testadas no candidato idêntico. |
| AC 4 — diagnóstico confirmado | `form-confirmed-dom.txt` mostra Pedido recebido; `ga4-first-lead-dom.txt` mostra generate_lead = 1; `ga4-final-events-dom.txt` confirma generate_lead = 1 como evento principal. Coordenador informa um envio QA fictício com domínio example.com após sucesso da API. O ramo de sucesso estrito e todos os caminhos negativos/concorrência estão cobertos pelos testes anteriores; esta captura não é uma consulta independente à base Brevo. |
| AC 5 — cliques | `ga4-final-events-dom.txt`: click_diagnostico = 1, click_email = 1 e click_whatsapp = 1 recebidos. Cobertura dos links e preservação da navegação estão na revisão/testes anteriores. |
| AC 6 — dados e consentimento | `lead-datalayer-dom.txt/.jpg`: evento com URL canônica, referrer de origem, form_id estático e metadados técnicos GTM; nenhum valor pessoal digitado aparece. `privacy-refused-dom.txt` contém política e botão de preferências após revogação. `privacy-revocation-google-scripts.json` registra dois scripts Google antes da revogação e lista vazia após recusa/reload; `privacy-refused-google-scripts.json` confirma lista vazia após recusa explícita. O DOM acessível sozinho não enumera scripts; estes registros estruturados complementam `privacy-revocation-dom.txt`. Testes anteriores cobrem recusa, revogação, URL com PII, UTMs, sincronização e indisponibilidade de Google. Não se extrapola o único payload visual para todos os dados técnicos processados pelo Google. |
| AC 7 — robots/sitemap | `production-deployment.json`: ambas as páginas HTTP 200, robots HTTP 200 text/plain apontando ao sitemap, sitemap HTTP 200 application/xml com exatamente as duas URLs canônicas. Build real/XML já passou no candidato. |
| AC 8 — Search Console | Acesso à propriedade resultx.app comprovado. `search-home-indexed-dom.txt/.jpg` mostra a home no Google e A página está indexada. `search-privacy-index-request-dom.txt/.jpg`: teste em tempo real de 08/10/2026 15:46 informa URL disponível/possível indexar e solicitação aceita na fila. Isso não prova indexação de privacidade. `sitemap-final-status-dom.txt/.jpg`: envio aceito, porém estado atual Não foi possível buscar o sitemap e 0 páginas encontradas. `sitemap-resumed-status-dom.txt/.jpg` reproduz o mesmo estado na retomada, sem sucesso de leitura. As duas inspeções de URL estão documentadas com seus estados distintos. |
| AC 9 — gates e distinções | Gates locais revisados e CI SUCCESS estão vinculados ao código publicado. Evidências externas comprovam recebimento Google e resposta visual do formulário, separadas de testes simulados e das duas pendências abaixo. |

## Pendências e encaminhamento

1. **TEST-SEO-001 — medium, responsável @devops/coordenador.** Search Console aceitou a submissão, mas ainda não obteve o sitemap. Reconsultar o estado e registrar a primeira leitura bem-sucedida; se persistir, consultar eventos/regras da Cloudflare com credencial apropriada antes de propor mudança. `cloudflare-sitemap-readonly.json` mostra zona ativa, OAuth existente sem permissão de leitura das configurações (403), requests Python bloqueados com 1010 e curl/Mozilla/UA Googlebot com 200. Trocar o User-Agent não autentica o crawler Google. Não há prova de que a Cloudflare causou a falha observada no Search Console; a causa permanece desconhecida. Privacidade continua com indexação pendente, apesar do teste ao vivo positivo e pedido aceito.
2. **MNT-REVIEW-001 — medium, responsáveis @devops/@qa, prazo 15/10/2026.** `coderabbit auth status` foi reexecutado nesta revisão e permanece signed out. Autenticar e executar a revisão sobre a versão publicada; registrar os achados e tratá-los conforme severidade. Revisão independente @qa é o parecer disponível, sem alegar revisão automatizada executada ou ausência comprovada de findings CodeRabbit.

**TEST-EXT-001 encerrado:** entrega Google nas duas páginas, início, lead e cliques demonstrados; consentimento complementado por registros de recusa/revogação em produção; cenários negativos cobertos pelo candidato idêntico e smoke comunicado. **TEST-SEO-001 parcialmente resolvido:** arquivos públicos corretos, acesso e submissões demonstrados; leitura do sitemap e indexação de privacidade permanecem em acompanhamento.

## Lifecycle

AC 8 exige acesso, submissão e documentação do estado real; não exige indexação imediata ou sucesso imediato do fetch. Portanto, com as duas inspeções documentadas, as pendências acima justificam CONCERNS, não FAIL. Pela task `qa-gate.md`, CONCERNS aplica **InReview → Done**, com pendências abertas e acompanháveis. A transição foi aplicada por @qa na story consolidada, com Change Log semver 1.1.1. Nenhum campo fora de Status, QA Results e Change Log foi alterado por @qa.

Gate final: `docs/qa/gates/resultx-google-tracking-2026-10-08.yml`.
