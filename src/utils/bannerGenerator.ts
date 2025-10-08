// Blog banner image generation utility
export interface BlogPost {
  title: string;
  description: string;
  category: string;
  tags: string[];
  slug: string;
}

export interface BannerImageConfig {
  width: number;
  height: number;
  style: 'modern' | 'minimal' | 'tech' | 'creative';
  colorScheme: 'blue' | 'purple' | 'green' | 'orange' | 'gradient';
}

// Generate banner image using CSS gradients and text
export function generateBannerImage(post: BlogPost, config: BannerImageConfig = {
  width: 1200,
  height: 630,
  style: 'modern',
  colorScheme: 'gradient'
}) {
  const { title, category, tags } = post;
  
  // Color schemes
  const colorSchemes = {
    blue: 'from-blue-500 to-blue-700',
    purple: 'from-purple-500 to-purple-700', 
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700',
    gradient: 'from-primary to-accent'
  };
  
  // Category icons
  const categoryIcons = {
    'AI 趋势': '🔮',
    'AI 营销': '📈', 
    'AI 工具': '🛠️',
    '技术实践': '💻',
    'Tech Tutorial': '💻',
    'AI Marketing': '📈',
    'AI Tools': '🛠️',
    'AI Trends': '🔮'
  };
  
  const icon = categoryIcons[category as keyof typeof categoryIcons] || '🤖';
  const gradient = colorSchemes[config.colorScheme];
  
  return {
    icon,
    gradient,
    title: title.length > 50 ? title.substring(0, 50) + '...' : title,
    category,
    tags: tags.slice(0, 3)
  };
}

// Generate SVG banner image
export function generateSVGBanner(post: BlogPost, config: BannerImageConfig) {
  const bannerData = generateBannerImage(post, config);
  
  return `
    <svg width="${config.width}" height="${config.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bg)" />
      
      <!-- Decorative elements - positioned to avoid icon -->
      <circle cx="80" cy="80" r="40" fill="white" opacity="0.08" />
      <circle cx="${config.width - 80}" cy="${config.height - 80}" r="60" fill="white" opacity="0.05" />
      
      <!-- Main icon - perfectly centered -->
      <text x="50%" y="50%" font-family="system-ui" font-size="120" text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.95">
        ${bannerData.icon}
      </text>
    </svg>
  `;
}
