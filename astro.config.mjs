// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
						{ label: '快递包裹破损识别系统', slug: 'projects/agent-project' },
						{ label: '进销存管理系统', slug: 'projects/warehouse' },
						{ label: 'OpenClaw 配置指南', slug: 'projects/openclaw' },
						{ label: 'Coze Studio 部署', slug: 'projects/coze-deployment' },
					],
				},
				{
					label: '🔧 技术笔记',
					items: [
						{ label: 'Docker → OrbStack 迁移', slug: 'tech/docker-to-orbstack' },
						{ label: 'LangChain 学习笔记', slug: 'tech/langchain' },
						{ label: 'Chroma 向量数据库', slug: 'tech/chroma-vector-db' },
						{ label: 'Gemini API 使用笔记', slug: 'tech/gemini-api' },
						{ label: 'Go 语言', slug: 'tech/go' },
						{ label: 'Redis 入门', slug: 'tech/redis' },
						{ label: 'Flutter 入门', slug: 'tech/flutter' },
					],
				},
				{
					label: '📚 课程笔记',
					items: [
						{ label: 'Java 程序设计', slug: 'study/java' },
						{ label: 'C 语言程序设计', slug: 'study/c-language' },
					],
				},
			],
		}),
	],
});
