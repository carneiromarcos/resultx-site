import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build } from 'vite'
import { expect, it } from 'vitest'

it('builds both tracked entries and real robots/XML routes with only canonical URLs', async () => {
  const outDir = await mkdtemp(join(tmpdir(), 'resultx-tracking-test-'))
  try {
    await build({ configFile: 'vite.config.ts', logLevel: 'silent', build: { outDir, emptyOutDir: true } })
    const [home, privacy, robots, sitemap] = await Promise.all(['index.html', 'privacidade.html', 'robots.txt', 'sitemap.xml'].map((file) => readFile(join(outDir, file), 'utf8')))
    for (const html of [home, privacy]) {
      const doc = new DOMParser().parseFromString(html, 'text/html')
      expect(doc.querySelectorAll('script[type="module"]')).toHaveLength(1)
      expect(doc.querySelector('script[src*="googletagmanager"]')).toBeNull()
      expect(doc.querySelector('noscript iframe')).toBeNull()
    }
    expect(privacy).toContain('Google Analytics 4 e Google Tag Manager')
    expect(privacy).toContain('recusar')
    expect(privacy).not.toContain('não usa ferramentas de análise')
    expect(robots).toContain('User-agent: *')
    expect(robots).toContain('Sitemap: https://resultx.app/sitemap.xml')
    expect(robots).not.toContain('<html')
    const xml = new DOMParser().parseFromString(sitemap, 'application/xml')
    expect(xml.querySelector('parsererror')).toBeNull()
    expect(Array.from(xml.querySelectorAll('loc')).map((node) => node.textContent)).toEqual(['https://resultx.app/', 'https://resultx.app/privacidade'])
    expect(xml.querySelector('lastmod')).toBeNull()
  } finally { await rm(outDir, { recursive: true, force: true }) }
}, 30000)

it('privacy policy names the data protection officer and has no open placeholders', async () => {
  const html = await readFile('privacidade.html', 'utf8')
  expect(html).not.toMatch(/PENDENTE|\[definir\]|TODO/i)
  expect(html).toContain('encarregado pelo tratamento de dados')
  expect(html).toContain('Marcos Carneiro')
  expect(html).toContain('mailto:contato@resultx.app')
  expect(html).toContain('24 meses')
})
