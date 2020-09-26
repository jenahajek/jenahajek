import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";
import PostNav from "../components/PostNav";

export default class TagTemplate extends React.Component {
  render() {
    const { tag, tagType } = this.props.pageContext;
    const postEdges = this.props.data[tagType].edges;
    const { postType } = postEdges[0].node.fields;
    return (
      <Layout>
        <div className="row">
          <div className="content-wrapper">
            <Helmet
              title={`Příspěvky se štítkem "${tag}" | ${config.siteTitle}`}
            />
            <h1>Příspěvky se štítkem {tag}</h1>
            <PostListing postEdges={postEdges} />
          </div>
        </div>
        <PostNav backUrl={`${postType}`} backTitle="Zpět na výpis" />
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage(
    $geography: String
    $period: String
    $periodDetail: String
    $genre: String
    $sport: String
    $tag: String
    $postType: String
  ) {
    geographyTags: allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        frontmatter: { geography: { in: [$geography] } }
        fields: { postType: { eq: $postType } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            postType
          }
          excerpt
          timeToRead
          frontmatter {
            title
            geography
          }
        }
      }
    }
    periodTags: allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        frontmatter: { period: { in: [$period] } }
        fields: { postType: { eq: $postType } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            postType
          }
          excerpt
          timeToRead
          frontmatter {
            title
            period
          }
        }
      }
    }
    periodDetailTags: allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        frontmatter: { periodDetail: { in: [$periodDetail] } }
        fields: { postType: { eq: $postType } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            postType
          }
          excerpt
          timeToRead
          frontmatter {
            title
            periodDetail
          }
        }
      }
    }
    genreTags: allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        frontmatter: { genre: { in: [$genre] } }
        fields: { postType: { eq: $postType } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            postType
          }
          excerpt
          timeToRead
          frontmatter {
            title
            genre
          }
        }
      }
    }
    sportTags: allMdx(
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
          }
          excerpt
          frontmatter {
            title
            sport
          }
        }
      }
    }
    tags: allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
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
