import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import PostListing from "../components/PostListing";
import BookListing from "../components/BookListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

class Listing extends React.Component {
  renderPaging() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
    const nextPage = `/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;
    const { postType } = this.props.data.allMdx.edges[0].node.fields;

    return pageCount > 1 ? (
      <div className="paging-container">
        {!isFirstPage && <Link to={`${postType}/${prevPage}`}>Previous</Link>}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          return (
            <Link
              key={`listing-page-${pageNum}`}
              to={pageNum === 1 ? `/${postType}/` : `/${postType}/${pageNum}/`}>
              {pageNum}
            </Link>
          );
        })}
        {!isLastPage && <Link to={`${postType}/${nextPage}`}>Next</Link>}
      </div>
    ) : null;
  }

  render() {
    const postEdges = this.props.data.allMdx.edges;
    const { postType } = postEdges[0].node.fields;
    return (
      <Layout>
        <div className="listing-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          {postType === "reads" ? (
            <>
              <div className="books-container">
                <BookListing postEdges={postEdges} />
              </div>
            </>
          ) : (
            <div className="row">
              <div className="content-wrapper">
                <h1>Frontend blog</h1>
                <PostListing postEdges={postEdges} />
              </div>
            </div>
          )}
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
  }
`;
