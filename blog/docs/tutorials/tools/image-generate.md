---
title: "AI 图像生成工具"
sidebarTitle: "图像生成工具"
description: "OpenClaw 内置图像生成工具 image_generate：直接在聊天窗口里让 AI 画图！支持 Google Gemini 原生图像生成，以及 fal.ai 作为备用方案，一句话即可生成精美图片。"
---

# AI 图像生成工具（image_generate）

想象一下：你在和 AI 聊天，突然说一句"帮我画一张赛博朋克风格的猫咪"，然后 AI 真的就把图片画出来发给你了。**这就是 `image_generate` 工具能做到的事情。**

OpenClaw 内置了图像生成能力，无需额外安装插件，配置好 API Key 即可直接在聊天中生成图片。

::: tip 和图像分析工具的区别
OpenClaw 有两个不同的图像相关工具：
- **`image_generate`**（本文）：让 AI **创作**图片，从文字描述生成全新图像
- **`image`**：让 AI **理解**图片，分析你发过去的图片内容

两者功能完全不同，请勿混淆。
:::

---

## 快速上手

### 第一步：获取 Google Gemini API Key

`image_generate` 默认使用 Google 的 `gemini-3-pro-image-preview` 模型，需要 Gemini API Key。

1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 登录并创建一个 API Key
3. 将 API Key 设置为环境变量：

```bash
export GEMINI_API_KEY="your-api-key-here"
```

::: info 没有 Gemini API Key？
如果你暂时无法访问 Google Gemini，也可以使用 **fal.ai** 作为备用图像生成服务。详见本页末尾的[备用方案](#备用方案-fal-ai)。
:::

### 第二步：配置图像生成模型

在你的 OpenClaw 配置文件中添加以下内容：

```json5
{
  agents: {
    defaults: {
      imageGenerationModel: "google/gemini-3-pro-image-preview"
    }
  }
}
```

### 第三步：开始画图！

配置完成后，直接在聊天窗口里说：

```text
帮我画一张夕阳下的富士山，水彩画风格
```

Agent 会自动调用 `image_generate` 工具，生成图片并返回给你。就这么简单！

---

## 使用示例

### 基础生图

直接描述你想要的画面，Agent 就能理解并生成：

```text
画一只穿着宇航服的柴犬，站在月球上，背景是星空
```

```text
生成一张极简风格的咖啡馆插画，暖色调，有一个人在看书
```

### 指定图片数量

你可以一次生成多张图片（最多 4 张），方便挑选：

```text
帮我画一个 Logo 设计方案，要 3 张不同风格的，我来挑选
```

`count` 参数支持 1 到 4，一次生成多张让你有更多选择。

### 指定分辨率

有时候你需要高清图片，可以明确告诉 Agent：

```text
生成一张 4K 高清的森林晨雾风景图，写实风格
```

分辨率支持 `1K`、`2K`、`4K`，默认生成标准清晰度。

### 参考图片进行二次创作

你可以上传一张参考图，让 AI 基于它进行再创作或风格迁移：

```text
（发送参考图片）
请参考这张图的构图风格，重新画一张赛博朋克城市夜景
```

---

## 参数说明

`image_generate` 工具支持以下参数：

| 参数 | 说明 | 可选值 |
|------|------|--------|
| `action` | 操作类型 | `generate`（生成）、`list`（列出已生成） |
| `prompt` | 图像描述，越详细越好 | 任意文字 |
| `model` | 使用的图像生成模型 | 默认 `google/gemini-3-pro-image-preview` |
| `image` / `images` | 参考图（编辑模式） | 图片文件或 URL |
| `size` | 图片尺寸 | 取决于所用模型 |
| `resolution` | 分辨率 | `1K`、`2K`、`4K` |
| `count` | 一次生成几张 | `1`～`4` |

::: tip 让描述更精准
图像生成的质量很大程度取决于你的描述。试着加入以下要素：
- **风格**：水彩画、油画、像素风、摄影写实、极简线条……
- **色调**：暖色调、冷色调、黑白、复古滤镜……
- **构图**：特写、全景、俯视角、黄金分割……
- **细节**：光线、材质、时间（清晨/黄昏）、季节……
:::

---

## 完整配置参考

```json5
{
  agents: {
    defaults: {
      // 图像生成模型（image_generate 工具使用）
      imageGenerationModel: "google/gemini-3-pro-image-preview",

      // 图像理解模型（image 分析工具使用，与生成无关）
      imageModel: "google/gemini-2.0-flash"
    }
  }
}
```

---

## 备用方案：fal.ai

如果你无法使用 Google Gemini，OpenClaw 支持通过 **fal.ai** 进行图像生成。

1. 访问 [fal.ai](https://fal.ai/) 注册账号
2. 获取 API Key
3. 设置环境变量：

```bash
export FAL_KEY="your-fal-api-key-here"
```

4. 在配置中指定 fal.ai 上的模型，例如：

```json5
{
  agents: {
    defaults: {
      imageGenerationModel: "fal-ai/flux/schnell"
    }
  }
}
```

::: warning 注意模型名称格式
使用 fal.ai 时，模型名称需要使用 fal.ai 平台上的模型 ID，具体可用模型请参考 [fal.ai 模型列表](https://fal.ai/models)。
:::

---

## 常见问题

::: details 为什么 Agent 没有生成图片，只是描述了一下？
可能是以下原因：
1. `imageGenerationModel` 未配置，工具不知道用哪个模型
2. API Key 未正确设置或无效
3. Agent 的工具权限中 `image_generate` 被禁用了

检查配置文件和环境变量是否正确，再试一次。
:::

::: details 生成图片消耗的是 API 额度吗？
是的。图像生成会消耗你的 Gemini API 或 fal.ai 账户额度，具体费用请参考各平台的定价页面。建议先用免费额度体验，确认效果后再考虑付费计划。
:::

::: details 可以让 AI 对已有图片进行修改吗？
可以！把参考图片发给 Agent，同时描述你想要的修改，`image_generate` 的编辑模式（`image`/`images` 参数）会基于参考图生成新版本。
:::

---

_下一步：[网络工具](/tutorials/tools/web) | [工具系统总览](/tutorials/tools/)_
