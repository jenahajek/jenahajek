import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
// import Disqus from "../components/Disqus/Disqus";
// import PostTags from "../components/PostTags";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";
import List from "../components/List";
import PostNav from "../components/PostNav";

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
          <div className="row">
            <div className="content-wrapper">
              <h1>{post.title}</h1>
              {/* <div dangerouslySetInnerHTML={{ __html: postNode.html }} /> */}
              <MDXRenderer>{body}</MDXRenderer>
              <div className="post-meta">
                {post.tags != null ? (
                  <List
                    urlSlug={`/${postType}/tag/`}
                    items={post.tags}
                    type="tag"
                  />
                ) : null}
              </div>
            </div>
            {/* <Disqus postNode={postNode} /> */}
          </div>
          <PostNav
            forwardsUrl={pageContext.nextSlug}
            forwardsTitle="&larr; Novější"
            backUrl={postType}
            backTitle="Zpět na výpis"
            backwardTitle="Starší &rarr;"
            backwardsUrl={pageContext.prevSlug}
          />
        </div>
        {/* <Footer config={config} /> */}
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
