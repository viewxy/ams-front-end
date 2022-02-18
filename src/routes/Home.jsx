import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "axios";

const Home = ({ setDetails }) => {
  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [skipCount, setSkipCount] = useState(0);
  const [counter, setCounter] = useState(0);

  // const [isShown, setIsShown] = useState(true);

  // const [page, setPage] = useState(0);

  const [isFetching, setIsFetching] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  // Cleveland API
  const loadCleveland = async (keyword) => {
    let artworkData = [];
    const params = {
      q: keyword, // keyword from input
      limit: 20, // number of results
      has_image: 1, // it has an image
      skip: skipCount,
      // page: page,
    };

    const getImages = await http(
      "https://openaccess-api.clevelandart.org/api/artworks",
      { params }
    )
      .then((response) => {
        // if (response.data.data.length === 0) {
        //   setCounter(counter - 1);
        //   setSkipCount(counter * 20);
        //   return loadCleveland();
        // }
        console.log(response.data.data);
        for (const artwork of response.data.data) {
          let creator =
            artwork.creators.length > 0
              ? artwork.creators[0].description
              : "Unknown";
          const newArtwork = {
            image: artwork.images.web.url,
            id: artwork.id,
            title: artwork.title,
            creator: creator,
            date: artwork.creation_date,
            details: artwork.tombstone,
            funFact: artwork.fun_fact,
            technique: artwork.technique,
          };
          artworkData.push(newArtwork);

          // console.log(newArtwork)
        }
      })
      // .then((response) => {
      // setImagesOnLoad((prevImages) => {
      //   return [
      //     ...new Set([...prevImages, ...artworkData.map((b) => b.title)]),
      //   ];
      // });
      // setPage((prevPageNumber) => prevPageNumber + 1);
      // setHasMore(response.data.data > 0);
      // setIsFetching(false);
      // setImagesOnLoad(response.data.data);
      // })

      .catch((e) => {
        console.log("ERROR getting artwork data");
        console.log(e);
      });
    setImagesOnLoad(artworkData);
  };

  // function loadMoreItems() {
  //   setIsFetching(true);

  //   //mocking an API call
  //   setTimeout(() => {
  //     setImagesOnLoad((prevState) => [
  //       ...prevState,
  //       ...Array.from(Array(20).keys(), (n) => n + prevState.length + 1),
  //     ]);
  //     setIsFetching(false);
  //   }, 2000);
  // }

  // const showArtworkDetails = () => {
  //   setIsShown((isShown) => !isShown);
  // };

  const storeDetails = (img) => {
    setDetails(img); // local storage eseten ez mar lehet nem is kell, de talan jo lesz meg ez a http.post-hoz
    localStorage.setItem("img", img.image);
    localStorage.setItem("creator", img.creator);
    localStorage.setItem("id", img.id);
    localStorage.setItem("title", img.title);
    localStorage.setItem("creation_date", img.date);
    localStorage.setItem("technique", img.technique);
    localStorage.setItem("funFact", img.funFact);
    localStorage.setItem("search", keyword);
  };

  let up = 0;
  const pageCountUp = () => {
    up++;
    setCounter(up);
    setSkipCount(counter * 20);
    loadCleveland();
    console.log(skipCount);
  };

  const pageCountDown = () => {
    if (counter === 0) {
      return setSkipCount(0);
    }
    setCounter(counter - 1);
    setSkipCount(counter * 20);
    loadCleveland();
    console.log(skipCount);
  };

  useEffect(() => {
    pageCountUp();
    pageCountDown();
    loadCleveland();
  }, []);

  return (
    <div>
      <input
        placeholder="Search"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={() => loadCleveland(keyword)}>KATTINTS</button>
      <div className="main">
        {imagesOnLoad.map((img, i) => (
          <div key={i}>
            <Link to="/imageDetails">
              <img
                src={img.image}
                onClick={() => storeDetails(img)}
                alt="Anyád"
              />
            </Link>
            <p>{img.title}</p>
          </div>
        ))}
      </div>
      <button onClick={() => pageCountDown()}>&#9754;</button>
      <button onClick={() => pageCountUp()}>&#9755;</button>
      {/* {isFetching && <p>Fetching items...</p>}
      {!isFetching && <button onClick={loadMoreItems}>Load more</button>} */}
    </div>
  );
};

export default Home;
