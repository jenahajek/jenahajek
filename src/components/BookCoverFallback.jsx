import React from "react";

const BookCoverFallback = ({ title, modifier }) => {
  return (
    <div className={`book-cover-fallback ${modifier}`}>
      <h2 className="book-cover-fallback__title">{title}</h2>
    </div>
  );
};

export default BookCoverFallback;
