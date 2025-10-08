// AI Image Generation Configuration
export const aiImageConfig = {
  // OpenAI API Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'dall-e-3' as const,
    size: '1024x1024' as const,
    quality: 'standard' as const,
    style: 'natural' as const,
  },
  
  // Cache Configuration
  cache: {
    enabled: process.env.AI_IMAGE_CACHE_ENABLED === 'true',
    directory: process.env.AI_IMAGE_CACHE_DIR || './public/generated-images',
    ttl: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },
  
  // Fallback Configuration
  fallback: {
    useSVG: true,
    svgConfig: {
      width: 600,
      height: 338,
      style: 'modern' as const,
      colorScheme: 'gradient' as const,
    }
  },
  
  // Rate Limiting
  rateLimit: {
    maxRequestsPerMinute: 20,
    maxRequestsPerHour: 100,
  }
};

// Prompt Templates for Different Categories
export const promptTemplates = {
  'AI Marketing': `Create a modern, professional blog banner for an AI marketing article. 
    Design: Clean minimalist style with blue-to-orange gradient background.
    Elements: Marketing charts, data visualization, growth indicators.
    Style: Professional, tech-focused, high contrast.
    Format: 16:9 aspect ratio, no text overlay.`,

  'AI Tools': `Create a modern, professional blog banner for an AI tools article.
    Design: Clean minimalist style with blue-to-orange gradient background.
    Elements: Software tools, productivity icons, tech utilities.
    Style: Professional, tech-focused, high contrast.
    Format: 16:9 aspect ratio, no text overlay.`,

  'AI Trends': `Create a modern, professional blog banner for an AI trends article.
    Design: Clean minimalist style with blue-to-orange gradient background.
    Elements: Future technology, innovation symbols, trend indicators.
    Style: Professional, tech-focused, high contrast.
    Format: 16:9 aspect ratio, no text overlay.`,

  'Tech Tutorial': `Create a modern, professional blog banner for a tech tutorial article.
    Design: Clean minimalist style with blue-to-orange gradient background.
    Elements: Learning symbols, code elements, educational icons.
    Style: Professional, tech-focused, high contrast.
    Format: 16:9 aspect ratio, no text overlay.`,

  'AI 营销': `为 AI 营销文章创建现代专业的博客横幅。
    设计：简洁极简风格，蓝色到橙色渐变背景。
    元素：营销图表、数据可视化、增长指标。
    风格：专业、科技感、高对比度。
    格式：16:9 宽高比，无文字叠加。`,

  'AI 工具': `为 AI 工具文章创建现代专业的博客横幅。
    设计：简洁极简风格，蓝色到橙色渐变背景。
    元素：软件工具、生产力图标、技术实用程序。
    风格：专业、科技感、高对比度。
    格式：16:9 宽高比，无文字叠加。`,

  'AI 趋势': `为 AI 趋势文章创建现代专业的博客横幅。
    设计：简洁极简风格，蓝色到橙色渐变背景。
    元素：未来技术、创新符号、趋势指标。
    风格：专业、科技感、高对比度。
    格式：16:9 宽高比，无文字叠加。`,

  '技术实践': `为技术教程文章创建现代专业的博客横幅。
    设计：简洁极简风格，蓝色到橙色渐变背景。
    元素：学习符号、代码元素、教育图标。
    风格：专业、科技感、高对比度。
    格式：16:9 宽高比，无文字叠加。`,
};

// Default prompt template
export const defaultPrompt = `Create a modern, professional blog banner for an AI technology article.
Design: Clean minimalist style with blue-to-orange gradient background.
Elements: Technology symbols, innovation indicators, professional icons.
Style: Professional, tech-focused, high contrast.
Format: 16:9 aspect ratio, no text overlay.`;

// Get prompt for specific category
export function getPromptForCategory(category: string): string {
  return promptTemplates[category as keyof typeof promptTemplates] || defaultPrompt;
}
