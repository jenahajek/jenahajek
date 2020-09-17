const config = {
  siteTitle: "JenaHajek.com", // Site title.
  siteTitleShort: "jenahajek", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Jena Hajek, Frontend dev", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://jenahajek.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "About things I create and reasoning behind it", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  //   siteRssTitle: "", // Title of the RSS feed
  //   siteFBAppID: "", // FB Application ID for using app insights
  //   googleAnalyticsID: "", // "UA-47311644-5", // GA tracking ID.
  //   disqusShortname: "", // "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  postsPerPage: 4, // Amount of posts displayed per listing page.
  userName: "Jéňa Hájek", // Username to display in the author segment.
  userEmail: "jena.hajek@gmail.com", // Email used for RSS feed's author segment
  //   userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  //   userLocation: "", // User location to display in the author segment.
  //   userAvatar: "", // "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  //   userDescription: "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    // {
    //   label: "GitHub",
    //   url: "https://github.com/Vagr9K/gatsby-advanced-starter",
    //   iconClassName: "fa fa-github"
    // },
    // {
    //   label: "Twitter",
    //   url: "https://twitter.com/Vagr9K",
    //   iconClassName: "fa fa-twitter"
    // },
    {
      label: "Email",
      url: "mailto:jena.hajek@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2020 jenahajek", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
