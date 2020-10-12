const urljoin = require("url-join");
const path = require("path");
const globImporter = require("node-sass-glob-importer");
const config = require("./data/SiteConfig");

const { NODE_ENV } = process.env;

const envBooks = env => {
  return env === "production" ? "books" : "books-dev";
};

console.log(`Using ${NODE_ENV} environment settings.`);

module.exports = {
  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}/logos/logo-512.png`,
      copyright: config.copyright
    }
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-lodash",
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: `${__dirname}/src/svg`
        }
      }
    },
    {
      resolve: "gatsby-image"
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        importer: globImporter()
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "frontendPosts",
        path: `${__dirname}/content/frontend-posts`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "books",
        path: `${__dirname}/content/${envBooks(NODE_ENV)}`
      }
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "thoughts",
    //     path: `${__dirname}/content/thoughts`
    //   }
    // },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-relative-images`
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 690
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe"
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs"
        ]
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icon: `src/images/favicon.png` // This path is relative to the root folder
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: path.resolve("src/netlifycms/index.js"), // default: undefined
        enableIdentityWidget: true,
        publicPath: "admin",
        htmlTitle: "Content Manager",
        includeRobots: false
      }
    },
    {
      resolve: "gatsby-plugin-feed-mdx",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMdx = ref.query.allMdx;
          ret.generator = "GatsbyJS Advanced Starter";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allMdx.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.fields.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [
                  { "content:encoded": edge.node.html },
                  { author: config.userEmail }
                ]
              }));
            },
            query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [fields___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      cover
                      date
                      categories
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss,
            title: config.siteRssTitle
          }
        ]
      }
    }
  ]
};
