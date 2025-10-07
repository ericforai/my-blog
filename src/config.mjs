export const SITE = {
  title: "Eric's AI Blog",
  description: "探索AI、营销与技术的前沿思考",
  author: "Eric",
  lang: "zh-CN",
  ogImage: "/og-image.png",
  defaultImage: "/default.jpg",
  
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
    template: '%s — ' + SITE.title,
  },
  description: SITE.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: SITE.lang,
    url: SITE.site,
    siteName: SITE.title,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 628,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

