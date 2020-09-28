// query na krmeni kniznich blog postu

import { graphql, useStaticQuery } from "gatsby";

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allPosts: allMdx(
        filter: { fields: { postType: { eq: "reads" } } }
        sort: { fields: [fields___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
              postType
              date
            }
            excerpt
            timeToRead
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
              thumbnail {
                sharp: childImageSharp {
                  fluid(maxHeight: 150) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              cover
              date
            }
          }
        }
      }
      allStatuses: allMdx(filter: { fields: { postType: { eq: "reads" } } }) {
        group(field: frontmatter___status) {
          fieldValue
          totalCount
        }
      }
      allTypes: allMdx(filter: { fields: { postType: { eq: "reads" } } }) {
        group(field: frontmatter___type) {
          fieldValue
          totalCount
        }
      }
      allLanguages: allMdx(filter: { fields: { postType: { eq: "reads" } } }) {
        group(field: frontmatter___language) {
          fieldValue
          totalCount
        }
      }
      allCategories: allMdx(filter: { fields: { postType: { eq: "reads" } } }) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
      allSubcategoryGeography: allMdx(
        filter: { fields: { postType: { eq: "reads" } } }
      ) {
        group(field: frontmatter___geography) {
          fieldValue
          totalCount
        }
      }
      allSubcategoryPeriod: allMdx(
        sort: { order: ASC, fields: frontmatter___period }
        filter: { fields: { postType: { eq: "reads" } } }
      ) {
        group(field: frontmatter___period) {
          fieldValue
          totalCount
        }
      }
      allSubcategoryGenre: allMdx(
        filter: { fields: { postType: { eq: "reads" } } }
      ) {
        group(field: frontmatter___genre) {
          fieldValue
          totalCount
        }
      }
      allSubcategorySport: allMdx(
        filter: { fields: { postType: { eq: "reads" } } }
      ) {
        group(field: frontmatter___sport) {
          fieldValue
          totalCount
        }
      }
      allTags: allMdx(filter: { fields: { postType: { eq: "reads" } } }) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const allBooks = data.allPosts.edges.map(post => ({
    title: post.node.frontmatter.title,
    postType: post.node.fields.postType,
    slug: post.node.fields.slug,
    author: post.node.frontmatter.author,
    date: post.node.frontmatter.date,
    status: post.node.frontmatter.status,
    language: post.node.frontmatter.language,
    type: post.node.frontmatter.type,
    categories: post.node.frontmatter.categories,
    geography: post.node.frontmatter.geography,
    period: post.node.frontmatter.period,
    genre: post.node.frontmatter.genre,
    sport: post.node.frontmatter.sport,
    tags: post.node.frontmatter.tags,
    thumbnail: post.node.frontmatter.thumbnail,
    excerpt: post.node.excerpt
  }));

  const allStatuses = data.allStatuses.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));

  const allTypes = data.allTypes.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));

  const allLanguages = data.allLanguages.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));

  let allCategories = data.allCategories.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));
  allCategories = allCategories.sort((a, b) => (a.count < b.count ? 1 : -1));

  let allSubcategoryGeography = data.allSubcategoryGeography.group.map(
    item => ({
      value: item.fieldValue,
      count: item.totalCount
    })
  );
  allSubcategoryGeography = allSubcategoryGeography.sort((a, b) =>
    a.count < b.count ? 1 : -1
  );

  let allSubcategoryPeriod = data.allSubcategoryPeriod.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));
  allSubcategoryPeriod = allSubcategoryPeriod.sort((a, b) =>
    a.count < b.count ? 1 : -1
  );

  let allSubcategoryGenre = data.allSubcategoryGenre.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));
  allSubcategoryGenre = allSubcategoryGenre.sort((a, b) =>
    a.count < b.count ? 1 : -1
  );

  let allSubcategorySport = data.allSubcategorySport.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));
  allSubcategorySport = allSubcategorySport.sort((a, b) =>
    a.count < b.count ? 1 : -1
  );

  let allTags = data.allTags.group.map(item => ({
    value: item.fieldValue,
    count: item.totalCount
  }));

  allTags = allTags.sort((a, b) => (a.count < b.count ? 1 : -1));

  return {
    allBooks,
    allStatuses,
    allTypes,
    allLanguages,
    allCategories,
    allSubcategoryGeography,
    allSubcategoryPeriod,
    allSubcategoryGenre,
    allSubcategorySport,
    allTags
  };
};

