// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'Buterr Blog',
			logo: {
				src: '/houston.webp',
				alt: 'Buterr Blog',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Buterr04' },
			],
			components: {
				MarkdownContent: './components/MarkdownContent.astro',
			},
			defaultLocale: 'zh-CN',
			sidebar: [
				{
					label: '🏠 关于',
					items: [
						{ label: '个人介绍', slug: 'about/index' },
					],
				},
				{
					label: '🚀 项目',
					items: [
						{ label: '快递包裹破损识别系统', slug: 'projects/agent-project/index' },
						{ label: '进销存管理系统', slug: 'projects/warehouse/index' },
						{ label: 'OpenClaw 配置指南', slug: 'projects/openclaw/index' },
						{ label: 'Coze Studio 部署', slug: 'projects/coze-deployment/index' },
					],
				},
				{
					label: '🔧 技术笔记',
					items: [
						{ label: 'Docker → OrbStack 迁移', slug: 'tech/docker-to-orbstack/index' },
						{ label: 'LangChain 学习笔记', slug: 'tech/langchain/index' },
						{ label: 'Chroma 向量数据库', slug: 'tech/chroma-vector-db/index' },
						{ label: 'Gemini API 使用笔记', slug: 'tech/gemini-api/index' },
						{ label: 'Go 语言', slug: 'tech/go/index' },
						{ label: 'Redis 入门', slug: 'tech/redis/index' },
						{ label: 'Flutter 入门', slug: 'tech/flutter/index' },
					],
				},
				{
					label: '📚 课程笔记',
					items: [
						{ label: 'Java 程序设计', slug: 'study/java/index' },
						{ label: 'C 语言程序设计', slug: 'study/c-language/index' },
					],
				},
			],
		}),
	],
});
