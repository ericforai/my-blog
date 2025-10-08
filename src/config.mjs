export const SITE = {
  title: "AI小孩 - 面对AI，我们都是学习者",
  description: "AI小孩是专注于AI学习的温暖社区，提供前沿洞察、实用工具和深度思考。让AI成为每个人的学习伙伴，重启你的第二次童年。",
  author: "AI小孩",
  lang: "zh-CN",
  site: "https://www.aixiaohai.com",
  ogImage: "/og-image.png",
  defaultImage: "/og-image.png",
  
  // SEO 关键词
  keywords: [
    "AI学习", "人工智能", "机器学习", "深度学习", 
    "AI工具", "ChatGPT", "AI营销", "Prompt Engineering",
    "AI趋势", "技术前沿", "数字化学习", "AI社区"
  ],
  
  // 社交媒体信息
  social: {
    twitter: "@aixiaohai",
    github: "https://github.com/aixiaohai",
    email: "hello@aixiaohai.com",
  },
  
  defaultTheme: 'system', // Values: "system" | "light" | "dark" | "light:only" | "dark:only"
  
  dateFormatter: new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Shanghai',
  }),
};

export const BLOG = {
  isEnabled: true,
  postsPerPage: 6,

  post: {
    isEnabled: true,
    permalink: '/blog/%slug%',
    robots: {
      index: true,
      follow: true,
    },
  },

  list: {
    isEnabled: true,
    pathname: 'blog',
    robots: {
      index: true,
      follow: true,
    },
  },

  category: {
    isEnabled: true,
    pathname: 'category',
    robots: {
      index: true,
      follow: true,
    },
  },

  tag: {
    isEnabled: true,
    pathname: 'tag',
    robots: {
      index: true,
      follow: true,
    },
  },
};

export const METADATA = {
  title: {
    default: SITE.title,
    template: '%s — AI小孩',
  },
  description: SITE.description,
  keywords: SITE.keywords.join(', '),
  author: SITE.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE.lang,
    url: SITE.site,
    siteName: 'AI小孩',
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 628,
        alt: 'AI小孩 - 面对AI，我们都是学习者',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.social.twitter,
    creator: SITE.social.twitter,
    title: SITE.title,
    description: SITE.description,
    image: SITE.ogImage,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

