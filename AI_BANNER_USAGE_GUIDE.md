# AI 图片生成使用示例

## 🎯 快速开始

### 1. 配置环境变量

创建 `.env` 文件：

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. 在页面中使用 AI Banner

#### 英文首页示例

```astro
---
// src/pages/index.astro
import BlogBanner from '~/components/BlogBanner.astro';

const posts = [
  {
    title: "AI Reshapes Marketing: Full-Chain Revolution from Content Production to Delivery",
    description: "In-depth analysis of how AI changes every aspect of marketing...",
    slug: "ai-marketing-revolution",
    pubDate: "2025-01-08",
    category: "AI Marketing",
    categorySlug: "ai-marketing",
    tags: ["AI Marketing", "Digital Marketing", "Marketing Automation"]
  },
  // ... 更多文章
];
---

{posts.map(post => (
  <article class="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg dark:border-gray-800">
    <div class="aspect-video">
      <BlogBanner 
        post={post} 
        config={{
          width: 400,
          height: 200,
          style: 'modern',
          colorScheme: 'gradient',
          useAIImage: true  // 🔥 启用 AI 图片生成
        }}
        className="h-full"
      />
    </div>
    <div class="flex flex-1 flex-col p-4 sm:p-6">
      <span class="text-xs text-primary mb-2">{post.category}</span>
      <h3 class="mb-2 sm:mb-3 text-lg sm:text-xl font-bold group-hover:text-primary line-clamp-2">
        <a href={`/blog/${post.slug}`}>{post.title}</a>
      </h3>
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
        {post.description}
      </p>
    </div>
  </article>
))}
```

#### 中文博客页面示例

```astro
---
// src/pages/zh/blog/index.astro
import BlogBanner from '~/components/BlogBanner.astro';

const posts = [
  {
    title: "AI 重塑营销：从内容生产到精准投放的全链路革命",
    description: "深度解析 AI 如何改变营销的每个环节...",
    slug: "ai-marketing-revolution",
    pubDate: "2025-01-08",
    category: "AI 营销",
    categorySlug: "ai-marketing",
    tags: ["AI营销", "数字营销", "营销自动化"]
  },
  // ... 更多文章
];
---

{posts.map(post => (
  <article class="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg dark:border-gray-800">
    <div class="aspect-video">
      <BlogBanner 
        post={post} 
        config={{
          width: 400,
          height: 200,
          style: 'modern',
          colorScheme: 'gradient',
          useAIImage: true  // 🔥 启用 AI 图片生成
        }}
        className="h-full"
      />
    </div>
    <div class="flex flex-1 flex-col p-4 sm:p-6">
      <span class="text-xs text-primary mb-2">{post.category}</span>
      <h3 class="mb-2 sm:mb-3 text-lg sm:text-xl font-bold group-hover:text-primary line-clamp-2">
        <a href={`/zh/blog/${post.slug}`}>{post.title}</a>
      </h3>
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
        {post.description}
      </p>
    </div>
  </article>
))}
```

### 3. 配置选项说明

```typescript
interface BannerConfig {
  width?: number;           // 图片宽度，默认 1200
  height?: number;          // 图片高度，默认 630
  style?: 'modern' | 'minimal';  // 样式，默认 'modern'
  colorScheme?: 'gradient' | 'blue' | 'green' | 'orange';  // 配色方案，默认 'gradient'
  useAIImage?: boolean;     // 🔥 是否使用 AI 图片生成，默认 false
}
```

### 4. 智能降级机制

- ✅ **有 API Key + useAIImage: true** → 生成 AI 图片
- ✅ **无 API Key + useAIImage: true** → 自动使用 SVG banner
- ✅ **API 失败** → 自动回退到 SVG banner
- ✅ **useAIImage: false** → 始终使用 SVG banner

## 💰 成本控制

### 建议的使用策略

1. **重要文章使用 AI 图片**：
   ```astro
   <BlogBanner post={importantPost} config={{ useAIImage: true }} />
   ```

2. **一般文章使用 SVG**：
   ```astro
   <BlogBanner post={normalPost} config={{ useAIImage: false }} />
   ```

3. **批量生成后缓存**：
   - 首次访问生成 AI 图片
   - 后续访问使用缓存
   - 避免重复 API 调用

### 成本预估

| 文章数量 | AI 图片成本 | SVG 成本 | 总成本 |
|----------|-------------|----------|--------|
| 10 篇    | $0.10-0.20  | 免费     | $0.10-0.20 |
| 50 篇    | $0.50-1.00  | 免费     | $0.50-1.00 |
| 100 篇   | $1.00-2.00  | 免费     | $1.00-2.00 |

## 🔧 高级配置

### 自定义提示词

修改 `src/config/aiImageConfig.ts`：

```typescript
export const promptTemplates = {
  'AI Marketing': `Create a modern, professional blog banner for an AI marketing article.
    Design: Clean minimalist style with blue-to-orange gradient background.
    Elements: Marketing charts, data visualization, growth indicators.
    Style: Professional, tech-focused, high contrast.
    Format: 16:9 aspect ratio, no text overlay.`,
  
  // 添加自定义分类
  'Custom Category': `Your custom prompt here...`,
};
```

### 调整图片参数

```typescript
// 修改 src/config/aiImageConfig.ts
export const aiImageConfig = {
  openai: {
    model: 'dall-e-3',      // 或 'dall-e-2'
    size: '1024x1024',      // 或 '1792x1024', '1024x1792'
    quality: 'hd',          // 或 'standard'
    style: 'vivid',        // 或 'natural'
  },
};
```

## 🚀 部署注意事项

### 环境变量配置

**开发环境**：
```bash
# .env
OPENAI_API_KEY=your_api_key_here
```

**生产环境**：
- EdgeOne: 在控制台设置环境变量
- Vercel: 在项目设置中添加环境变量
- 其他平台: 根据平台文档配置

### 安全考虑

1. **API Key 保护**：
   - 不要提交到版本控制
   - 使用环境变量
   - 定期轮换密钥

2. **内容审核**：
   - 确保生成内容符合政策
   - 监控 API 使用情况
   - 设置使用限制

## 🎉 总结

现在你可以：

1. ✅ **配置 API Key**：创建 `.env` 文件
2. ✅ **启用 AI 图片**：设置 `useAIImage: true`
3. ✅ **智能降级**：API 失败时自动使用 SVG
4. ✅ **成本控制**：按需使用 AI 图片生成
5. ✅ **缓存优化**：避免重复生成

开始享受高质量的 AI 生成 banner 图片吧！🚀
