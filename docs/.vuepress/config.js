module.exports = {
    base: '/site/strvejs/',
    title: 'Strve.js',
    description: 'A JS library that can convert strings into view',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
    ],
    markdown: {
        lineNumbers: false
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
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
                    // {
                    //     title: 'Install',
                    //     path: '/install/',
                    // },
                    // {
                    //     title: 'Started',
                    //     path: '/started/',
                    // },
                    // {
                    //     title: 'Use',
                    //     path: '/use/',
                    // },
                    // {
                    //     title: 'Build',
                    //     path: '/build/',
                    // },
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
                    // {
                    //     title: '安装',
                    //     path: '/zh/install/',
                    // },
                    // {
                    //     title: '快速上手',
                    //     path: '/zh/started/',
                    // },
                    // {
                    //     title: '基本使用',
                    //     path: '/zh/use/',
                    // },
                    // {
                    //     title: '部署',
                    //     path: '/zh/build/',
                    // },
                ],
            }
        },
        smoothScroll: true
    }
}