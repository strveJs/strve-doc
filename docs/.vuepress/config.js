const url = {
    a:'/strvejs-doc/',
    b:'/site/strvejs/'
};

module.exports = {
    base: url.a,
    title: 'Strve.js',
    description: 'A JS library that can convert strings into view',
    head: [
        ['link', { rel: 'icon', href:  url.a+'logo.png' }],
    ],
    plugins: [
        [
          '@vuepress/plugin-search',
          {
            locales: {
              '/': {
                placeholder: 'Search',
              },
              '/zh/': {
                placeholder: '搜索',
              },
            },
            maxSuggestions:8,
          },
        ],
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
        contributors:false,
        lastUpdated:false,
        darkMode:true,
        logo: '/logo.png',
        displayAllHeaders: true,
        sidebar: 'auto',
        sidebarDepth:4,
        navbar: [
            { text: 'GitHub', link: 'https://github.com/maomincoding/strve' }
        ],
        locales: {
            '/': {
                selectLanguageText:'Languages',
                selectLanguageName: 'English',
                selectLanguageAriaLabel:'English',
                sidebar: [
                    {
                        text: 'Introduce',
                        link: '/introduce/',
                    },
                    {
                        text: 'Install',
                        link: '/install/',
                    },
                    {
                        text: 'Started',
                        link: '/started/',
                    },
                    {
                        text: 'Usage',
                        link: '/usage/',
                    },
                    {
                        text: 'Tool',
                        link: '/tool/',
                    },
                    {
                        text: 'Other',
                        link: '/other/',
                    }
                ],
            },
            '/zh/': {
                selectLanguageText:'选择语言',
                selectLanguageAriaLabel:'简体中文',
                selectLanguageName: '简体中文',
                sidebar: [
                    {
                        text: '介绍',
                        link: '/zh/introduce/',
                    },
                    {
                        text: '安装',
                        link: '/zh/install/',
                    },
                    {
                        text: '开始',
                        link: '/zh/started/',
                    },
                    {
                        text: '使用',
                        link: '/zh/usage/',
                    },
                    {
                        text: '工具',
                        link: '/zh/tool/',
                    },
                    {
                        text: '其它',
                        link: '/zh/other/',
                    }
                ],
            }
        },
        smoothScroll: true
    }
}