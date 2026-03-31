# 文档目录与贡献约定

本文说明 **`blog/docs/gstack/`** 下如何组织 **GStack 源码解读与开发文档**，保证多人协作时路径清晰、侧边栏可维护。

---

## 1. 站点根路径

- 所有 GStack 专栏页面的 URL 均以 **`/gstack/`** 为前缀。
- VitePress 源文件根：`blog/docs/gstack/`。

---

## 2. 多模块 = 一级子目录

每个子目录对应仓库里的 **一个顶层模块**（或一类横切关注点），例如：

| 子目录 | 对应仓库 |
|--------|----------|
| `gstack/repo/` | 根目录、`CLAUDE.md`、安装与总览 |
| `gstack/skills/` | （文档）每条 `/command` 独立页面，见 `scripts/gen-gstack-skill-pages.mjs` |
| `gstack/browse/` | `browse/` |
| `gstack/scripts/` | `scripts/` |
| `gstack/test/` | `test/` |

**新增模块时：**

1. 在 `blog/docs/gstack/<name>/` 新建目录（`<name>` 建议与仓库文件夹名一致，英文小写）。
2. 添加 **`index.md`**：模块职责、源码树摘要、链到子文。
3. 深度文章命名为 **`01-xxx.md`**、`02-xxx.md` …（数字前缀便于排序与侧边栏顺序）。
4. 打开 **`blog/docs/.vitepress/config.mts`**，在 `gstackSidebar` 中增加一组 `SidebarGroup`：`模块概览` 链接到 `/gstack/<name>/`，`items` 为 `...listMdItems('gstack/<name>')`（与现有 browse、design 等块同构）。

---

## 3. 单模块内不要做什么

- 不要把 **其它模块** 的长文塞进本目录（避免读者迷路）。
- **`index.md`** 不参与 `listMdItems` 自动列表，应用作 **模块首页**，手动列出重要子链接。

---

## 4. 技能目录（`ship/`、`qa/` …）怎么写

仓库中有大量 **平级技能目录**。建议：

- **横切机制**（模板、生成器、解析器）→ 写在 **`skill-pipeline/`** 或 **`scripts/`**。
- **单个技能的深度走读** → 新建 **`gstack/skill-<slug>/`**（例如 `skill-ship`），或在该技能相关模块下增加 `02-ship-skill.md`（若与某 CLI 强相关）。

避免在 `gstack/` 根目录堆积几十篇文件；**按模块分桶**优先。

---

## 5. 与本仓库 gstack 源码的同步

- 文档中的 **文件路径、命令** 应以仓库当前 **CLAUDE.md / README** 为准；若源码搬迁，先改实现再改专栏链接。
- 大规模结构变更时，同步更新 [专栏首页模块地图](/gstack/) 表格。

返回 [仓库根目录索引](/gstack/repo/) · [专栏首页](/gstack/)。
