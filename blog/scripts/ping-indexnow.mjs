/**
 * 构建后自动向 IndexNow 推送全站 URL
 * 支持引擎：Bing / IndexNow 网络
 * 用法：node scripts/ping-indexnow.mjs
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const KEY = 'b5c07ad1556cbf950d03b26f7e17f4e8'
const HOST = 'openclaw-docs.dx3n.cn'
const SITEMAP_PATH = resolve('docs/.vitepress/dist/sitemap.xml')

let xml
try {
  xml = readFileSync(SITEMAP_PATH, 'utf-8')
} catch {
  console.error('sitemap.xml not found at', SITEMAP_PATH)
  process.exit(1)
}

const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
console.log(`[IndexNow] Found ${urls.length} URLs`)

// IndexNow 单次最多 10,000 条
const BATCH = 10_000
for (let i = 0; i < urls.length; i += BATCH) {
  const batch = urls.slice(i, i + BATCH)
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: batch,
  })

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  })

  const batchNum = Math.floor(i / BATCH) + 1
  console.log(`[IndexNow] Batch ${batchNum}: HTTP ${res.status} ${res.statusText}`)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.warn('[IndexNow] Response body:', text)
  }
}

console.log('[IndexNow] Done')
