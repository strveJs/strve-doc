export default {
	base: '/strve-doc',
	head: [['link', { rel: 'icon', href: '/strve-doc/' + 'logo.png' }]],
	markdown: {
		theme: 'material-default',
		lineNumbers: false,
	},
	locales: {
		'/': {
			lang: 'en-US',
			title: 'Strve.js',
			titleTemplate: 'A JS library that can convert strings into view',
			description: 'A JS library that can convert strings into view',
		},
	},
	themeConfig: {
		logo: '/logo.png',
		// algolia: {
		// 	apiKey: 'bfcdc868c58895106c405a8d1a765c09',
		// 	indexName: 'strvejs',
		// 	appId: 'OO7L0TPJ7C',
		// },
		socialLinks: [
			{ icon: 'twitter', link: 'https://twitter.com/maomincoding' },
			{ icon: 'github', link: 'https://github.com/maomincoding/strve' },
		],
		locales: {
			'/': {
				nav: [
					{
						text: 'Playground',
						link: '/playground/',
					},
					{
						text: 'Change Log',
						link: '/changeLog/',
					},
					{
						text: 'Languages',
						items: [
							{ text: 'English', 	link: 'https://maomincoding.github.io/strve-doc/'},
							{ text: '简体中文', link: 'https://maomincoding.github.io/strve-doc-zh/'},
						],
					},
				],
				sidebar: [
					{
						text: 'Guide',
						collapsible: true,
						items: [
							{
								text: 'Introduce',
								link: '/guide/introduce/',
							},
							{
								text: 'Started',
								link: '/guide/started/',
							},
							{
								text: 'Install',
								link: '/guide/install/',
							},
						],
					},
					{
						text: 'Essentials',
						collapsible: true,
						items: [
							{
								text: 'API',
								link: '/essentials/api/',
							},
							{
								text: 'Usage',
								link: '/essentials/usage/',
							},
						],
					},
					{
						text: 'Tool',
						collapsible: true,
						items: [
							{
								text: 'CreateStrveApp',
								link: '/tool/createStrveApp/',
							},
							{
								text: 'CreateStrve',
								link: '/tool/createStrve/',
							},
							{
								text: 'StrveRouter',
								link: '/tool/strveRouter/',
							},
							{
								text: 'BabelPluginStrve',
								link: '/tool/babelPluginStrve/',
							},
						],
					},
					{
						text: 'Other',
						collapsible: true,
						items: [
							{
								text: 'SFC',
								link: '/other/sfc/',
							},
							{
								text: 'Adapt',
								link: '/other/adapt/',
							},
							{
								text: 'IDE Support',
								link: '/other/ide/',
							},
							{
								text: 'UI Framework',
								link: '/other/ui/',
							},
							{
								text: 'Browser Compatibility',
								link: '/other/browser/',
							},
							{
								text: 'About',
								link: '/other/about/',
							},
						],
					},
				],
			}
		},
		footer: {
			message: 'Released under the MIT License.',
			copyright: `Copyright © 2021-${new Date().getFullYear()} maomincoding`,
		},
	},
};
