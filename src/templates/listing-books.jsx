import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Accordion from "../components/Accordion";
import BookListing from "../components/BookListing";
import FormCheckbox from "../components/FormCheckbox";
import SearchInput from "../components/SearchInput";
import SEO from "../components/SEO";
import getData from "../hooks/get-data-books";
import config from "../../data/SiteConfig";
import SimpleRemoveIco from "../svg/simple-remove.svg";
import FilterIco from "../svg/filter.svg";

const ListingBook = () => {
  //-----------------------------------------
  // get data
  //-----------------------------------------
  const {
    allBooks,
    allStatuses,
    allTypes,
    allLanguages,
    allCategories,
    allSubcategoryGeography,
    allSubcategoryPeriod,
    allSubcategoryGenre,
    allSubcategorySport,
    allTags
  } = getData();

  //-----------------------------------------
  // set states
  //-----------------------------------------
  const [query, setQuery] = useState("");
  const [statusItems, setStatusItems] = useState([]);
  const [typeItems, setTypeItems] = useState([]);
  const [languageItems, setLanguageItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [subcategoryGeographyItems, setSubcategoryGeographyItems] = useState(
    []
  );
  const [subcategoryPeriodItems, setSubcategoryPeriodItems] = useState([]);
  const [subcategoryGenreItems, setSubcategoryGenreItems] = useState([]);
  const [subcategorySportItems, setSubcategorySportItems] = useState([]);
  const [tagItems, setTagItems] = useState([]);
  const [filterState, setFilterState] = useState("is-closed");

  const toggleShowFilter = () => {
    const currentFilterState =
      filterState === "is-closed" ? "is-open" : "is-closed";
    setFilterState(currentFilterState);
    localStorage.setItem("userFilterState", currentFilterState);
  };

  useEffect(() => {
    setFilter();
  }, []);

  // check for user settings on load and init it
  const setFilter = () => {
    const userFilterState =
      localStorage.getItem("userFilterState") !== null
        ? localStorage.getItem("userFilterState")
        : "is-closed";
    setFilterState(userFilterState);
    localStorage.setItem("userFilterState", userFilterState); // add this
  };

  //-----------------------------------------
  // state handling
  //-----------------------------------------
  const handleInputChange = event => {
    setQuery(event.target.value);
  };
  const handleStatusChange = event => {
    setStatusItems(
      event.target.checked
        ? statusItems.concat([event.target.value])
        : statusItems.filter(value => value !== event.target.value)
    );
  };
  const handleTypeChange = event => {
    setTypeItems(
      event.target.checked
        ? typeItems.concat([event.target.value])
        : typeItems.filter(value => value !== event.target.value)
    );
  };
  const handleLanguageChange = event => {
    setLanguageItems(
      event.target.checked
        ? languageItems.concat([event.target.value])
        : languageItems.filter(value => value !== event.target.value)
    );
  };
  const handleCategoryChange = event => {
    setCategoryItems(
      event.target.checked
        ? categoryItems.concat([event.target.value])
        : categoryItems.filter(value => value !== event.target.value)
    );
  };
  const handleSubcategoryGeographyChange = event => {
    setSubcategoryGeographyItems(
      event.target.checked
        ? tagItems.concat([event.target.value])
        : tagItems.filter(value => value !== event.target.value)
    );
  };
  const handleSubcategoryPeriodChange = event => {
    setSubcategoryPeriodItems(
      event.target.checked
        ? tagItems.concat([event.target.value])
        : tagItems.filter(value => value !== event.target.value)
    );
  };
  const handleSubcategoryGenreChange = event => {
    setSubcategoryGenreItems(
      event.target.checked
        ? tagItems.concat([event.target.value])
        : tagItems.filter(value => value !== event.target.value)
    );
  };
  const handleSubcategorySportChange = event => {
    setSubcategorySportItems(
      event.target.checked
        ? tagItems.concat([event.target.value])
        : tagItems.filter(value => value !== event.target.value)
    );
  };
  const handleTagChange = event => {
    setTagItems(
      event.target.checked
        ? tagItems.concat([event.target.value])
        : tagItems.filter(value => value !== event.target.value)
    );
  };

  //-----------------------------------------
  //
  //-----------------------------------------
  // if user checks category, return only posts from given categories
  const currentPosts = allBooks.filter(post => {
    const { categories, tags } = post;
    const currentPost = post;

    return tags != null
      ? categoryItems.length !== 0
        ? categories != null
          ? categories.some(element => categoryItems.indexOf(element) >= 0)
            ? tags.some(element => currentPost.tags.indexOf(element) >= 0)
            : false
          : (post.extraLabels = ["kategorie není"])
        : true
      : false;
  });
  const currentPostsGeography = allBooks.filter(post => {
    const { categories, geography } = post;
    const currentPost = post;

    return geography != null
      ? categoryItems.length !== 0
        ? categories != null
          ? categories.some(element => categoryItems.indexOf(element) >= 0)
            ? geography.some(
                element => currentPost.geography.indexOf(element) >= 0
              )
            : false
          : (post.extraLabels = ["kategorie není"])
        : true
      : false;
  });
  const currentPostsPeriod = allBooks.filter(post => {
    const { categories, period } = post;
    const currentPost = post;

    return period != null
      ? categoryItems.length !== 0
        ? categories != null
          ? categories.some(element => categoryItems.indexOf(element) >= 0)
            ? period.some(element => currentPost.period.indexOf(element) >= 0)
            : false
          : (post.extraLabels = ["kategorie není"])
        : true
      : false;
  });
  const currentPostsGenre = allBooks.filter(post => {
    const { categories, genre } = post;
    const currentPost = post;

    return genre != null
      ? categoryItems.length !== 0
        ? categories != null
          ? categories.some(element => categoryItems.indexOf(element) >= 0)
            ? genre.some(element => currentPost.genre.indexOf(element) >= 0)
            : false
          : (post.extraLabels = ["kategorie není"])
        : true
      : false;
  });
  const currentPostsSport = allBooks.filter(post => {
    const { categories, sport } = post;
    const currentPost = post;

    return sport != null
      ? categoryItems.length !== 0
        ? categories != null
          ? categories.some(element => categoryItems.indexOf(element) >= 0)
            ? sport.some(element => currentPost.sport.indexOf(element) >= 0)
            : false
          : (post.extraLabels = ["kategorie není"])
        : true
      : false;
  });

  //-----------------------------------------
  //
  //-----------------------------------------
  // get out all tags which are used in those filtered posts
  const categoryTags = currentPosts.reduce((acc, item) => {
    item.tags.forEach(tag => {
      acc.push(tag);
    });
    return acc;
  }, []);
  const categorySubcategoryGeographyTags = currentPostsGeography.reduce(
    (acc, item) => {
      item.geography.forEach(tag => {
        acc.push(tag);
      });
      return acc;
    },
    []
  );
  const categorySubcategoryPeriodTags = currentPostsPeriod.reduce(
    (acc, item) => {
      item.period.forEach(tag => {
        acc.push(tag);
      });
      return acc;
    },
    []
  );
  const categorySubcategoryGenreTags = currentPostsGenre.reduce((acc, item) => {
    item.genre.forEach(tag => {
      acc.push(tag);
    });
    return acc;
  }, []);
  const categorySubcategorySportTags = currentPostsSport.reduce((acc, item) => {
    item.sport.forEach(tag => {
      acc.push(tag);
    });
    return acc;
  }, []);

  // find unique ones and count its occurences
  const currentPostsTags = categoryTags.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  const currentPostsSubcategoryGeographyTags = categorySubcategoryGeographyTags.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {}
  );
  const currentPostsSubcategoryPeriodTags = categorySubcategoryPeriodTags.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {}
  );
  const currentPostsSubcategoryGenreTags = categorySubcategoryGenreTags.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {}
  );
  const currentPostsSubcategorySportTags = categorySubcategorySportTags.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {}
  );

  // transform the array with tags to this format:
  // [ {value: 'xyz', count: 'x'}, {...} ]
  let relevantTags = [];
  for (var key in currentPostsTags) {
    if (currentPostsTags.hasOwnProperty(key)) {
      const obj = {
        value: key,
        count: currentPostsTags[key]
      };
      relevantTags.push(obj);
    }
  }
  relevantTags = relevantTags.sort((a, b) => (a.count < b.count ? 1 : -1));

  let relevantSubcategoryGeographyTags = [];
  for (var key in currentPostsSubcategoryGeographyTags) {
    if (currentPostsSubcategoryGeographyTags.hasOwnProperty(key)) {
      const obj = {
        value: key,
        count: currentPostsSubcategoryGeographyTags[key]
      };
      relevantSubcategoryGeographyTags.push(obj);
    }
  }
  relevantSubcategoryGeographyTags = relevantSubcategoryGeographyTags.sort(
    (a, b) => (a.count < b.count ? 1 : -1)
  );

  let relevantSubcategoryPeriodTags = [];
  for (var key in currentPostsSubcategoryPeriodTags) {
    if (currentPostsSubcategoryPeriodTags.hasOwnProperty(key)) {
      const obj = {
        value: key,
        count: currentPostsSubcategoryPeriodTags[key]
      };
      relevantSubcategoryPeriodTags.push(obj);
    }
  }
  relevantSubcategoryPeriodTags = relevantSubcategoryPeriodTags.sort((a, b) =>
    a.value < b.value ? -1 : 1
  );

  let relevantSubcategoryGenreTags = [];
  for (var key in currentPostsSubcategoryGenreTags) {
    if (currentPostsSubcategoryGenreTags.hasOwnProperty(key)) {
      const obj = {
        value: key,
        count: currentPostsSubcategoryGenreTags[key]
      };
      relevantSubcategoryGenreTags.push(obj);
    }
  }
  relevantSubcategoryGenreTags = relevantSubcategoryGenreTags.sort((a, b) =>
    a.count < b.count ? 1 : -1
  );

  let relevantSubcategorySportTags = [];
  for (var key in currentPostsSubcategorySportTags) {
    if (currentPostsSubcategorySportTags.hasOwnProperty(key)) {
      const obj = {
        value: key,
        count: currentPostsSubcategorySportTags[key]
      };
      relevantSubcategorySportTags.push(obj);
    }
  }
  relevantSubcategorySportTags = relevantSubcategorySportTags.sort((a, b) =>
    a.count < b.count ? 1 : -1
  );

  //-----------------------------------------
  //
  //-----------------------------------------

  const filteredData = allBooks.filter(post => {
    const {
      title,
      author,
      status,
      type,
      language,
      categories,
      geography,
      period,
      genre,
      sport,
      tags
    } = post;
    return (
      (title.toLowerCase().includes(query.toLowerCase()) ||
        author
          .join("")
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (statusItems.length !== 0
        ? status != null
          ? status.some(element => statusItems.indexOf(element) >= 0)
          : (post.extraLabels = ["status neznámý"])
        : true) &&
      (typeItems.length !== 0
        ? type != null
          ? type.some(element => typeItems.indexOf(element) >= 0)
          : (post.extraLabels = ["nespecifikováno"])
        : true) &&
      (languageItems.length !== 0
        ? language != null
          ? language.some(element => languageItems.indexOf(element) >= 0)
          : (post.extraLabels = ["Jazyk nevyplněn"])
        : true) &&
      (categoryItems.length !== 0
        ? categories != null
          ? categories.some(element => categoryItems.indexOf(element) >= 0)
          : (post.extraLabels = ["kategorie není"])
        : true) &&
      (subcategoryGeographyItems.length !== 0
        ? geography != null
          ? geography.some(
              element => subcategoryGeographyItems.indexOf(element) >= 0
            )
          : false
        : true) &&
      (subcategoryPeriodItems.length !== 0
        ? period != null
          ? period.some(element => subcategoryPeriodItems.indexOf(element) >= 0)
          : false
        : true) &&
      (subcategoryGenreItems.length !== 0
        ? genre != null
          ? genre.some(element => subcategoryGenreItems.indexOf(element) >= 0)
          : false
        : true) &&
      (subcategorySportItems.length !== 0
        ? sport != null
          ? sport.some(element => subcategorySportItems.indexOf(element) >= 0)
          : false
        : true) &&
      (tagItems.length !== 0
        ? tags != null
          ? tags.some(element => tagItems.indexOf(element) >= 0)
          : false
        : true)
    );
  });

  const readBooks = [];
  const unreadBooks = [];
  const readingBooks = [];
  const wishlistBooks = [];
  const garbageBooks = [];

  filteredData.reduce(
    (output, post) => {
      if (post.status !== null) {
        if (post.status.includes("reading")) {
          readingBooks.push(post);
        } else if (post.status.includes("read")) {
          readBooks.push(post);
        } else if (post.status.includes("unread")) {
          unreadBooks.push(post);
        } else if (post.status.includes("wishlist")) {
          wishlistBooks.push(post);
        } else if (post.status.includes("garbage")) {
          garbageBooks.push(post);
        }
      } else {
        console.warn(`${post.title} nemá vyplněný status. Tak pozor na to.`);
      }
    },
    [[], []]
  );

  const postList = {
    reading: {},
    read: {},
    unread: {},
    wishlist: {},
    garbage: {}
  };
  postList.reading.posts = readingBooks;
  postList.reading.label = "Rozečtené";
  postList.read.posts = readBooks;
  postList.read.label = "Přečtené";
  postList.unread.posts = unreadBooks;
  postList.unread.label = "Dostupné";
  postList.wishlist.posts = wishlistBooks;
  postList.wishlist.label = "Lákavé";
  postList.garbage.posts = garbageBooks;
  postList.garbage.label = "Zavržené";

  // render() {
  // const { allStatuses } = getData();
  // const postList = this.getPostList();
  const postGroups = [];
  Object.keys(postList).forEach(key => {
    postGroups.push(key);
  });

  // const postEdges = ;
  // const { postType } = postEdges[0].node.fields;

  return (
    <Layout>
      <div className="listing-books-container">
        <Helmet title={config.siteTitle} />
        <SEO />
        <div className="books-container">
          {postGroups.map(postGroup => (
            <>
              <Accordion
                title={postList[postGroup].label}
                label=""
                initialState={postGroup === "read" || "reading"}
                state="">
                <BookListing
                  key={postGroup}
                  postGroup={postGroup}
                  postList={postList}
                />
              </Accordion>
            </>
          ))}
        </div>
        <form className={`filter ${filterState}`}>
          <button
            onClick={toggleShowFilter}
            type="button"
            className="filter__toggle">
            <FilterIco className="filter__icon filter__icon--open" />
            <SimpleRemoveIco className="filter__icon filter__icon--close" />
            <span className="u-vhide">Filtr</span>
          </button>
          <div className="filter__group-wrapper">
            <div className="filter__group">
              <SearchInput handler={handleInputChange} />
            </div>
            <Accordion
              title="Kategorie"
              label="categoryLegend"
              state={categoryItems}>
              {allCategories.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleCategoryChange}
                  checked={categoryItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion
              title="Lokalita"
              label="geographyLegend"
              state={subcategoryGeographyItems}>
              {relevantSubcategoryGeographyTags.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleSubcategoryGeographyChange}
                  checked={subcategoryGeographyItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion
              title="Období"
              label="periodLegend"
              state={subcategoryPeriodItems}>
              {relevantSubcategoryPeriodTags.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleSubcategoryPeriodChange}
                  checked={subcategoryPeriodItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion
              title="Žánr"
              label="genreLegend"
              state={subcategoryGenreItems}>
              {relevantSubcategoryGenreTags.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleSubcategoryGenreChange}
                  checked={subcategoryGenreItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion
              title="Sport"
              label="sportLegend"
              state={subcategorySportItems}>
              {relevantSubcategorySportTags.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleSubcategorySportChange}
                  checked={subcategorySportItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion title="Tagy" label="tagLegend" state={tagItems}>
              {relevantTags.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleTagChange}
                  checked={tagItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion title="Status" label="statusLegend" state={statusItems}>
              {allStatuses.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleStatusChange}
                  checked={statusItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion title="Formát" label="typeLegend" state={typeItems}>
              {allTypes.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleTypeChange}
                  checked={typeItems.includes(item.value)}
                />
              ))}
            </Accordion>

            <Accordion
              title="Jazyk"
              label="languageLegend"
              state={languageItems}>
              {allLanguages.map((item, i) => (
                <FormCheckbox
                  key={i}
                  item={item}
                  id={i}
                  onChange={handleLanguageChange}
                  checked={languageItems.includes(item.value)}
                />
              ))}
            </Accordion>
          </div>
        </form>
      </div>
    </Layout>
  );
};
// }

export default ListingBook;

/* eslint no-undef: "off" */
// export const listingBooksQuery = graphql`
//   query ListingBooksQuery($postType: String) {
//     allMdx(
//       filter: { fields: { postType: { eq: $postType } } }
//       sort: { fields: [fields___date], order: DESC }
//     ) {
//       edges {
//         node {
//           fields {
//             slug
//             postType
//             date
//           }
//           excerpt
//           timeToRead
//           frontmatter {
//             title
//             subtitle
//             author
//             date
//             pageCount
//             status
//             type
//             language
//             categories
//             geography
//             period
//             periodDetail
//             genre
//             sport
//             tags
//             excerpt
//             thumbnail {
//               sharp: childImageSharp {
//                 fluid(maxHeight: 150) {
//                   ...GatsbyImageSharpFluid_withWebp
//                 }
//               }
//             }
//             cover
//             date
//           }
//         }
//       }
//     }
//   }
// `;
