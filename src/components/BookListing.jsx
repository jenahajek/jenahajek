import React from "react";
import GridTile from "./GridTile";
import BookshelfTitle from "./BookshelfTitle";
import BookPreview from "./BookPreview";

class BookListing extends React.Component {
  getPostList() {
    const allBookPosts = [];
    this.props.postEdges.forEach(postEdge => {
      allBookPosts.push({
        postType: postEdge.node.fields.postType,
        slug: postEdge.node.fields.slug,
        timeToRead: postEdge.node.timeToRead,
        title: postEdge.node.frontmatter.title,
        subtitle: postEdge.node.frontmatter.subtitle,
        author: postEdge.node.frontmatter.author,
        date: postEdge.node.frontmatter.date,
        pageCount: postEdge.node.frontmatter.pageCount,
        status: postEdge.node.frontmatter.status,
        type: postEdge.node.frontmatter.type,
        language: postEdge.node.frontmatter.language,
        categories: postEdge.node.frontmatter.categories,
        geography: postEdge.node.frontmatter.geography,
        period: postEdge.node.frontmatter.period,
        periodDetail: postEdge.node.frontmatter.periodDetail,
        genre: postEdge.node.frontmatter.genre,
        sport: postEdge.node.frontmatter.sport,
        tags: postEdge.node.frontmatter.tags,
        excerpt: postEdge.node.frontmatter.excerpt,
        thumbnail: postEdge.node.frontmatter.thumbnail
      });
    });

    const readBooks = [];
    const unreadBooks = [];
    const readingBooks = [];
    const wishlistBooks = [];
    const garbageBooks = [];

    allBookPosts.reduce(
      (output, post) => {
        if (post.status.includes("reading")) {
          readingBooks.push(post);
        } else if (post.status.includes("read")) {
          readBooks.push(post);
        } else if (post.status.includes("unread")) {
          unreadBooks.push(post);
        } else if (post.status.includes("wishlist")) {
          wishlistBooks.push(post);
        } else if (post.status.includes("garbage")) {
          garbageBooks.push(post);
        }
      },
      [[], []]
    );

    const postList = {
      reading: {},
      read: {},
      unread: {},
      wishlist: {},
      garbage: {}
    };
    postList.reading.posts = readingBooks;
    postList.reading.label = "Rozečtené";
    postList.read.posts = readBooks;
    postList.read.label = "Přečtené";
    postList.unread.posts = unreadBooks;
    postList.unread.label = "Dostupné";
    postList.wishlist.posts = wishlistBooks;
    postList.wishlist.label = "Lákavé";
    postList.garbage.posts = garbageBooks;
    postList.garbage.label = "Zavržené";

    return postList;
  }

  render() {
    const postList = this.getPostList();
    const postGroups = [];
    Object.keys(postList).forEach(key => {
      postGroups.push(key);
    });
    return (
      <>
        {postGroups.map(postGroup => (
          <div key={postGroup}>
            <BookshelfTitle title={postList[postGroup].label} />
            {postList[postGroup].posts.length !== 0 ? (
              <GridTile>
                {postList[postGroup].posts.map(post => (
                  <BookPreview key={post.slug} post={post} />
                ))}
              </GridTile>
            ) : (
              // <Message>
              <p>V téhle kolonce teď nic není...</p>
              // </Message>
            )}
          </div>
        ))}
      </>
    );
  }
}

export default BookListing;
