export default {
	base: '/strvejs-doc/',
	// title: 'Strve.js',
	// titleTemplate: 'A JS library that can convert strings into view',
	// description: 'A JS library that can convert strings into view',
	head: [['link', { rel: 'icon', href: '/strvejs-doc/' + 'logo.png' }]],
	// ignoreDeadLinks: true,
	// lang: 'en-US',
	markdown: {
		theme: 'material-palenight',
		lineNumbers: true,
	},
	locales: {
		'/': {
			lang: 'en-US',
			title: 'Strve.js',
			titleTemplate: 'A JS library that can convert strings into view',
			description: 'A JS library that can convert strings into view',
		},
		'/zh/': {
			lang: 'zh-CN',
			title: 'Strve.js',
			titleTemplate: '一个可以将字符串转换为视图的JS库',
			description: '一个可以将字符串转换为视图的JS库',
		},
	},
	themeConfig: {
		logo: '/logo.png',
		algolia: {
			apiKey: 'bfcdc868c58895106c405a8d1a765c09',
			indexName: 'strvejs',
			appId: 'OO7L0TPJ7C',
		},
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/maomincoding/strve' },
		],
		locales: {
			'/': {
				nav: [
					{
						text: 'Languages',
						items: [
							{ text: 'English', link: '/' },
							{ text: '简体中文', link: '/zh/' },
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
								text: 'Install',
								link: '/guide/install/',
							},
							{
								text: 'Started',
								link: '/guide/started/',
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
						],
					},
					{
						text: 'Other',
						collapsible: true,
						items: [
							{
								text: 'Change Log',
								link: '/other/changeLog/',
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
			},
			'/zh/': {
				nav: [
					{
						text: '选择语言',
						items: [
							{ text: 'English', link: '/' },
							{ text: '简体中文', link: '/zh/' },
						],
					},
				],
				outlineTitle: '此页',
				sidebar: [
					{
						text: '指导',
						collapsible: true,
						items: [
							{
								text: '介绍',
								link: '/zh/guide/introduce/',
							},
							{
								text: '安装',
								link: '/zh/guide/install/',
							},
							{
								text: '开始',
								link: '/zh/guide/started/',
							},
						],
					},
					{
						text: '要点',
						collapsible: true,
						items: [
							{
								text: 'API',
								link: '/zh/essentials/api/',
							},
							{
								text: '用法',
								link: '/zh/essentials/usage/',
							},
						],
					},
					{
						text: '工具',
						collapsible: true,
						items: [
							{
								text: 'CreateStrveApp',
								link: '/zh/tool/createStrveApp/',
							},
							{
								text: 'CreateStrve',
								link: '/zh/tool/createStrve/',
							},
							{
								text: 'StrveRouter',
								link: '/zh/tool/strveRouter/',
							},
						],
					},
					{
						text: '其他',
						collapsible: true,
						items: [
							{
								text: '更新日志',
								link: '/zh/other/changeLog/',
							},
							{
								text: 'IDE 支持',
								link: '/zh/other/ide/',
							},
							{
								text: 'UI 框架',
								link: '/zh/other/ui/',
							},
							{
								text: '浏览器兼容性',
								link: '/zh/other/browser/',
							},
							{
								text: '关于',
								link: '/zh/other/about/',
							},
						],
					},
				],
			},
		},
		footer: {
			message: 'Released under the MIT License.',
			copyright: `Copyright © 2021-${new Date().getFullYear()} maomincoding`,
		},
	},
};
