module.exports = {
    base: '/site/strvejs/', // /site/strvejs/
    title: 'Strve.js',
    description: 'A JS library that can convert strings into view',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Strve.js',
            description: 'A JS library that can convert strings into view'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Strve.js',
            description: '一个可以将字符串转换为视图的JS库'
        }
    },
    themeConfig: {
        displayAllHeaders: true,
        sidebar: 'auto',
        sidebarDepth:4,
        nav: [
            { text: 'GitHub', link: 'https://github.com/maomincoding/strve' }
        ],
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                sidebar: [
                    {
                        title: 'Introduce',
                        path: '/introduce/',
                    },
                    {
                        title: 'Install',
                        path: '/install/',
                    },
                    {
                        title: 'Started',
                        path: '/started/',
                    },
                    {
                        title: 'Usage',
                        path: '/usage/',
                    },
                    {
                        title: 'Tool',
                        path: '/tool/',
                    },
                    {
                        title: 'Other',
                        path: '/other/',
                    }
                ],
            },
            '/zh/': {
                selectText: '选择语言',
                label: '简体中文',
                sidebar: [
                    {
                        title: '介绍',
                        path: '/zh/introduce/',
                    },
                    {
                        title: '安装',
                        path: '/zh/install/',
                    },
                    {
                        title: '快速上手',
                        path: '/zh/started/',
                    },
                    {
                        title: '使用',
                        path: '/zh/usage/',
                    },
                    {
                        title: '工具',
                        path: '/zh/tool/',
                    },
                    {
                        title: '其它',
                        path: '/zh/other/',
                    }
                ],
            }
        },
        smoothScroll: true
    }
}