import React from "react";
import { Link } from "gatsby";

const _ = require("lodash");

const List = ({ items, type, urlSlug }) => {
  const variant = type ? `list--${type}` : `list--base`;

  return (
    <ul className={`list ${variant}`}>
      {items.map((item, i) => (
        <li key={i} className="list__item">
          {urlSlug !== undefined ? (
            <Link to={`${urlSlug}/${_.kebabCase(item)}`}>{item}</Link>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
