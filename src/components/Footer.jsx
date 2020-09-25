import React, { Component } from "react";
import { Link } from "gatsby";

class Footer extends Component {
  render() {
    const { config } = this.props;
    // const url = config.siteRss;
    const { copyright } = config;
    if (!copyright) {
      return null;
    }
    return (
      <footer className="footer">
        <small>{copyright}</small>

        {/* <Link to={url}>
            <button type="button"> Subscribe</button>
          </Link> */}
      </footer>
    );
  }
}

export default Footer;
