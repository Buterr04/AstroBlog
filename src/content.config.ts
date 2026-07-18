import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			sidebar: {
				// Auto-generate sidebar entries from directory structure
				// Each `index.md` file becomes a sidebar item
				// Subdirectories become groups
			},
		}),
	}),
};
