// Astro 动态生成 sitemap.xml
import type { APIRoute } from 'astro';

// 文章数据（实际项目中应从数据库或文件系统读取）
const posts = [
  {
    slug: 'ai-future-decade-keywords',
    lastmod: '2025-10-07'
  },
  {
    slug: 'ai-marketing-revolution',
    lastmod: '2025-10-07'
  },
  {
    slug: 'ai-tools-2025',
    lastmod: '2025-10-07'
  },
  {
    slug: 'prompt-engineering',
    lastmod: '2025-10-07'
  },
  {
    slug: 'ai-model-ranking-2025',
    lastmod: '2025-10-08'
  },
  {
    slug: 'ai-copywriting-prompts',
    lastmod: '2025-10-09'
  }
];

// 分类页面
const categories = [
  'ai-trends',
  'ai-marketing',
  'ai-tools',
  'tech-tutorial',
  'insights',
  'resources'
];

// 标签页面
const tags = [
  'AI', 'AI营销', 'AI工具', '未来趋势', 'AGI', '多模态AI',
  '数字营销', '营销自动化', '生产力', 'ChatGPT', 'Midjourney',
  'Prompt Engineering', '技术教程', '开源', 'GPT-5', 'Claude', 'Gemini',
  '文案创作', 'Prompt模板', '营销文案'
];

export const GET: APIRoute = () => {
  const baseUrl = 'https://yourdomain.com'; // 替换为你的域名
  
  // 生成 XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- 首页 -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- 博客列表页 -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- 关于页面 -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>2025-10-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- 文章页面 -->
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  
  <!-- 分类页面 -->
  ${categories.map(cat => `
  <url>
    <loc>${baseUrl}/category/${cat}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  
  <!-- 标签页面 -->
  ${tags.map(tag => `
  <url>
    <loc>${baseUrl}/tag/${encodeURIComponent(tag)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('')}
  
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};

