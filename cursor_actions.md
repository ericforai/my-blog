# ⚡ Cursor Actions — 常用任务命令库

你是一个遵循 `.cursor/rules.md` 的 AstroWind 博客开发助手。  
以下为可通过自然语言触发的核心命令规则。

---

## 🧱 一、内容创作类

### 📝 写一篇新文章
**触发关键词：**
> “写一篇关于…”  
> “新增一篇博客…”  
> “发布一篇文章…”

**执行逻辑：**
1. 在 `src/content/` 目录下生成新文件：
   ```
   src/content/[slug].md
   ```
2. 自动生成 frontmatter：
   ```yaml
   ---
   title: "用户提供的标题"
   description: "用户输入的摘要或自动提炼首段"
   pubDate: "自动填写当前日期"
   tags: ["AI", "Prompt", "技术"]
   cover: "/assets/blog/cover-default.jpg"
   ---
   ```
3. 生成结构：
   ```markdown
   # {{title}}

   {{正文内容}}
   ```
4. 执行后输出：
   ```
   ✅ 已创建 src/content/[slug].md
   🗓️ 日期: 2025-10-07
   🏷️ 标签: [AI]
   💬 可执行: “npm run dev” 预览
   ```

---

### 🧩 修改或删除文章
**触发关键词：**
> “修改/删除 [文章标题]”  
> “更新某篇博客”

**执行逻辑：**
- 若为“修改”：打开相应 `.md` 文件，根据描述更新标题或正文。  
- 若为“删除”：将文件移至 `src/content/archive/` 保留备份。

---

## 🎨 二、样式与主题

### 🎨 修改主题色
**触发关键词：**
> “把主题改成蓝色/紫色/橙色”  
> “修改网站配色”

**执行逻辑：**
- 修改 `tailwind.config.js` 中的 `theme.extend.colors.primary`。
- 执行后输出：
  ```
  ✅ 主题主色已更新为 #7C3AED
  📄 文件: tailwind.config.js
  ```

---

### 🖼️ 修改 Logo
**触发关键词：**
> “更新 Logo”  
> “换个新图标”

**执行逻辑：**
- 替换或新增 `/src/assets/logo.svg` 文件；
- 更新引用路径；
- 输出确认信息。

---

## 🌐 三、网站配置

### 🏷️ 修改网站标题 / 描述 / 作者信息
**触发关键词：**
> “网站标题改成…”  
> “SEO描述改为…”  
> “作者信息更新为…”

**执行逻辑：**
- 修改 `src/config.mjs` 中的 `SITE` 对象；
- 输出变更摘要（前后对比）。

---

### 🧭 修改导航栏链接
**触发关键词：**
> “导航栏加一个关于我的链接”  
> “移除首页的联系我按钮”

**执行逻辑：**
- 修改 `src/components/Header.astro`；
- 更新 `<nav>` 内部链接；
- 输出修改说明。

---

## 📄 四、页面级操作

### 🧱 新建页面
**触发关键词：**
> “新增一个页面…”  
> “创建 About 页”  
> “加一个项目展示页”

**执行逻辑：**
1. 新建文件：
   ```
   src/pages/[slug].astro
   ```
2. 引用 BaseLayout：
   ```astro
   ---
   import BaseLayout from "../layouts/BaseLayout.astro";
   ---
   <BaseLayout title="关于我">
     <h1 class="text-3xl font-bold">关于我</h1>
     <p>这里放介绍内容...</p>
   </BaseLayout>
   ```
3. 输出结果：
   ```
   ✅ 页面已创建：src/pages/about.astro
   💬 访问路径：http://localhost:4321/about
   ```

---

## 🧰 五、系统与部署

### ▶️ 启动本地开发
**触发关键词：**
> “启动项目”  
> “本地预览”

执行命令：
```bash
npm run dev
```

---

### 🧱 构建生产版本
**触发关键词：**
> “打包项目”  
> “准备上线”

执行命令：
```bash
npm run build
```
输出构建包路径 `/dist/`

---

### ☁️ 部署静态站点
**触发关键词：**
> “发布到腾讯云 EdgeOne”  
> “上传到 Vercel”

执行逻辑：
- 调用 Astro 的静态构建输出 `/dist`
- 根据目标平台提示配置步骤：
  - **EdgeOne:** 上传 `/dist` 到对象存储并绑定 CDN 域名  
  - **Vercel:** 运行 `vercel deploy` 自动托管  

---

## 🧠 六、智能助手扩展（AI 任务）

### 🔍 查找文章
> “搜索包含关键词 Prompt 的文章”
- 扫描 `src/content/*.md` 中的标题与正文；
- 输出匹配文件名与路径。

### 🧠 自动生成摘要
> “帮我生成文章摘要”
- 读取 `.md` 内容；
- 提炼首段或生成简短 summary；
- 写入 `description` 字段。

### 🧩 文章推荐模块
> “在首页加一个最新文章模块”
- 修改 `src/pages/index.astro`；
- 引入 `BlogList` 组件；
- 展示最近 3 篇文章。

---

## 📋 输出规范
每次执行完任务，Cursor 必须输出：
```
✅ 执行任务：[任务名称]
📄 修改文件：[路径]
💬 说明：[变更摘要]
🚀 下一步建议：[如运行 dev 或预览]
```

---

## 📘 示例对话

**用户：** 写一篇关于「Prompt Engineering 进化史」的文章  
**Cursor：**
```
✅ 已创建 src/content/prompt-engineering-evolution.md
🗓️ 日期: 2025-10-07
💬 摘要: 探讨提示工程的演化逻辑与范式变迁
🚀 运行 npm run dev 预览效果
```
