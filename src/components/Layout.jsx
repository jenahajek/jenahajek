import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import "../styles/common.scss";
import "../styles/components.scss";
import GuidelinesSwitch from "./GuidelinesSwitch";
import SiteNav from "./SiteNav";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout-container">
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        <SiteNav />
        {children}
        {/* <GuidelinesSwitch /> */}
      </div>
    );
  }
}
