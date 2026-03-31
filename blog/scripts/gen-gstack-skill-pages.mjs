/**
 * 根据 docs/skills.md 表格顺序生成 blog/docs/gstack/skills/*.md
 * 运行: node scripts/gen-gstack-skill-pages.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../docs/gstack/skills')

const skills = [
  { cmd: 'office-hours', role: 'YC Office Hours', anchor: 'office-hours', dir: 'office-hours', summary: '建议作为起点。六个「逼问式」问题，在写代码前重构你对产品的表述；挑战前提、给出实现路径备选。产出设计文档，供后续技能使用。' },
  { cmd: 'plan-ceo-review', role: 'CEO / Founder', anchor: 'plan-ceo-review', dir: 'plan-ceo-review', summary: '创始人视角重想问题，挖掘请求背后的「10 分产品」。四种模式：全面扩展、选择性扩展、守住范围、缩减范围。' },
  { cmd: 'plan-eng-review', role: 'Eng Manager', anchor: 'plan-eng-review', dir: 'plan-eng-review', summary: '锁定架构、数据流、图示、边界情况与测试，把隐含假设摊开在桌面上。' },
  { cmd: 'plan-design-review', role: 'Senior Designer', anchor: 'plan-design-review', dir: 'plan-design-review', summary: '计划阶段的设计评审（非上线后）。各设计维度 0–10 分，说明 10 分长什么样，并改计划补齐。' },
  { cmd: 'design-consultation', role: 'Design Partner', anchor: 'design-consultation', dir: 'design-consultation', summary: '从零搭建完整设计系统：审美、字体、色板、间距、动效；可调研竞品视觉，并生成预览页与 DESIGN.md。' },
  { cmd: 'review', role: 'Staff Engineer', anchor: 'review', dir: 'review', summary: '合并前审查：找出「过 CI 却在生产爆炸」的问题；明显问题可直接修，并标出完整性缺口。' },
  { cmd: 'investigate', role: 'Debugger', anchor: 'investigate', dir: 'investigate', summary: '系统化根因分析。铁律：没有调查就不给修复；追踪数据流、验证假设，连续失败修复则停手。' },
  { cmd: 'design-review', role: 'Designer Who Codes', anchor: 'design-review', dir: 'design-review', summary: '针对真实站点/实现的视觉审计 + 修复循环；大量检查项，原子提交与前后对比截图。' },
  { cmd: 'design-shotgun', role: 'Design Explorer', anchor: 'design-shotgun', dir: 'design-shotgun', summary: '生成多版 AI 设计稿，在浏览器中对比看板迭代，直到选定方向；可记住你的审美偏好。' },
  { cmd: 'design-html', role: 'Design Engineer', anchor: 'design-html', dir: 'design-html', summary: '把 /design-shotgun 定稿做成可生产的 HTML；适配缩放与内容高度，按设计类型路由 API，可探测 React/Svelte/Vue 等栈。' },
  { cmd: 'qa', role: 'QA Lead', anchor: 'qa', dir: 'qa', summary: '测应用、找 bug、原子提交修复并复验；可为每次修复自动生成回归测试。' },
  { cmd: 'qa-only', role: 'QA Reporter', anchor: 'qa', dir: 'qa-only', summary: '与 /qa 同一套方法，但只出报告不改代码；适合纯缺陷清单场景。' },
  { cmd: 'ship', role: 'Release Engineer', anchor: 'ship', dir: 'ship', summary: '同步 main、跑测试、看覆盖率、推送并开 PR；若无测试框架会引导补齐。一条命令走完。' },
  { cmd: 'land-and-deploy', role: 'Release Engineer', anchor: 'land-and-deploy', dir: 'land-and-deploy', summary: '合并 PR、等待 CI 与部署、用金丝雀思路验证线上健康；从「已批准」到「线上已验证」。' },
  { cmd: 'canary', role: 'SRE', anchor: 'canary', dir: 'canary', summary: '发布后监控：控制台错误、性能回退、页面失败等，基于 browse 守护进程持续观察。' },
  { cmd: 'benchmark', role: 'Performance Engineer', anchor: 'benchmark', dir: 'benchmark', summary: '建立首屏、Web Vitals、资源体积等基线；在 PR 上对比前后并跟踪趋势。' },
  { cmd: 'cso', role: 'Chief Security Officer', anchor: 'cso', dir: 'cso', summary: 'OWASP Top 10 + STRIDE；关注注入、认证、加密与访问控制等。' },
  { cmd: 'document-release', role: 'Technical Writer', anchor: 'document-release', dir: 'document-release', summary: '发版后把 README/架构等文档与真实 shipped 内容对齐，减少陈旧说明。' },
  { cmd: 'retro', role: 'Eng Manager', anchor: 'retro', dir: 'retro', summary: '团队感知的周回顾：按人总结、发货连续记录、测试健康与成长点。' },
  { cmd: 'browse', role: 'QA Engineer', anchor: 'browse', dir: 'browse', summary: '给智能体「眼睛」：真实 Chromium、真实点击与截图，命令级延迟约 100ms。' },
  { cmd: 'setup-browser-cookies', role: 'Session Manager', anchor: 'setup-browser-cookies', dir: 'setup-browser-cookies', summary: '从本机 Chrome / Arc / Brave / Edge 等导入 Cookie 到无头会话，便于测登录态页面。' },
  { cmd: 'autoplan', role: 'Review Pipeline', anchor: 'autoplan', dir: 'autoplan', summary: '一条命令跑完 CEO → 设计 → 工程评审，内置决策原则；只把品味级取舍留给你拍板。' },
  { cmd: 'learn', role: 'Memory', anchor: 'learn', dir: 'learn', summary: '跨会话管理 gstack 学到的模式：回顾、搜索、修剪与导出项目级偏好。' },
  { cmd: 'codex', role: 'Second Opinion', anchor: 'codex', dir: 'codex', summary: 'OpenAI Codex CLI 第二意见：代码评审（过/不过）、对抗挑战、可连续多轮的咨询。可与 /review 交叉对照。' },
  { cmd: 'careful', role: 'Safety Guardrails', anchor: 'safety--guardrails', dir: 'careful', summary: '在危险命令（rm -rf、DROP、强推、reset --hard 等）执行前警告；常规清理构建产物有白名单。' },
  { cmd: 'freeze', role: 'Edit Lock', anchor: 'safety--guardrails', dir: 'freeze', summary: '把所有编辑限制在单一目录内，防止排错时「顺手改到别处」；仅拦 Edit/Write，不拦 bash 改文件。' },
  { cmd: 'guard', role: 'Full Safety', anchor: 'safety--guardrails', dir: 'guard', summary: '同时启用 /careful 与 /freeze，适合碰生产或线上排障。' },
  { cmd: 'unfreeze', role: 'Unlock', anchor: 'safety--guardrails', dir: 'unfreeze', summary: '解除 /freeze 的目录边界，恢复全局可编辑。' },
  { cmd: 'connect-chrome', role: 'Chrome Controller', anchor: 'connect-chrome', dir: 'connect-chrome', summary: '启动真实 Chrome 并由 gstack 控制，配合侧栏扩展逐步观看操作。' },
  { cmd: 'setup-deploy', role: 'Deploy Configurator', anchor: 'setup-deploy', dir: 'setup-deploy', summary: '为 /land-and-deploy 做一次性配置：识别平台、生产 URL、部署命令等。' },
  { cmd: 'gstack-upgrade', role: 'Self-Updater', anchor: 'gstack-upgrade', dir: 'gstack-upgrade', summary: '升级 gstack；区分全局与项目内安装并可选同步，展示变更摘要。' },
]

const REPO_SKILLS =
  'https://github.com/garrytan/gstack/blob/main/docs/skills.md'

function md({ cmd, role, anchor, dir, summary }, i) {
  const num = String(i + 1).padStart(2, '0')
  const filename = `${num}-${cmd}.md`
  const body = `# \`/${cmd}\`

**角色定位**：${role}

## 摘要

${summary}

## 英文深度解读

哲学、工作流与示例见仓库 [**docs/skills.md**](${REPO_SKILLS}#${anchor})（与上表章节对应）。

## 源码目录

gstack 仓库内技能实现目录：[\`${dir}/\`](https://github.com/garrytan/gstack/tree/main/${dir})

---
[← 技能索引](/gstack/skills/)
`
  return { filename, body }
}

mkdirSync(outDir, { recursive: true })

const rows = skills.map((s, i) => md(s, i))
for (const { filename, body } of rows) {
  writeFileSync(join(outDir, filename), body, 'utf8')
}

const indexRows = skills
  .map((s, i) => {
    const num = String(i + 1).padStart(2, '0')
    return `| \`/${s.cmd}\` | ${s.role} | [${num}-${s.cmd}.md →](/gstack/skills/${num}-${s.cmd}) |`
  })
  .join('\n')

const index = `# 技能命令索引

本目录与 [gstack 仓库 docs/skills.md](${REPO_SKILLS}) 中的技能表一一对应：**每条斜杠命令一个页面**，路径形如 \`/gstack/skills/01-office-hours\`。

| 命令 | 角色 | 文档 |
|------|------|------|
${indexRows}

## 安全与工具类

\`/careful\`、\`/freeze\`、\`/guard\`、\`/unfreeze\` 的详细说明在英文文档的 **Safety & Guardrails** 一节（各命令仍有独立页面便于检索）。

[← 返回 GStack 专栏](/gstack/)
`

writeFileSync(join(outDir, 'index.md'), index, 'utf8')
console.log(`Wrote ${rows.length + 1} files to ${outDir}`)
