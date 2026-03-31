/**
 * gen-descriptions.mjs
 * 为缺少 description 的 MD 文件自动生成并写入 frontmatter description
 * 运行：node scripts/gen-descriptions.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

const DRY_RUN = process.argv.includes('--dry-run')
const MAX_DESC_LEN = 100 // 中文字符数上限（Bing 摘要约 120 字，留余量）

// ── 工具函数 ────────────────────────────────────────────────────────────────

function walk(dir) {
  const results = []
  for (const f of readdirSync(dir)) {
    const full = join(dir, f)
    if (statSync(full).isDirectory()) results.push(...walk(full))
    else if (f.endsWith('.md') && f !== 'README.md') results.push(full)
  }
  return results
}

/** 解析 frontmatter，返回 { meta, body } */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)/)
  if (!match) return { meta: null, body: content }
  return { meta: match[1], body: match[2] }
}

/** 从 body 提取 H1 标题 */
function extractH1(body) {
  const m = body.match(/^#\s+(.+)/m)
  if (!m) return ''
  // 去掉编号前缀 "00 " / "01 " 等
  return m[1].replace(/^\d+\s+/, '').trim()
}

/** 从 body 提取第一段有效正文（跳过标题、空行、指令块、代码块） */
function extractFirstPara(body) {
  const lines = body.split(/\r?\n/)
  let inCode = false
  const paras = []
  let cur = []

  for (const line of lines) {
    // 代码块开关
    if (line.startsWith('```')) { inCode = !inCode; continue }
    if (inCode) continue
    // 跳过 frontmatter 遗留、指令块、表格行
    if (line.startsWith(':::') || line.startsWith('|') || line.startsWith('---')) continue
    // 跳过标题行
    if (/^#{1,4}\s/.test(line)) {
      if (cur.length) { paras.push(cur.join(' ')); cur = [] }
      continue
    }
    const trimmed = line.trim()
    if (!trimmed) {
      if (cur.length) { paras.push(cur.join(' ')); cur = [] }
    } else {
      cur.push(trimmed)
    }
  }
  if (cur.length) paras.push(cur.join(' '))

  // 找第一段有实质内容的段落（> 10 个字符）
  for (const p of paras) {
    const clean = p
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`[^`]*`/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]+>/g, '')
      .trim()
    if (clean.length > 10) return clean
  }
  return ''
}

/** 截断到指定字符数，不截断词语中间 */
function truncate(str, max) {
  if (str.length <= max) return str
  return str.slice(0, max - 1) + '…'
}

/** 根据文件路径生成前缀关键词 */
function getPrefix(rel) {
  if (rel.includes('beginner-openclaw-framework-focus')) return 'OpenClaw AI框架专项：'
  if (rel.includes('beginner-openclaw-guide')) return 'OpenClaw 源码剖析：'
  if (rel.includes('tutorials/concepts')) return 'OpenClaw 核心概念：'
  if (rel.includes('tutorials/channels')) return 'OpenClaw 通道接入：'
  if (rel.includes('tutorials/providers')) return 'OpenClaw 模型接入：'
  if (rel.includes('tutorials/gateway')) return 'OpenClaw Gateway：'
  if (rel.includes('tutorials/installation')) return 'OpenClaw 安装部署：'
  if (rel.includes('tutorials/automation')) return 'OpenClaw 自动化：'
  if (rel.includes('tutorials/tools')) return 'OpenClaw 工具系统：'
  if (rel.includes('tutorials/help')) return 'OpenClaw 帮助：'
  if (rel.includes('tutorials/getting-started')) return 'OpenClaw 快速入门：'
  return 'OpenClaw：'
}

/** 构建 description 字符串 */
function buildDesc(rel, title, firstPara) {
  const prefix = getPrefix(rel)
  // 用标题 + 首段构建，优先级：首段 > 标题
  if (firstPara) {
    // 先放前缀+标题，若有空间再拼首段
    const base = prefix + title + '。'
    const remaining = MAX_DESC_LEN - base.length
    if (remaining > 15 && firstPara.length > 5) {
      return truncate(base + truncate(firstPara, remaining), MAX_DESC_LEN)
    }
    return truncate(prefix + title, MAX_DESC_LEN)
  }
  return truncate(prefix + title, MAX_DESC_LEN)
}

/** 将 description 写入或更新 frontmatter */
function injectDesc(content, desc) {
  const { meta, body } = parseFrontmatter(content)
  // 转义 YAML 中的引号
  const escaped = desc.replace(/"/g, '\\"')
  if (meta !== null) {
    // 有 frontmatter：在末尾追加 description 行
    const newMeta = meta + `\ndescription: "${escaped}"`
    return `---\n${newMeta}\n---\n${body}`
  } else {
    // 无 frontmatter：在文件头插入
    return `---\ndescription: "${escaped}"\n---\n${content}`
  }
}

// ── 主流程 ──────────────────────────────────────────────────────────────────

const files = walk('docs').filter(f => !f.includes('index.md'))
let updated = 0
let skipped = 0

for (const file of files) {
  const content = readFileSync(file, 'utf-8')
  const { meta, body } = parseFrontmatter(content)

  // 已有 description 则跳过
  if (meta && /^description:/m.test(meta)) {
    skipped++
    continue
  }

  const title = extractH1(body || content)
  const firstPara = extractFirstPara(body || content)

  if (!title && !firstPara) {
    skipped++
    continue
  }

  const rel = relative('docs', file).replace(/\\/g, '/')
  const desc = buildDesc(rel, title, firstPara)

  if (DRY_RUN) {
    console.log(`\n[${rel}]`)
    console.log(`  → ${desc}`)
    console.log(`  (${desc.length} chars)`)
  } else {
    const newContent = injectDesc(content, desc)
    writeFileSync(file, newContent, 'utf-8')
    console.log(`✓ ${rel}`)
  }
  updated++
}

console.log(`\n${ DRY_RUN ? '[DRY RUN] ' : '' }完成：更新 ${updated} 个文件，跳过 ${skipped} 个文件`)
