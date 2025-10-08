import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check if we're building for GitHub Pages
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  // Use GitHub Pages URL for GitHub Pages deployment
  site: isGitHubPages ? 'https://ericforai.github.io/my-blog' : 'https://www.aixiaohai.com',
  
  // GitHub Pages specific configuration
  base: isGitHubPages ? '/my-blog/' : '/',
  
  // i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': ['*'],
      },
    }),
  ],

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
