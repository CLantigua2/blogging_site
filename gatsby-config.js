/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Carlos Lantigua",
    titleTemplate: "Random Tech Stuff",
    author: "Carlos Lantigua",
    url: "http://www.thebrowndev.com",
    image: `${__dirname}/src/images/me.jpg`,
    description:
      "This site will be used to dump all of my blogs and projects. A place to keep track of my progression and learnings throughout my time as a Software Developer.",
    social: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/carlos-lantigua/",
      },
      {
        name: "Github",
        url: "https://www.github.com/clantigua2",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "carlos-lantigua-blog-site",
        protocol: "https",
        hostname: "www.thebrowndev.com",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
          },
          `gatsby-remark-lazy-load`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {
                sh: "bash",
              },
              showLineNumbers: true,
              noInlineHighlight: true,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 865,
              loading: "lazy",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: `gatsby-plugin-transition-link`,
      options: {},
    },
    {
      // comment stuff
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `clantigua`,
      },
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`Array.prototype.map`, "crypto"],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `thebrowndev.com`,
        short_name: `browndev`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: "src/images/Carlos-Lantigua-midcrop-small.jpg",
      },
    },
  ],
}
