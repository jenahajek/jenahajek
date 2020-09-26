import React from "react";
import { Link } from "gatsby";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        postType: postEdge.node.fields.postType,
        slug: postEdge.node.fields.slug,
        // tags: postEdge.node.frontmatter.tags,
        // cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        // date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt
        // timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <div key={post.title}>
            <Link to={`/${post.postType}${post.slug}`}>
              <h2 className="type-h4">{post.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
