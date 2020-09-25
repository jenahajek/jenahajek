import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";
import PostNav from "../components/PostNav";

export default class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allMdx.edges;
    const { postType } = postEdges[0].node.fields;
    return (
      <Layout>
        <div className="row">
          <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
          <h2>aaaa</h2>
          <PostListing postEdges={postEdges} />
          <h1>tag</h1>
        </div>
        <PostNav backUrl={`/${postType}`} backTitle="Zpět na výpis" />
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query SportPage($sport: String, $postType: String) {
    allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        frontmatter: { sport: { in: [$sport] } }
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
            sport
            cover
            date
          }
        }
      }
    }
  }
`;
