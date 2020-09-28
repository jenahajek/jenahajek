import React from "react";
import GridTile from "./GridTile";
import BookshelfTitle from "./BookshelfTitle";
import BookPreview from "./BookPreview";

const BookListing = ({ postGroup, postList }) => {
  return (
    <>
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
    </>
  );
};

export default BookListing;
