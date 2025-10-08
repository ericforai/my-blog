// Tag mapping for SEO-friendly URLs
export const tagMapping = {
  // English tags
  'AI': 'ai',
  'AGI': 'agi',
  'ChatGPT': 'chatgpt',
  'Midjourney': 'midjourney',
  'Prompt Engineering': 'prompt-engineering',
  
  // Chinese tags to English slugs
  'AI营销': 'ai-marketing',
  'AI工具': 'ai-tools',
  '未来趋势': 'future-trends',
  '多模态AI': 'multimodal-ai',
  '数字营销': 'digital-marketing',
  '营销自动化': 'marketing-automation',
  '生产力': 'productivity',
  '技术教程': 'tech-tutorial',
  '开源': 'open-source',
};

// Reverse mapping for display
export const slugToTag = Object.fromEntries(
  Object.entries(tagMapping).map(([tag, slug]) => [slug, tag])
);

// Get tag slug from tag name
export function getTagSlug(tag: string): string {
  return tagMapping[tag as keyof typeof tagMapping] || tag.toLowerCase().replace(/\s+/g, '-');
}

// Get tag name from slug
export function getTagFromSlug(slug: string): string {
  return slugToTag[slug] || slug;
}
