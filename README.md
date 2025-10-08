# AI小孩 - 面对AI，我们都是学习者

> 一个专注于AI学习的温暖社区，提供前沿洞察、实用工具和深度思考

[![Astro](https://img.shields.io/badge/Astro-5.14.1-FF5D01?logo=astro)](https://astro.build/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 项目特色

- 🧭 **品牌理念**：面对AI，我们都是学习者
- 📚 **内容分类**：AI趋势、AI营销、AI工具、技术实践、深度洞察、学习资源
- 📬 **Newsletter订阅**：完整的邮件服务集成
- 🔍 **SEO优化**：超越Astro原生功能的完整SEO解决方案
- 📊 **数据分析**：Google Analytics 4 + 自定义事件追踪
- 🎨 **现代设计**：响应式布局，支持深色模式
- ⚡ **性能优化**：静态生成，快速加载

## 🚀 快速开始

### 环境要求

- Node.js 18.14.1+
- npm 或 yarn
- Git

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/ericforai/my-blog.git
cd my-blog

# 安装依赖
npm install
```

### 开发环境

```bash
# 启动开发服务器
npm run dev

# 访问网站
open http://localhost:4321
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
📂 my-blog/
├── 📁 src/                    # 源代码目录
│   ├── 📁 components/         # 可复用组件
│   │   ├── 📄 Header.astro    # 导航栏组件
│   │   ├── 📄 Footer.astro    # 页脚组件
│   │   ├── 📄 SEO.astro       # SEO元数据组件
│   │   ├── 📄 Newsletter.astro # Newsletter订阅组件
│   │   └── 📄 Analytics.astro # Google Analytics组件
│   ├── 📁 layouts/            # 页面布局
│   │   ├── 📄 BaseLayout.astro # 基础布局
│   │   ├── 📄 PageLayout.astro # 页面布局
│   │   └── 📄 PostLayout.astro # 文章布局
│   ├── 📁 pages/              # 页面路由
│   │   ├── 📄 index.astro     # 首页
│   │   ├── 📄 about.astro     # 关于页面
│   │   ├── 📄 newsletter.astro # Newsletter订阅页面
│   │   ├── 📄 rss.xml.ts      # RSS订阅源
│   │   ├── 📄 sitemap.xml.ts  # 网站地图
│   │   ├── 📁 blog/           # 博客文章
│   │   ├── 📁 category/       # 分类页面
│   │   ├── 📁 tag/            # 标签页面
│   │   └── 📁 api/            # API端点
│   │       └── 📄 subscribe.ts # Newsletter订阅API
│   ├── 📁 styles/             # 样式文件
│   │   └── 📄 base.css        # 基础样式
│   └── 📄 config.mjs          # 站点配置
├── 📁 public/                 # 静态资源
│   ├── 📄 logo.svg            # 网站Logo
│   ├── 📄 robots.txt          # 搜索引擎配置
│   └── 📄 opensearch.xml      # 浏览器搜索配置
├── 📄 astro.config.mjs        # Astro配置
├── 📄 tailwind.config.js      # Tailwind配置
├── 📄 package.json            # 项目依赖
├── 📄 .env.example            # 环境变量示例
└── 📄 README.md               # 项目文档
```

## ⚙️ 配置说明

### 站点配置

编辑 `src/config.mjs` 文件：

```javascript
export const SITE = {
  title: "AI小孩 - 面对AI，我们都是学习者",
  description: "AI小孩是专注于AI学习的温暖社区...",
  site: "https://www.aixiaohai.com",
  keywords: ["AI学习", "人工智能", "机器学习", ...],
  social: {
    twitter: "@aixiaohai",
    github: "ericforai",
    email: "hello@aixiaohai.com"
  }
};
```

### 环境变量配置

复制 `.env.example` 为 `.env` 并配置：

```bash
# Google Analytics
PUBLIC_GA_ID=G-4P5N3X3GBG

# Newsletter邮件服务 (选择一种)
RESEND_API_KEY=re_your_api_key_here
# MAILCHIMP_API_KEY=your_api_key_here
# CONVERTKIT_API_KEY=your_api_key_here

# 邮件配置
FROM_EMAIL=hello@aixiaohai.com
FROM_NAME=AI小孩
ENABLE_EMAIL_SERVICE=true
```

### 主题配置

编辑 `tailwind.config.js` 自定义主题：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',    // 主色调
        accent: '#f97316',      // 强调色
      }
    }
  }
}
```

## 📝 内容管理

### 添加博客文章

在 `src/pages/blog/` 目录下创建新的 `.astro` 文件：

```astro
---
// 文章元数据
const frontmatter = {
  title: "文章标题",
  description: "文章描述",
  pubDate: "2025-01-01",
  category: "AI 趋势",
  categorySlug: "ai-trends",
  tags: ["AI", "趋势分析"],
  slug: "article-slug",
  cover: "/assets/blog/cover.jpg"
};
---

<PostLayout frontmatter={frontmatter}>
  <!-- 文章内容 -->
</PostLayout>
```

### 文章分类

支持以下分类：
- **AI 趋势** (`ai-trends`)：AI行业趋势分析
- **AI 营销** (`ai-marketing`)：AI营销应用
- **AI 工具** (`ai-tools`)：AI工具推荐
- **技术实践** (`tech-tutorial`)：技术教程
- **深度洞察** (`insights`)：深度思考
- **学习资源** (`resources`)：学习资源

### 标签系统

支持多标签分类，常用标签：
- AI、AI营销、AI工具、未来趋势
- ChatGPT、Midjourney、Prompt Engineering
- 技术教程、开源、生产力

## 📬 Newsletter功能

### 功能特点

- ✅ **完整订阅流程**：前端表单 + 后端API
- ✅ **邮件服务集成**：支持Resend、Mailchimp、ConvertKit
- ✅ **欢迎邮件**：精美的HTML邮件模板
- ✅ **数据分析**：Google Analytics事件追踪
- ✅ **用户体验**：实时验证、加载状态、状态提示

### 配置邮件服务

#### 推荐：Resend

1. 访问 [resend.com](https://resend.com) 注册
2. 获取API Key
3. 配置环境变量：
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```

#### 其他服务商

- **Mailchimp**：营销自动化
- **ConvertKit**：创作者友好
- **SendGrid**：企业级

详细配置请参考：[NEWSLETTER_INTEGRATION_GUIDE.md](./NEWSLETTER_INTEGRATION_GUIDE.md)

## 🔍 SEO优化

### 超越Astro原生功能

我们的SEO实现包含：

- ✅ **完整元数据管理**：统一的SEO组件
- ✅ **结构化数据**：JSON-LD格式
- ✅ **社交媒体优化**：Open Graph + Twitter Card
- ✅ **搜索引擎配置**：robots.txt + sitemap.xml
- ✅ **浏览器搜索**：OpenSearch支持
- ✅ **网站验证**：Google/Bing/Yandex验证码

### SEO功能清单

| 功能 | 状态 | 说明 |
|------|------|------|
| Sitemap自动生成 | ✅ | Astro原生 + 自定义优化 |
| RSS订阅源 | ✅ | 完整RSS 2.0实现 |
| SEO元数据 | ✅ | 超越原生功能 |
| 结构化数据 | ✅ | JSON-LD格式 |
| Open Graph | ✅ | 社交媒体分享优化 |
| Twitter Card | ✅ | Twitter分享优化 |
| robots.txt | ✅ | 搜索引擎配置 |
| OpenSearch | ✅ | 浏览器搜索支持 |

详细分析请参考：[ASTRO_SEO_ANALYSIS.md](./ASTRO_SEO_ANALYSIS.md)

## 📊 数据分析

### Google Analytics 4

- **页面浏览**：自动追踪所有页面访问
- **事件追踪**：Newsletter订阅、外部链接点击
- **用户行为**：滚动深度、停留时间
- **转化分析**：订阅转化率分析

### 自定义事件

```javascript
// Newsletter订阅事件
gtag('event', 'newsletter_signup', {
  'event_category': 'engagement',
  'event_label': 'newsletter_page',
  'value': 1
});
```

## 🚀 部署指南

### EdgeOne Pages (推荐)

1. **准备环境变量**：
   ```bash
   PUBLIC_GA_ID=G-4P5N3X3GBG
   RESEND_API_KEY=re_your_api_key_here
   FROM_EMAIL=hello@aixiaohai.com
   FROM_NAME=AI小孩
   ```

2. **连接GitHub**：
   - 登录EdgeOne Pages控制台
   - 导入GitHub仓库
   - 配置构建命令：`npm run build`

3. **配置域名**：
   - 绑定自定义域名
   - 配置SSL证书
   - 设置CDN加速

### Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### Netlify部署

```bash
# 构建命令
npm run build

# 发布目录
dist
```

## 🛠️ 开发指南

### 代码规范

- **TypeScript**：使用TypeScript编写组件
- **Astro组件**：使用`.astro`文件格式
- **TailwindCSS**：使用utility-first CSS
- **组件化**：可复用组件放在`components/`目录

### 添加新功能

1. **创建组件**：在`src/components/`下创建
2. **添加页面**：在`src/pages/`下创建
3. **更新配置**：修改`src/config.mjs`
4. **测试功能**：本地开发环境测试
5. **提交代码**：Git提交并推送

### 调试技巧

```bash
# 查看构建输出
npm run build

# 检查SEO元数据
curl http://localhost:4321 | grep -i "meta\|title"

# 测试API端点
curl -X POST http://localhost:4321/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 📚 文档资源

- [Astro官方文档](https://docs.astro.build/)
- [TailwindCSS文档](https://tailwindcss.com/docs)
- [Newsletter集成指南](./NEWSLETTER_INTEGRATION_GUIDE.md)
- [SEO功能分析](./ASTRO_SEO_ANALYSIS.md)
- [内容策略文档](./CONTENT_STRATEGY.md)

## 🤝 贡献指南

### 如何贡献

1. Fork项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -m 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建Pull Request

### 问题反馈

- 使用GitHub Issues报告bug
- 提供详细的复现步骤
- 包含环境信息（Node版本、浏览器等）

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Astro](https://astro.build/) - 现代静态站点生成器
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [AstroWind](https://github.com/onwidget/astrowind) - 项目模板
- [Resend](https://resend.com/) - 邮件服务提供商

---

**AI小孩 - 面对AI，我们都是学习者** 🧭

如有问题，请联系：hello@aixiaohai.com

