import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import http from "axios";
import Home from "./Home";

function Search({ getImages, goToNextPage, goToPreviousPage, changePage }) {
  let { q } = useParams();

  const [search, setSearch] = useState([]);

  const loadSearch = async () => {
    let searchworksData = [];
    const response = await http.get(
      `https://openaccess-api.clevelandart.org/api/artworks/search/${q}?indent=1`
    );
    for (const searchwork of response.data.data) {
      const newSearchwork = {
        image: searchwork.images.web.url,
        id: searchwork.id,
        title: searchwork.title,
      };
      searchworksData.push(newSearchwork);
    }

    setSearch(searchworksData);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Home
        search={search}
        setSearch={setSearch}
        loadSearch={loadSearch}
        getImages={getImages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        changePage={changePage}
      />
    </div>
  );
}

export default Search;
