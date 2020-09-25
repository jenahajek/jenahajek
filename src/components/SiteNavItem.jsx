import React from "react";
import { Link } from "gatsby";

const SiteNavListItem = ({ title, to }) => {
  return (
    <li className="site-nav__item">
      <Link to={to} className="site-nav__link">
        {title}
      </Link>
    </li>
  );
};

export default SiteNavListItem;
