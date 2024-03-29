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
      titleTemplate: 'A approachable, fast, flexible and lightweight JavaScript library',
      description: 'Building user interfaces',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/strveJs' }],
    locales: {
      '/': {
        nav: [
          {
            text: 'Change Log',
            link: '/changeLog/',
          },
          {
            text: 'Languages',
            items: [
              {
                text: 'English',
                link: 'https://strvejs.github.io/strve-doc/',
              },
              {
                text: '简体中文',
                link: 'https://strvejs.github.io/strve-doc-zh/',
              },
            ],
          },
        ],
        sidebar: [
          {
            text: 'Guide',
            collapsible: false,
            items: [
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
            collapsible: false,
            items: [
              {
                text: 'API',
                link: '/essentials/api/',
              },
              {
                text: 'Usage',
                link: '/essentials/usage/',
              },
              {
                text: 'Example',
                link: '/essentials/example/',
              },
            ],
          },
          {
            text: 'Tool',
            collapsible: false,
            items: [
              {
                text: 'CreateStrveApp',
                link: '/tool/createStrveApp/',
              },
              {
                text: 'StrveRouter',
                link: '/tool/strveRouter/',
              },
              {
                text: 'BabelPluginStrve',
                link: '/tool/babelPluginStrve/',
              },
              {
                text: 'BabelPluginJsxToStrve',
                link: '/tool/babelPluginJsxToStrve/',
              },
              {
                text: 'StrveReactivity',
                link: '/tool/strveReactivity/',
              },
            ],
          },
          {
            text: 'Other',
            collapsible: false,
            items: [
              {
                text: 'JSX Support',
                link: '/other/jsx/',
              },
              {
                text: 'IDE Support',
                link: '/other/ide/',
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
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2021-${new Date().getFullYear()} maomincoding`,
    },
  },
};
