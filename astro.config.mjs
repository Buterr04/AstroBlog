// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://buterr04.github.io/',

  integrations: [
      starlight({
          title: 'Buterr\'s Blog',
          social: [
              { icon: 'github', label: 'GitHub', href: 'https://github.com/Buterr04' },
          ],
          defaultLocale: 'zh-CN',
          sidebar: [
              {
                  label: '🏠 关于',
                  items: [
                      { label: '个人介绍', slug: 'about' },
                  ],
              },
              {
                  label: '🚀 项目',
                  items: [
                      { autogenerate: {directory: 'projects'}},
                  ],
              },
              {
                  label: '🔧 技术笔记',
                  items: [
                    { autogenerate: {directory: 'tech'}},
                    
                  ],
              },
              {
                  label: '📚 课程笔记',
                  items: [
                      { autogenerate: {directory: 'courses'}},

                  ],
              },
          ],
      }),
	],

  adapter: cloudflare(),
});