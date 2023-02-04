import { SearchPlugin } from 'vitepress-plugin-search';

export default {
	plugins: [
		SearchPlugin({
			encode: false,
			tokenize: 'full',
		}),
	],
};
