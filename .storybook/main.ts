// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	// Required
	framework: '@storybook/nextjs', // 👈 Add this
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	// Optional
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-interactions',
	],
	docs: {
		autodocs: 'tag',
	},
	staticDirs: ['../public'],
};

export default config;
