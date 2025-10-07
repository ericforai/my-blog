# 🚀 部署指南 - Eric's AI Blog

## 📋 项目概览

- **仓库地址**: [https://github.com/ericforai/my-blog](https://github.com/ericforai/my-blog)
- **技术栈**: Astro + TailwindCSS + Markdown
- **部署状态**: ✅ 已推送到 GitHub

---

## 🌐 部署选项

### 选项 1: Vercel（推荐）

**优势**: 零配置、自动部署、全球 CDN、免费额度充足

**部署步骤**:

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Import Project"
4. 选择 `ericforai/my-blog` 仓库
5. Vercel 自动检测 Astro 项目
6. 点击 "Deploy" 完成部署

**配置说明**:
- **Build Command**: `npm run build` (自动检测)
- **Output Directory**: `dist` (自动检测)
- **Install Command**: `npm install` (自动检测)

**自定义域名**:
- 在 Vercel Dashboard 中添加自定义域名
- 支持 HTTPS 自动证书

---

### 选项 2: Tencent EdgeOne

**优势**: 国内访问速度快、CDN 加速、成本低

**部署步骤**:

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com)
2. 开通 EdgeOne 服务
3. 创建站点并绑定域名
4. 配置构建流程:
   ```bash
   npm install
   npm run build
   ```
5. 上传 `dist` 目录到对象存储
6. 配置 CDN 加速

---

### 选项 3: GitHub Pages

**优势**: 完全免费、与 GitHub 集成

**部署步骤**:

1. 在仓库设置中启用 GitHub Pages
2. 选择 Source 为 "GitHub Actions"
3. 创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔧 本地开发

```bash
# 克隆仓库
git clone https://github.com/ericforai/my-blog.git
cd my-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 📝 内容更新流程

### 添加新文章

1. 在 `src/content/` 创建 `.md` 文件
2. 在 `src/pages/blog/` 创建对应的 `.astro` 文件
3. 更新 `src/pages/blog/index.astro` 中的文章列表
4. 提交并推送:

```bash
git add .
git commit -m "Add new article: [文章标题]"
git push origin main
```

### 修改配置

- **站点信息**: 编辑 `src/config.mjs`
- **主题颜色**: 编辑 `tailwind.config.js`
- **导航菜单**: 编辑 `src/components/Header.astro`

---

## 🎯 SEO 优化

### 已配置的 SEO 功能

- ✅ 完整的 meta 标签
- ✅ Open Graph 标签
- ✅ Twitter Card
- ✅ 结构化数据
- ✅ 自动 sitemap 生成

### 自定义 SEO

编辑 `src/config.mjs` 中的 `METADATA` 配置:

```js
export const METADATA = {
  title: {
    default: SITE.title,
    template: '%s — ' + SITE.title,
  },
  description: SITE.description,
  // ... 其他配置
};
```

---

## 📊 性能优化

### 已实现的优化

- ✅ 静态站点生成 (SSG)
- ✅ 图片优化
- ✅ CSS 压缩
- ✅ JavaScript 代码分割
- ✅ 预加载关键资源

### 进一步优化建议

1. **图片优化**: 使用 WebP 格式
2. **字体优化**: 使用 `font-display: swap`
3. **缓存策略**: 配置 CDN 缓存规则

---

## 🔍 监控与分析

### 推荐工具

- **Google Analytics**: 网站访问统计
- **Google Search Console**: 搜索表现监控
- **Vercel Analytics**: 性能监控（如果使用 Vercel）

### 配置步骤

1. 在 `src/layouts/BaseLayout.astro` 添加分析代码
2. 配置 Google Search Console
3. 提交 sitemap

---

## 🆘 故障排除

### 常见问题

**构建失败**:
```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm install
npm run build
```

**样式不生效**:
- 检查 Tailwind 配置
- 确认 CSS 文件正确导入

**部署后 404**:
- 检查路由配置
- 确认构建输出目录

---

## 📞 支持

- **文档**: [Astro 官方文档](https://docs.astro.build)
- **社区**: [Astro Discord](https://astro.build/chat)
- **问题反馈**: [GitHub Issues](https://github.com/ericforai/my-blog/issues)

---

**🎉 恭喜！你的 AI 博客已经准备就绪，可以开始部署了！**
