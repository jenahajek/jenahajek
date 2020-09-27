/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  let postType;
  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === "frontendPosts") {
      postType = "frontend";
    } else if (fileNode.sourceInstanceName === "books") {
      postType = "reads";
    } else {
      postType = fileNode.sourceInstanceName;
    }
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
    createNodeField({ node, name: "postType", value: postType });
  }
};

// https://www.gatsbyjs.com/docs/schema-customization/#creating-type-definitions
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MdxFrontmatter implements Node {
      title: String
      subtitle: String
      thumbnail: File
      author: [String]
      publishedDate: Date
      date: Date
      pageCount: Int
      status: [String]
      type: [String]
      language: [String]
      categories: [String]
      geography: [String]
      period: [String]
      periodDetail: [String]
      genre: [String]
      sport: [String]
      tags: [String]
      excerpt: String
      cover: ID
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templates/post.jsx");
  const bookTemplate = path.resolve("src/templates/post-book.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");
  const listingPage = path.resolve("./src/templates/listing.jsx");
  // const landingPage = path.resolve("./src/templates/landing.jsx");

  // Get a full list of markdown posts
  const queryResults = await graphql(`
    {
      frontendPostsQuery: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/(/content/frontend-posts)/.*.mdx$/" }
        }
      ) {
        edges {
          node {
            fields {
              slug
              postType
            }
            frontmatter {
              title
              tags
              categories
              date
            }
          }
        }
        nodes {
          body
        }
      }
      booksQuery: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/(/content/books(-dev)?)/.*.mdx$/" }
        }
      ) {
        edges {
          node {
            fields {
              slug
              postType
            }
            frontmatter {
              title
              subtitle
              author
              date
              pageCount
              status
              type
              language
              categories
              geography
              period
              periodDetail
              genre
              sport
              tags
              excerpt
            }
          }
        }
        nodes {
          body
        }
      }
      thoughtQuery: allMdx(
        filter: { fileAbsolutePath: { regex: "/(/content/thoughts)/.*.mdx$/" } }
      ) {
        edges {
          node {
            fields {
              slug
              postType
            }
            frontmatter {
              title
              tags
              categories
              date
            }
          }
        }
        nodes {
          body
        }
      }
    }
  `);

  if (queryResults.errors) {
    console.error(queryResults.errors);
    throw queryResults.errors;
  }

  // -------------------------------
  // Generate pages for all post types
  // -------------------------------
  const postTypesList = [];
  Object.keys(queryResults.data).forEach(key => {
    postTypesList.push(key);
  });

  postTypesList.forEach(postTypeItem => {
    const categorySet = new Set();
    const geographySet = new Set();
    const genreSet = new Set();
    const periodSet = new Set();
    // const periodDetailSet = new Set();
    const sportSet = new Set();
    const tagSet = new Set();

    const posts = queryResults.data[postTypeItem].edges;
    // Sort posts
    posts.sort((postA, postB) => {
      const dateA = moment(
        postA.node.frontmatter.date,
        siteConfig.dateFromFormat
      );

      const dateB = moment(
        postB.node.frontmatter.date,
        siteConfig.dateFromFormat
      );

      if (dateA.isBefore(dateB)) return 1;
      if (dateB.isBefore(dateA)) return -1;

      return 0;
    });

    // Paging
    const { postsPerPage } = siteConfig;
    if (postsPerPage && posts.length > 0) {
      const pageCount = Math.ceil(posts.length / postsPerPage);
      const { postType } = posts[0].node.fields;

      [...Array(pageCount)].forEach((_val, pageNum) => {
        createPage({
          path:
            pageNum === 0 ? `/${postType}/` : `/${postType}/${pageNum + 1}/`,
          component: listingPage,
          context: {
            postType,
            limit: postsPerPage,
            skip: pageNum * postsPerPage,
            pageCount,
            currentPageNum: pageNum + 1
          }
        });
      });
    }
    // else {
    //   // Load the landing page instead
    //   createPage({
    //     path: `/`,
    //     component: landingPage
    //   });
    // }

    // Post page creating
    posts.forEach((edge, index) => {
      // Generate a list of categories
      if (edge.node.frontmatter.categories) {
        const { postType } = edge.node.fields;
        edge.node.frontmatter.categories.forEach(category => {
          const categoryObj = {
            category,
            postType
          };
          categorySet.add(categoryObj);
        });
      }

      // Generate a list of different kinds of tags
      if (edge.node.frontmatter.geography) {
        const { postType } = edge.node.fields;
        edge.node.frontmatter.geography.forEach(geography => {
          const geographyObj = {
            geography,
            postType,
            tagType: "geographyTags"
          };
          geographySet.add(geographyObj);
        });
      }

      if (edge.node.frontmatter.period) {
        const { postType } = edge.node.fields;
        edge.node.frontmatter.period.forEach(period => {
          const periodObj = {
            period,
            postType,
            tagType: "periodTags"
          };
          periodSet.add(periodObj);
        });
      }

      // if (edge.node.frontmatter.periodDetail) {
      //   const { postType } = edge.node.fields;
      //   edge.node.frontmatter.periodDetail.forEach(periodDetail => {
      //     const periodDetailObj = {
      //       periodDetail,
      //       postType,
      //       tagType: "periodDetailTags"
      //     };
      //     periodDetailSet.add(periodDetailObj);
      //   });
      // }

      if (edge.node.frontmatter.genre) {
        const { postType } = edge.node.fields;
        edge.node.frontmatter.genre.forEach(genre => {
          const genreObj = {
            genre,
            postType,
            tagType: "genreTags"
          };
          genreSet.add(genreObj);
        });
      }

      if (edge.node.frontmatter.sport) {
        const { postType } = edge.node.fields;
        edge.node.frontmatter.sport.forEach(sport => {
          const sportObj = {
            sport,
            postType,
            tagType: "sportTags"
          };
          sportSet.add(sportObj);
        });
      }

      if (edge.node.frontmatter.tags) {
        const { postType } = edge.node.fields;
        edge.node.frontmatter.tags.forEach(tag => {
          const tagObj = {
            tag,
            postType,
            tagType: "tags"
          };
          tagSet.add(tagObj);
        });
      }

      // Create post pages
      const nextID = index - 1 >= 0 ? index - 1 : posts.length - 1;
      const prevID = index + 1 < posts.length ? index + 1 : 0;
      const nextEdge = posts[nextID];
      const prevEdge = posts[prevID];
      const { postType } = edge.node.fields;
      const { slug } = edge.node.fields;

      // Assign templates to post types
      let currentPostTemplate;
      if (postType === "reads") {
        currentPostTemplate = bookTemplate;
      } else {
        currentPostTemplate = postTemplate;
      }

      createPage({
        path: `${postType}${slug}`,
        component: currentPostTemplate,
        context: {
          slug: edge.node.fields.slug,
          nextTitle: nextEdge.node.frontmatter.title,
          nextSlug: `${prevEdge.node.fields.postType}/${nextEdge.node.fields.slug}`,
          prevTitle: prevEdge.node.frontmatter.title,
          prevSlug: `${nextEdge.node.fields.postType}/${prevEdge.node.fields.slug}`
        }
      });
    });

    // Create category pages
    categorySet.forEach(categoryObj => {
      createPage({
        path: `${categoryObj.postType}/category/${_.kebabCase(
          categoryObj.category
        )}/`,
        component: categoryPage,
        context: categoryObj
      });
    });

    //  Create tag pages

    geographySet.forEach(geographyObj => {
      createPage({
        path: `${geographyObj.postType}/geography/${_.kebabCase(
          geographyObj.geography
        )}/`,
        component: tagPage,
        context: geographyObj
      });
    });

    periodSet.forEach(periodObj => {
      createPage({
        path: `${periodObj.postType}/period/${_.kebabCase(periodObj.period)}/`,
        component: tagPage,
        context: periodObj
      });
    });

    // periodDetailSet.forEach(periodDetailObj => {
    //   createPage({
    //     path: `${periodDetailObj.postType}/periodDetail/${_.kebabCase(
    //       periodDetailObj.periodDetail
    //     )}/`,
    //     component: tagPage,
    //     context: periodDetailObj
    //   });
    // });

    genreSet.forEach(genreObj => {
      createPage({
        path: `${genreObj.postType}/genre/${_.kebabCase(genreObj.genre)}/`,
        component: tagPage,
        context: genreObj
      });
    });

    sportSet.forEach(sportObj => {
      createPage({
        path: `${sportObj.postType}/sport/${_.kebabCase(sportObj.sport)}/`,
        component: tagPage,
        context: sportObj
      });
    });
    tagSet.forEach(tagObj => {
      createPage({
        path: `${tagObj.postType}/tag/${_.kebabCase(tagObj.tag)}/`,
        component: tagPage,
        context: tagObj
      });
    });
  });
};
