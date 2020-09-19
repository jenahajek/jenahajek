import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../layout";
// import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./post.css";

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
        <div>
          <Helmet>
            <title>{`${post.title} | ${config.siteTitle}`}</title>
          </Helmet>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <div>
            <h1>{post.title}</h1>
            {/* <div dangerouslySetInnerHTML={{ __html: postNode.html }} /> */}
            <MDXRenderer>{body}</MDXRenderer>
            <div className="post-meta">
              <PostTags tags={post.tags} postType={postType} />
            </div>
            {/* <Disqus postNode={postNode} /> */}
            <Footer config={config} />
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        categories
        tags
      }
      fields {
        slug
        date
        postType
      }
    }
  }
`;
