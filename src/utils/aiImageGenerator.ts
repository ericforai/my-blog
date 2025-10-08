// BlogPost 类型定义
interface BlogPost {
  title: string;
  description: string;
  category: string;
  tags: string[];
  slug: string;
}

interface AIImageConfig {
  apiKey: string;
  model: 'dall-e-2' | 'dall-e-3';
  size: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality: 'standard' | 'hd';
  style: 'vivid' | 'natural';
}

interface GeneratedImage {
  url: string;
  revised_prompt?: string;
}

export class AIImageGenerator {
  private config: AIImageConfig;

  constructor(config: AIImageConfig) {
    this.config = config;
  }

  /**
   * 生成博客文章 banner 图片
   */
  async generateBannerImage(post: BlogPost): Promise<GeneratedImage> {
    const prompt = this.buildPrompt(post);
    
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          prompt: prompt,
          n: 1,
          size: this.config.size,
          quality: this.config.quality,
          style: this.config.style,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data[0];
    } catch (error) {
      console.error('AI image generation failed:', error);
      throw error;
    }
  }

  /**
   * 构建图片生成提示词
   */
  private buildPrompt(post: BlogPost): string {
    const categoryKeywords = this.getCategoryKeywords(post.category);
    const styleKeywords = this.getStyleKeywords(post.tags);
    
    return `Create a modern, professional blog banner image for an AI technology article. 
    
    Theme: ${post.category}
    Keywords: ${categoryKeywords.join(', ')}
    Style: ${styleKeywords.join(', ')}
    
    Design requirements:
    - Clean, minimalist design
    - Modern gradient background (blue to orange)
    - Professional typography space
    - Tech/AI visual elements
    - High contrast for readability
    - 16:9 aspect ratio suitable for web banner
    - No text overlay (text will be added separately)
    
    Visual style: Modern, clean, professional, tech-focused, minimalist`;
  }

  /**
   * 根据分类获取关键词
   */
  private getCategoryKeywords(category: string): string[] {
    const categoryMap: { [key: string]: string[] } = {
      'AI Marketing': ['marketing', 'analytics', 'data visualization', 'growth charts'],
      'AI Tools': ['tools', 'software', 'utilities', 'productivity'],
      'AI Trends': ['future', 'innovation', 'technology', 'trends'],
      'Tech Tutorial': ['learning', 'education', 'tutorial', 'coding'],
      'AI 营销': ['营销', '数据分析', '增长', '商业'],
      'AI 工具': ['工具', '软件', '效率', '生产力'],
      'AI 趋势': ['未来', '创新', '科技', '趋势'],
      '技术实践': ['学习', '教育', '教程', '编程'],
    };

    return categoryMap[category] || ['technology', 'innovation', 'AI'];
  }

  /**
   * 根据标签获取风格关键词
   */
  private getStyleKeywords(tags: string[]): string[] {
    const styleMap: { [key: string]: string[] } = {
      'AI': ['artificial intelligence', 'machine learning', 'neural networks'],
      'Marketing': ['marketing', 'business', 'strategy'],
      'Tools': ['tools', 'software', 'utilities'],
      'Tutorial': ['education', 'learning', 'tutorial'],
      'Trends': ['future', 'innovation', 'technology'],
    };

    const styles: string[] = [];
    tags.forEach(tag => {
      const tagStyles = styleMap[tag] || [];
      styles.push(...tagStyles);
    });

    return styles.length > 0 ? styles : ['modern', 'professional', 'tech'];
  }

  /**
   * 批量生成图片（用于缓存）
   */
  async generateBatchImages(posts: BlogPost[]): Promise<Map<string, GeneratedImage>> {
    const results = new Map<string, GeneratedImage>();
    
    // 限制并发请求数量
    const batchSize = 3;
    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);
      const promises = batch.map(async (post) => {
        try {
          const image = await this.generateBannerImage(post);
          results.set(post.slug, image);
        } catch (error) {
          console.error(`Failed to generate image for ${post.slug}:`, error);
        }
      });
      
      await Promise.all(promises);
      
      // 添加延迟避免 API 限制
      if (i + batchSize < posts.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

/**
 * 创建 AI 图片生成器实例
 */
export function createAIImageGenerator(apiKey: string): AIImageGenerator {
  return new AIImageGenerator({
    apiKey,
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'standard',
    style: 'natural',
  });
}

/**
 * 缓存管理
 */
export class ImageCache {
  private cache: Map<string, string> = new Map();
  private cacheDir: string;

  constructor(cacheDir: string = './public/generated-images') {
    this.cacheDir = cacheDir;
  }

  /**
   * 获取缓存的图片 URL
   */
  getCachedImage(slug: string): string | null {
    return this.cache.get(slug) || null;
  }

  /**
   * 缓存图片 URL
   */
  setCachedImage(slug: string, url: string): void {
    this.cache.set(slug, url);
  }

  /**
   * 检查图片是否已缓存
   */
  hasCachedImage(slug: string): boolean {
    return this.cache.has(slug);
  }
}
