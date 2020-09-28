import React from "react";

const searchInput = ({ handler }) => {
  return (
    <div className="search-input__container">
      <input
        className="search-input"
        type="text"
        aria-label="Search"
        placeholder="Hledat autora/název/tag..."
        onChange={handler}
      />
    </div>
  );
};

export default searchInput;
