import React from "react";
import { Link } from "gatsby";

const PostNav = ({
  forwardsUrl,
  forwardsTitle,
  backTitle,
  backUrl,
  backwardTitle,
  backwardsUrl
}) => {
  return (
    <div className="post-nav">
      {forwardsUrl != null ? (
        <Link
          to={`${forwardsUrl}`}
          data-key="37"
          className="post-nav__link post-nav__link--next">
          {forwardsTitle}
        </Link>
      ) : null}
      <Link to={`${backUrl}`} className="post-nav__link post-nav__link--back">
        {backTitle}
      </Link>
      {backwardsUrl != null ? (
        <Link
          to={`${backwardsUrl}`}
          data-key="39"
          className="post-nav__link post-nav__link--prev">
          {backwardTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default PostNav;
