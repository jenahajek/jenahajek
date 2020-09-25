import React from "react";
import { Link } from "gatsby";
import SiteNavItem from "./SiteNavItem";

const Introduction = () => {
  return (
    <nav className="site-nav">
      <ul className="site-nav__list">
        <SiteNavItem title="JéňaHájek.com" to="/" />
        <SiteNavItem title="Co čtu" to="/reads" />
        {/* <SiteNavItem title="Frontend" to="/frontend" /> */}
        <SiteNavItem title="O webu" to="/about-site" />
        {/* <SiteNavItem title="About" to="/about" />
        <SiteNavItem title="Styleguide" to="/styleguide" /> */}
      </ul>
    </nav>
  );
};

export default Introduction;
