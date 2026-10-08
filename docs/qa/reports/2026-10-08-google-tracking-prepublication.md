# Parecer independente de pré-publicação — ResultX Google tracking

Revisor: Quinn (@qa). Data: 2026-10-08T18:39:31Z. Story: `docs/stories/resultx-google-tracking-2026-10-08.md`. Escopo T2.

**Parecer: CONCERNS, apto à publicação para validação em produção.** Nenhum defeito bloqueante foi encontrado no código, nos testes ou no contrato de tags revisado. Este parecer avalia o candidato à publicação; não encerra a story nem comprova recebimento de eventos no Google ou indexação.

Revisão determinística: `sha256:01f13093100693d9c1b191869b31df4042ee42fdf0ad70bc9f41b187140c7c7a`. SHA-256 calculado pela concatenação ordenada dos nomes dos arquivos abaixo, byte NUL, conteúdo e byte NUL. Base: `24beaa0027eff64ee47cc310e7fc4f036f9fb895`.

## Evidências executadas por @qa

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | PASS, exit 0 |
| `npm run typecheck` | PASS, exit 0; app/node e Cloudflare Functions |
| `npm test` | PASS, 3 arquivos, 16 testes, exit 0 |
| `npm run build` | PASS, exit 0; duas entradas e chunk de analytics compartilhado |
| `git diff --check` | PASS, exit 0 |
| `coderabbit auth status` | Signed out; revisão automatizada não executada |

Ambiente: Node 22.23.1, Vitest 5.0.3, Vite 8.2.1. Nenhum teste cria contato no Brevo: respostas da API são simuladas.

## Rastreabilidade e revisão

- AC 1: IDs próprios presentes no código e JSON: GTM-56DCXS3G e G-7LHE3BLF2Z. Nenhuma referência aos IDs antigos foi introduzida. O coordenador confirmou pela UI a propriedade GA4 558121580, fluxo 16070118656 e reconhecimento das tags no GTM; essa evidência externa foi comunicada ao revisor, não reproduzida por ele.
- AC 2: bootstrap único fora de StrictMode; privacidade tem entrada própria. Testes verificam uma visualização apesar de reinicialização, navegação por âncora e repetição de consentimento. Google Tag usa `send_page_view=false`; único acionador de eventos tem regex exata dos seis eventos. Recebimento das duas páginas ainda precisa de evidência externa.
- AC 3–4: primeira alteração do formulário emite `form_start` uma vez por tentativa; `generate_lead` fica exclusivamente após HTTP ok e `success === true`. Testes cobrem campos inválidos, erro HTTP, rede, JSON inválido, false, ausência de success, string "true", concorrência e novo pedido. A proteção `sendingRef` permanece.
- AC 5: delegação única de cliques; links atuais de WhatsApp, e-mail e CTA têm atributos. Teste de clique em elemento interno prova contagem única sem `preventDefault`.
- AC 6: formulário chama tracking apenas pelo nome do evento, sem valores preenchidos. Payload tem lista permitida; localização canônica elimina query/hash arbitrários, UTMs aceitam somente tokens de campanha, referrer usa apenas origem. Teste cobre e-mail e telefone em URL. Google somente carrega em `https://resultx.app` no build de produção e após aceite específico. Recusa não bloqueia formulário. Revogação nega consentimento, desabilita GA, remove cookies GA e script e recarrega para eliminar listeners. Política descreve a medição e separa consentimento estatístico do contato. Testes cobrem recusa, reabertura, revogação, sincronização entre abas e falha de listener Google.
- AC 7: teste produz build real, parseia XML sem erro e exige exatamente as duas URLs canônicas. `robots.txt` aponta ao sitemap. HTTP em produção ainda precisa de verificação.
- AC 8: inspeções Search Console e submissão do sitemap dependem da publicação. Não se infere indexação por HTTP 200 ou presença de tag.
- AC 9: gates locais completos passaram. CI, smoke visual e provas Google ficam a cargo da sequência de publicação, com parecer final posterior.

## Pontos a registrar e completar

1. **TEST-EXT-001 (medium):** comprovar em produção aceitação/recusa nas duas entradas, GTM publicado e recebimento de eventos em Tag Assistant/GA4. Teste local de `generate_lead` não prova entrega ao Google nem recebimento real no Brevo.
2. **TEST-SEO-001 (medium):** conferir Content-Type/conteúdo de robots e sitemap publicados; submeter sitemap e registrar estado real de ambas as URLs no Search Console.
3. **MNT-REVIEW-001 (medium):** CodeRabbit está desconectado. Registrar dívida de revisão T2 com responsável e prazo; não declarar aprovação CodeRabbit. Este parecer é revisão independente @qa.

Sem revisão visual de navegador nesta etapa, para não disputar a sessão de UI do coordenador. Nenhuma alteração de código foi feita pelo revisor. Gate completo e transição de lifecycle da story ficam pendentes da consolidação das provas externas.

## Arquivos revisados

`.github/workflows/ci.yml`, `docs/analytics/resultx-gtm-container.json`, `package-lock.json`, `package.json`, `privacidade.html`, `public/robots.txt`, `public/sitemap.xml`, `src/components/Diagnosis.tsx`, `src/components/DiagnosisForm.tsx`, `src/components/Footer.tsx`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/lib/analytics.ts`, `src/main.tsx`, `src/privacy.ts`, `src/styles/analytics.css`, `tests/DiagnosisForm.test.tsx`, `tests/analytics.test.ts`, `tests/static-build.test.ts`, `vite.config.ts`, `vitest.config.ts`.
