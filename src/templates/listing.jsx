import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./listing.css";

class Listing extends React.Component {
  renderPaging() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
    const nextPage = `/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;
    const { postType } = this.props.data.allMdx.edges[0].node.fields;

    return (
      <div className="paging-container">
        {!isFirstPage && <Link to={`${postType}/${prevPage}`}>Previous</Link>}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          return (
            <Link
              key={`listing-page-${pageNum}`}
              to={pageNum === 1 ? `/${postType}/` : `/${postType}/${pageNum}/`}>
              {pageNum}-{postType}
            </Link>
          );
        })}
        {!isLastPage && <Link to={`${postType}/${nextPage}`}>Next</Link>}
      </div>
    );
  }

  render() {
    const postEdges = this.props.data.allMdx.edges;

    return (
      <Layout>
        <div className="listing-container">
          <div className="posts-container">
            <Helmet title={config.siteTitle} />
            <SEO />
            <PostListing postEdges={postEdges} />
          </div>
          {this.renderPaging()}
        </div>
      </Layout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($postType: String, $skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { postType: { eq: $postType } } }
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
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
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
