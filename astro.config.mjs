// @ts-check

import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import { defineConfig } from 'astro/config';

// https://astro.build/config

const isGitHubPages = Boolean(process.env.GITHUB_PAGES);

export default defineConfig({
  // site: 根 URL，用于生成 sitemap、RSS 等
  site: isGitHubPages
    ? 'https://aegeaner.github.io/algo-solutions-blog/'  // GitHub Pages URL
    : 'https://algo-solutions-blog.pages.dev/',        // Cloudflare Pages URL 或自定义域名

  // base: 构建时静态资源前缀
  base: isGitHubPages
    ? '/algo-solutions-blog/'  // GitHub Pages 非根仓库必须加仓库名
    : '/',             // Cloudflare Pages 根域名部署，保持 /
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },
  integrations: [sitemap()],
  // 预加载重要资源
  prefetch: true,
  // 压缩 HTML
  compressHTML: true,
  build: {
    // 内联小资源
    inlineStylesheets: 'auto',
  },
  output: isGitHubPages ? 'static' : undefined,
  trailingSlash: isGitHubPages ? 'always' : undefined,
});