# OpenAI API Key 配置说明

## 🔑 API Key 已配置

你的 OpenAI API Key 已经准备好：
```
your_openai_api_key_here
```

## 📝 配置步骤

### 1. 创建 .env 文件

在项目根目录创建 `.env` 文件，内容如下：

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Image Generation Settings
AI_IMAGE_MODEL=dall-e-3
AI_IMAGE_SIZE=1024x1024
AI_IMAGE_QUALITY=standard
AI_IMAGE_STYLE=natural

# Cache Settings
AI_IMAGE_CACHE_ENABLED=true
AI_IMAGE_CACHE_DIR=./public/generated-images
```

### 2. 确保 .env 文件被忽略

确保 `.env` 文件在 `.gitignore` 中，避免提交到版本控制：

```bash
# .env files
.env
.env.local
.env.production
```

## 🚀 使用方法

### 方法 1：使用 AI Banner 组件

```astro
---
import AIBlogBanner from '~/components/AIBlogBanner.astro';

const post = {
  title: "AI 重塑营销：从内容生产到精准投放的全链路革命",
  description: "深度解析 AI 如何改变营销的每个环节...",
  category: "AI Marketing",
  tags: ["AI", "Marketing", "Automation"],
  slug: "ai-marketing-revolution"
};
---

<AIBlogBanner 
  post={post} 
  config={{
    width: 600,
    height: 338,
    useAIImage: true  // 启用 AI 图片生成
  }}
/>
```

### 方法 2：直接调用 API

```typescript
import { createAIImageGenerator } from '~/utils/aiImageGenerator';

const generator = createAIImageGenerator(process.env.OPENAI_API_KEY!);
const image = await generator.generateBannerImage(post);
```

## 💰 成本预估

- **单张图片**: ~$0.01-0.02
- **100 篇文章**: ~$1-2
- **1000 篇文章**: ~$10-20

## 🔧 测试建议

1. **先测试少量文章**：选择 2-3 篇重要文章测试
2. **监控 API 使用**：查看 OpenAI 控制台的使用情况
3. **检查生成质量**：确保图片符合预期
4. **验证缓存机制**：确认重复访问不会重复生成

## ⚠️ 注意事项

1. **API Key 安全**：不要将 API Key 提交到版本控制
2. **成本控制**：设置使用限制和监控
3. **降级方案**：API 失败时自动使用 SVG banner
4. **内容政策**：确保生成内容符合 OpenAI 使用政策

## 🎯 下一步

1. 创建 `.env` 文件
2. 重启开发服务器
3. 测试 AI 图片生成功能
4. 根据需要调整配置参数
