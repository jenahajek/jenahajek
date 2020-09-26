import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
// import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";
import PostNav from "../components/PostNav";
import BookDetail from "../components/BookDetail";

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.mdx;
    const post = postNode.frontmatter;
    const { postType } = postNode.fields;
    const { body } = postNode;
    if (!post.id) {
      post.id = slug;
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className="row">
          <BookDetail post={post}>
            <MDXRenderer>{body}</MDXRenderer>
          </BookDetail>
        </div>
        <PostNav
          forwardsUrl={pageContext.nextSlug}
          forwardsTitle="&larr; Novější"
          backUrl="reads"
          backTitle="Zpět na výpis"
          backwardTitle="Starší &rarr;"
          backwardsUrl={pageContext.prevSlug}
        />

        {/* <div className="post-book">
          {post.thumbnail != null ? (
            <Image
              fluid={post.thumbnail.sharp.fluid}
              alt={post.title}
              className="book-detail__cover"
            />
          ) : (
            "¯_(ツ)_/¯"
            // <BookCoverFallback
            //     title={post.frontmatter.title}
            //     modifier="book-detail__cover"
            // />
          )}
          <h1>{post.title}</h1>
          {/* <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <p
            className="type-perex"
            dangerouslySetInnerHTML={{
              __html: post.excerpt
            }}
          />

          <MDXRenderer>{body}</MDXRenderer>
          <div className="post-meta">
            <PostTags tags={post.tags} postType={postType} />
          </div>
          {/* <Disqus postNode={postNode} />
          <Footer config={config} />
        </div> */}
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug2($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      excerpt
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
      }
      fields {
        slug
        date
        postType
      }
    }
  }
`;
