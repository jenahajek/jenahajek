import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends React.Component {
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMdx.edges;
    return (
      <Layout>
        <div className="row">
          <div className="content-wrapper">
            <div className="category-container">
              <Helmet
                title={`Příspěvky v kategorii "${category}" | ${config.siteTitle}`}
              />
              <h1>Příspěvky v kategorii: {category}</h1>
              <PostListing postEdges={postEdges} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String, $postType: String) {
    allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        frontmatter: { categories: { in: [$category] } }
        fields: { postType: { eq: $postType } }
      }
    ) {
      totalCount
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
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