export default usePosts;

// const usePosts = () => {
//     const data = useStaticQuery(graphql`
//         query {
//             all: allMdx(
//                 sort: { order: DESC, fields: frontmatter___date }
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 edges {
//                     node {
//                         frontmatter {
//                             date
//                         }
//                     }
//                 }
//                 nodes {
//                     frontmatter {
//                         slug
//                         title
//                         author
//                         date
//                         status
//                         type
//                         language
//                         categories
//                         geography
//                         period
//                         genre
//                         sport
//                         tags
//                         thumbnail {
//                             sharp: childImageSharp {
//                                 fluid(maxHeight: 150) {
//                                     ...GatsbyImageSharpFluid_withWebp
//                                 }
//                             }
//                         }
//                     }
//                     excerpt
//                 }
//             }
//             allStatuses: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___status) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allTypes: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___type) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allLanguages: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___language) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allCategories: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___categories) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allSubcategoryGeography: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___geography) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allSubcategoryPeriod: allMdx(
//                 sort: {order: ASC, fields: frontmatter___period},
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___period) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allSubcategoryGenre: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___genre) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allSubcategorySport: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___sport) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//             allTags: allMdx(
//                 filter: { fields: { postType: { eq: "reads" } } }
//             ) {
//                 group(field: frontmatter___tags) {
//                 fieldValue
//                 totalCount
//                 }
//             }
//         }
//     `);

//     const allBooks = data.all.nodes.map(post => ({
//         slug: post.frontmatter.slug,
//         title: post.frontmatter.title,
//         author: post.frontmatter.author,
//         date: post.frontmatter.date,
//         status: post.frontmatter.status,
//         language: post.frontmatter.language,
//         type: post.frontmatter.type,
//         categories: post.frontmatter.categories,
//         geography: post.frontmatter.geography,
//         period: post.frontmatter.period,
//         genre: post.frontmatter.genre,
//         sport: post.frontmatter.sport,
//         tags: post.frontmatter.tags,
//         thumbnail: post.frontmatter.thumbnail,
//         excerpt: post.excerpt
//     }));

//     const allStatuses = data.allStatuses.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));

//     const allTypes = data.allTypes.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));

//     const allLanguages = data.allLanguages.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));

//     let allCategories = data.allCategories.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));
//     allCategories = allCategories.sort((a, b) => (a.count < b.count ? 1 : -1));

//     let allSubcategoryGeography = data.allSubcategoryGeography.group.map(
//         item => ({
//             value: item.fieldValue,
//             count: item.totalCount
//         })
//     );
//     allSubcategoryGeography = allSubcategoryGeography.sort((a, b) =>
//         a.count < b.count ? 1 : -1
//     );

//     let allSubcategoryPeriod = data.allSubcategoryPeriod.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));
//     allSubcategoryPeriod = allSubcategoryPeriod.sort((a, b) =>
//         a.count < b.count ? 1 : -1
//     );

//     let allSubcategoryGenre = data.allSubcategoryGenre.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));
//     allSubcategoryGenre = allSubcategoryGenre.sort((a, b) =>
//         a.count < b.count ? 1 : -1
//     );

//     let allSubcategorySport = data.allSubcategorySport.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));
//     allSubcategorySport = allSubcategorySport.sort((a, b) =>
//         a.count < b.count ? 1 : -1
//     );

//     let allTags = data.allTags.group.map(item => ({
//         value: item.fieldValue,
//         count: item.totalCount
//     }));

//     allTags = allTags.sort((a, b) => (a.count < b.count ? 1 : -1));

//     return {
//         allBooks,
//         allStatuses,
//         allTypes,
//         allLanguages,
//         allCategories,
//         allSubcategoryGeography,
//         allSubcategoryPeriod,
//         allSubcategoryGenre,
//         allSubcategorySport,
//         allTags
//     };
// };

// export default usePosts;
