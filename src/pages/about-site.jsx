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
          <Helmet title={`O tomto webu | ${config.siteTitle}`} />
          <div className="row">
            <div className="content-wrapper">
              <h1>O tomto webu</h1>
              <p>
                Tenhle web plní více účelů. Krom sdílení informací a myšlenkek
                ho používám i jako malou laboratoř. Zkouším si nové postupy,
                techniky nebo způsoby práce. Někdy objevím skvělé podněty a
                výhody, někdy se spálím a najdu slepou uličku. Poznatky si pak
                zapisuju sem. Můžu se k nim tak vracet a zároveň umožnit vám
                nakouknout trochu do zákulisí. :)
              </p>

              <h2>Kovářova kobyla</h2>
              <h3>25. 09. 2020</h3>
              <p>
                Vývojáři se, mimojiné, dají dělit podle toho, jak přistupují k
                tvorbě kódu. Trefně je to popsáno v oči otevírajícím článku{" "}
                <a
                  href="https://honzajavorek.cz/blog/kolonizatori-a-spravci-kolonii/"
                  target="_blank"
                  rel="noreferrer noopener">
                  Kolonizátoři a správci kolonií
                </a>
                , na který mě upozornil kolega Honza. Jasně jsem se shlédl v
                správcovské roli, která je ideální zejména pro větší projekty
                nebo tam, kde je jasně specifikovaný výsledek a cestu k němu si
                lze dobře rozvrhnout.
              </p>
              <p>
                Proto jsem v počáteční fázi musel opravdu zabrat. Při rozjíždění
                tohoto webu jsem si totiž uvědomoval, že situace je jiná. Měl
                jsem hrubou představu, co a jak chci udělat, ale taky jsem
                věděl, že mnoho důležitých podnětů teprve vyplave. Proto jsem se
                rozhodl pro iterativní vývoj. Rozhodl jsem se začít s{" "}
                <a
                  href="https://www.galandr.com/minimalni-zivotaschopny-produkt/"
                  target="_blank"
                  rel="noreferrer noopener">
                  MVP
                </a>
                .
              </p>
              <p>
                Cíleně jsem osekal sekce, omezil jsem ladění vizuálu a zakázal
                jsem si i optimalizovat kód. Zkrátka, situace si žádala
                kolonizování. Bývá mi to proti srsti, ale co se dalo dělat.
                Lepší nedokonalý a dnes, než dokonalý nikdy. Čas na vyladění
                přijde později.
              </p>
              <p>Zatím jsem připravil:</p>
              <ul>
                <li>
                  nakonfiguroval jsem prostředí - lintování a formátování kódu,
                  hlídání commitů atp.
                </li>
                <li>
                  rozjel jsem Gatsby a odrazil se od Advanced Starter Theme
                </li>
                <li>
                  přenastavil jsem Gatsbyho, abych ho mohl krmit{" "}
                  <code>mdx</code> soubory namísto obyč markdownu
                </li>
                <li>
                  přidal jsem podporu pro více typů obsahu - to se bude hodit a
                  potřeboval jsem to odladit, dokud na tom nevisí moc věcí
                </li>
                <li>
                  otypoval jsem vstupní data, aby Gatsby nemusel nic odvozovat a
                  hádat
                </li>
                <li>
                  přidal jsem kompilování SASSu a změnil způsob includování
                  stylů
                </li>
                <li>nahrál jsem články s knihami</li>
                <li>tu a tam něco dopsal</li>
                <li>nastavil jsem faviconku (ahoj Pepíku ;))</li>
                <li>na hrubo jsem to celé nastyloval</li>
                <li>nastavil jsem deploy přes netlify</li>
              </ul>

              <h3>26. 09. 2020</h3>
              <ul>
                <li>
                  Přidal jsem generování stránek pro kategorie a tagy&hellip;
                </li>
                <li>&hellip; a opravil nějaké drobnosti</li>
              </ul>

              <h3>27. 09. 2020</h3>
              <ul>
                <li>
                  Generování všech stránek s knihami a podpůrnými stránkami
                  trvá, protože už jich jsou stovky. Abych nestrávil zbytek
                  mládí koukáním na build, připravil jsem si menší set knih a
                  při vývoji pracuju jen s tím. Vypomohl jsem si envirnoment
                  proměnnými.
                </li>
                <li>
                  Odbavil jsem největší nedostatky responzivního zobrazení.
                  Pořád je tam hodně ke zlepšení, ale to nejpodstatnější je
                  podchycené.
                </li>
                <li>
                  Změnil jsem font, ale nechal jsem stále systémový, který
                  netřeba stahovat.
                </li>
                <li>Přidal jsem fallback pro případ chybějící obálky knížky</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AboutPage;
