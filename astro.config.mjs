// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
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
  
  markdown: {
    syntaxHighlight: 'prism',
  },
});