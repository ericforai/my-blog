import type { APIRoute } from 'astro';

// 博客文章数据
const posts = [
  {
    title: "AI 重塑营销：从内容生产到精准投放的全链路革命",
    description: "深度解析 AI 如何改变营销的每个环节，从文案创作、视觉设计到数据分析，附实战案例与工具推荐",
    slug: "ai-marketing-revolution",
    pubDate: new Date("2025-10-07"),
    author: "AI小孩",
    category: "AI 营销",
    tags: ["AI营销", "数字营销", "营销自动化"]
  },
  {
    title: "2025 年必备的 10 个 AI 工具：让生产力飞跃的秘密武器",
    description: "精选 10 个经过实战检验的 AI 工具，涵盖写作、编程、设计、数据分析等场景，附使用技巧与对比评测",
    slug: "ai-tools-2025",
    pubDate: new Date("2025-10-07"),
    author: "AI小孩",
    category: "AI 工具",
    tags: ["AI工具", "生产力", "ChatGPT", "Midjourney"]
  },
  {
    title: "AI 未来十年的关键词：重新定义智能时代的边界",
    description: "从 AGI 到多模态，从开源革命到伦理觉醒，解读未来十年将主导 AI 发展的 10 个核心关键词",
    slug: "ai-future-decade-keywords",
    pubDate: new Date("2025-10-07"),
    author: "AI小孩",
    category: "AI 趋势",
    tags: ["AI", "未来趋势", "AGI", "多模态AI"]
  },
  {
    title: "Prompt Engineering：AI 时代的新编程语言",
    description: "深入探索 Prompt Engineering 的核心原理、实用技巧与最佳实践，掌握与 AI 对话的艺术",
    slug: "prompt-engineering",
    pubDate: new Date("2025-10-07"),
    author: "AI小孩",
    category: "提示词工程",
    tags: ["AI", "Prompt Engineering", "ChatGPT", "技术教程"]
  },
  {
    title: "2025 AI 大模型排行榜：GPT-5 vs Claude 4 vs Gemini 2.0 全面对比",
    description: "最新 AI 大模型实测对比，涵盖性能、价格、应用场景全方位评测，帮你选出最适合的 AI 模型",
    slug: "ai-model-ranking-2025",
    pubDate: new Date("2025-10-08"),
    author: "AI小孩",
    category: "AI 趋势",
    tags: ["AI模型", "GPT-5", "Claude", "Gemini", "大模型对比", "AI排行榜"]
  },
  {
    title: "用 AI 写爆款文案：5 个 Prompt 模板直接套用",
    description: "实战验证的 AI 文案生成模板，涵盖营销文案、社交媒体、电商详情页等场景，让你 10 分钟产出专业级文案",
    slug: "ai-copywriting-prompts",
    pubDate: new Date("2025-10-09"),
    author: "AI小孩",
    category: "AI 营销",
    tags: ["AI营销", "文案创作", "Prompt模板", "营销文案", "ChatGPT"]
  }
];

export const GET: APIRoute = () => {
  const site = 'https://www.aixiaohai.com';
  const buildDate = new Date().toISOString();
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AI小孩 - 面对AI，我们都是学习者</title>
    <description>AI小孩是专注于AI学习的信息汇聚平台，提供前沿洞察、实用工具和深度思考。让AI成为每个人的学习伙伴，重启你的第二次童年。</description>
    <link>${site}</link>
    <language>zh-CN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${site}/logo.svg</url>
      <title>AI小孩</title>
      <link>${site}</link>
    </image>
    <managingEditor>hello@aixiaohai.com (AI小孩)</managingEditor>
    <webMaster>hello@aixiaohai.com (AI小孩)</webMaster>
    <generator>Astro + AI小孩</generator>
    <category>Technology</category>
    <category>Artificial Intelligence</category>
    <category>Machine Learning</category>
    
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${site}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site}/blog/${post.slug}</guid>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      <author>hello@aixiaohai.com (${post.author})</author>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>`).join('')}
    
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
