import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import AvatarImage from "../components/AvatarImage";
import Introduction from "../components/Introduction";
import config from "../../data/SiteConfig";

class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`${config.siteTitle}`} />

        <div className="temp-holder-center">
          <AvatarImage />
          <Introduction title="Ahoj, jmenuju se Jéňa Hájek">
            <p>
              a jsem frontendista. Baví mě spolupráce na smysluplných projektech
              a ten pocit, když mi po rukama roste kód a na displeji vzniká
              obraz přesně podle mých představ. Pokud zrovna nic{" "}
              <Link to="/about-site">neťukám do klávesnice</Link>, asi{" "}
              {/* <Link to="/frontend">se něco učím</Link>,{" "} */}
              <Link to="/reads">jsem zanořen v knihách</Link>, na cestách nebo
              možná{" "}
              <a
                href="https://jenahajek.github.io/otob-2019/"
                target="_blank"
                rel="noreferrer noopener">
                jezdím na kole
              </a>
              .
            </p>
            <p>
              Chcete-li se mnou něco probrat,{" "}
              <a href="mailto:jena.hajek@gmail.com">ozvěte se mi</a>. :)
            </p>
          </Introduction>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
