import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
// import BookCoverFallback from "../components/BookCoverFallback";
import List from "./List";

const BookDetail = ({ post, children }) => {
  return (
    <article className="book-detail">
      {post.thumbnail != null ? (
        <Image
          fluid={post.thumbnail.sharp.fluid}
          alt={post.title}
          className="book-detail__cover"
        />
      ) : (
        // <BookCoverFallback
        //   title={post.title}
        //   modifier="book-detail__cover"
        // />
        <p>book cover fallback</p>
      )}
      <h1 className="book-detail__title">{post.title}</h1>
      <div className="book-detail__content user-content">
        {post.excerpt != null ? (
          <span>
            <p
              className="type-perex"
              dangerouslySetInnerHTML={{
                __html: post.excerpt
              }}
            />
          </span>
        ) : null}
        {/* <MDXRenderer>{post.body}</MDXRenderer> */}
        {children}
      </div>
      <aside className="book-detail__meta">
        <p>{post.author != null ? <List items={post.author} /> : null}</p>

        {post.categories != null ? (
          <List items={post.categories} type="tag" />
        ) : null}
        {post.geography != null ? (
          <List items={post.geography} type="tag" />
        ) : null}
        {post.period != null ? (
          <List
            url={`/reads/tags/${post.period}`}
            items={post.period}
            type="tag"
          />
        ) : null}
        {post.genre != null ? <List items={post.genre} type="tag" /> : null}
        {post.sport != null ? (
          <List urlSlug="/reads/sport/" items={post.sport} type="tag" />
        ) : null}
        {post.tags != null ? (
          <List urlSlug="/reads/tag/" items={post.tags} type="tag" />
        ) : null}
      </aside>
    </article>
  );
};

export default BookDetail;
