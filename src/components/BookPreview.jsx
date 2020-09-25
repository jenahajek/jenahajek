// Náhled knihy, který se mnohokrát zobrazí ve výpisu Bookshelf

import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
// import BookCoverFallback from "./BookCoverFallback";

const BookPreview = ({ post }) => {
  return (
    <Link
      to={`${post.postType}/${post.slug}`}
      key={post.title}
      className="book-preview">
      <article className="book-preview__item">
        {post.thumbnail != null ? (
          <Image
            fluid={post.thumbnail.sharp.fluid}
            alt={post.title}
            imgStyle={{
              objectFit: "contain",
              objectPosition: "bottom center"
            }}
            className="book-preview__thumbnail"
          />
        ) : (
          // <BookCoverFallback title={post.title} />
          <p>cover chybi</p>
        )}
        <div className="book-preview__desc">
          <h2 className="book-preview__title">{post.title}</h2>
          <ul className="book-preview__tag-list">
            {post.extraLabels !== undefined
              ? post.extraLabels.map((items, i) => (
                  <li key={i} className="book-preview__tag">
                    {items}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </article>
    </Link>
  );
};

export default BookPreview;
