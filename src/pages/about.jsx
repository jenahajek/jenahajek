import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import About from "../components/About";
import config from "../../data/SiteConfig";

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Helmet title={`About | ${config.siteTitle}`} />
          <About />
          <h1>about</h1>
        </div>
      </Layout>
    );
  }
}

export default AboutPage;
