# OpenClaw + GStack 中文文档 | 源码剖析 · 安装教程 · AI 智能体与工作流

> **OpenClaw**（原名 ClawdBot）是开源多通道 AI 智能体框架，支持 WhatsApp、Telegram、Discord、飞书等平台，可接入 Claude、GPT、DeepSeek、Ollama 等模型。本仓库是其**完整中文文档站**，276+ 篇深度教程，覆盖安装部署、源码剖析、Gateway 配置与 AI 核心框架解析。
>
> **GStack**（[garrytan/gstack](https://github.com/garrytan/gstack)）是面向 Claude Code 等环境的 **AI 工程工作流技能库**（`/review`、`/qa`、`/ship`、`/browse` 等）。本站增设 **GStack 专栏**（`/gstack/`），提供中文导读与安装说明，与 OpenClaw 文档**同库同站**，便于一并查阅。

[![在线文档](https://img.shields.io/badge/在线阅读-openclaw--docs.dx3n.cn-4fc08d?logo=readthedocs&logoColor=white)](https://openclaw-docs.dx3n.cn)
[![VitePress](https://img.shields.io/badge/Built%20with-VitePress-646cff?logo=vite&logoColor=white)](https://vitepress.dev)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Azure](https://img.shields.io/badge/Deployed%20on-Azure%20Static%20Web%20Apps-0078d4?logo=microsoftazure)](https://openclaw-docs.dx3n.cn)

**[📖 立即在线阅读 → openclaw-docs.dx3n.cn](https://openclaw-docs.dx3n.cn)**

---

## 📚 文档覆盖范围

本文档站包含 **276+ 篇** OpenClaw 原创中文教程，分为 4 条学习主线；并含 **GStack 专栏**（中文导读，持续扩充）。

| 主线 / 专栏 | 内容覆盖 | 篇数 | 链接 |
|---|---|---|---|
| **Track 0** 安装教程 | 快速安装、向导配置、AI 服务商接入（Claude/GPT/DeepSeek/Ollama）、通道接入（Telegram/WhatsApp/Discord/飞书）、Gateway 运维、常见问题排查 | 147 篇 | [→ 教程中心](https://openclaw-docs.dx3n.cn/tutorials/) |
| **Track A** 完整工程主线 | CLI 启动框架、Gateway 控制平面、通道适配器、路由与会话键、Agent 执行链路、流式订阅、子智能体编排、函数级源码剖析（59 篇） | 59 篇 | [→ 工程主线](https://openclaw-docs.dx3n.cn/beginner-openclaw-guide/) |
| **Track B** AI 核心框架 | 上下文工程、Agent 状态机、工具策略与审批、模型回退、记忆系统、Hook 插件注入机制 | 22 篇 | [→ AI 框架](https://openclaw-docs.dx3n.cn/beginner-openclaw-framework-focus/) |
| **Track C** 通道适配器 | 接口合同、注册链路、账号生命周期、入站路由、出站发送解耦 | 含于 Track A | [→ 适配器索引](https://openclaw-docs.dx3n.cn/beginner-openclaw-guide/59-%E9%80%9A%E9%81%93%E9%80%82%E9%85%8D%E5%99%A8%E5%AE%9E%E7%8E%B0%E7%B4%A2%E5%BC%95) |
| **GStack 专栏** | AI 工程斜杠技能：简介、安装、技能一览与仓库命令；与 OpenClaw 互补 | 导读 | [→ GStack 专栏](https://openclaw-docs.dx3n.cn/gstack/) |

---

## 🤖 OpenClaw 是什么？

**OpenClaw**（前身 **ClawdBot**）是一款开源的多通道 AI 智能体框架，让你的 AI 助手运行在任意即时通讯平台上。

### 支持的聊天平台

WhatsApp · Telegram · Discord · Slack · Signal · iMessage · 飞书（Feishu） · Mattermost · Google Chat · Microsoft Teams · Matrix · Zalo · IRC · Nostr · Twitch

### 支持的 AI 模型

Anthropic Claude · OpenAI GPT · DeepSeek · 通义千问（Qwen） · Kimi（月之暗面） · 智谱 GLM · MiniMax · Ollama（本地大模型） · OpenRouter · LiteLLM · Cloudflare AI Gateway · Vercel AI Gateway · NVIDIA NIM · Together AI · HuggingFace · vLLM

---

## 🚀 快速开始（本地运行文档站）

```bash
git clone https://github.com/yeuxuan/openclaw-docs.git
cd openclaw-docs
npm install
npm run docs:dev
```

打开终端输出的本地地址即可预览完整文档站。

```bash
npm run docs:build    # 构建静态产物到 docs/.vitepress/dist/
npm run docs:preview  # 本地预览构建结果
```

---

## 📁 仓库结构

```
openclaw-docs/
├── docs/
│   ├── index.md                            # 首页（OpenClaw + GStack）
│   ├── gstack/                             # GStack 专栏（源码解读 / 开发文档，按仓库模块分子目录）
│   │   ├── index.md                        #   专栏首页与模块地图
│   │   ├── repo/                           #   仓库根、安装、技能表、文档贡献约定
│   │   ├── skills/                         #   每条斜杠命令一页（npm run gen:gstack-skills 可重生成）
│   │   ├── browse/ design/ scripts/ …    #   与 gstack 仓库顶层目录对齐
│   ├── tutorials/                          # Track 0：安装教程（147 篇）
│   │   ├── getting-started/                #   快速入门与向导安装
│   │   ├── installation/                   #   Docker / Node / 云服务器部署
│   │   ├── gateway/                        #   Gateway 配置与运维
│   │   ├── channels/                       #   通道接入（Telegram/WhatsApp/Discord 等）
│   │   ├── providers/                      #   AI 模型 Provider 配置
│   │   ├── concepts/                       #   核心概念（上下文/记忆/状态机等）
│   │   ├── tools/                          #   工具系统（浏览器/执行/技能/子智能体）
│   │   ├── automation/                     #   自动化（Webhook/Cron/Poll）
│   │   └── help/                           #   故障排查与常见问题
│   ├── beginner-openclaw-guide/            # Track A：完整工程主线（59 篇）
│   └── beginner-openclaw-framework-focus/  # Track B：AI 核心框架（22 篇）
├── docs/.vitepress/
│   ├── config.mts                          # 站点配置（SEO / 导航 / 侧边栏）
│   └── theme/                             # 自定义主题与样式
└── scripts/
    ├── convert-mdx.mjs                     # MDX → VitePress Markdown 批量转换
    └── ping-indexnow.mjs                   # 构建后自动推送 URL 到 Bing IndexNow
```

---

## ✨ 文档特点

- **函数级精度**：关键模块精确到具体函数的源码入口与调用链路
- **小白友好**：安装教程全程图文，零基础 10 分钟跑起来
- **可直接复刻**：每个核心能力都给出落地步骤，可直接用于自己的项目
- **持续更新**：跟随 OpenClaw 版本迭代，覆盖最新 API 与配置方式
- **SEO 完备**：276 页独立 description、sitemap、IndexNow 自动推送

---

## 🔗 相关链接

- **OpenClaw 官方**：[github.com/openclaw](https://github.com/openclaw)
- **官方英文文档**：[docs.openclaw.ai](https://docs.openclaw.ai)
- **本站中文文档**：[openclaw-docs.dx3n.cn](https://openclaw-docs.dx3n.cn)
- **部署平台**：Azure Static Web Apps

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yeuxuan/openclaw-docs&type=Date)](https://star-history.com/#yeuxuan/openclaw-docs&Date)
