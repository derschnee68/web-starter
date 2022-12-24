// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/palenight');

const config = {
  title: 'Documentation',
  tagline: 'Documentation',
  url: 'https://docs.mywebsite.ai',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: 'Documentation',
      logo: {
        alt: 'symbol',
        src: 'img/github.png',
      },
      items: [
        {
          href: 'https://mywebsite.ai',
          label: 'Go to website',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: {
        href: 'https://github.com',
        alt: 'Github',
        src: 'img/github.png',
        width: 100,
      },
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/elonmusk',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com',
            },
          ],
        },
      ],
      // @ts-ignore
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
