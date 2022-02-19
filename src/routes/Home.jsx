import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "axios";

const Home = ({ setDetails }) => {
  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(0);

  // const [page, setPage] = useState(0);

  const [isFetching, setIsFetching] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  function goToNextPage() {
    setCurrentPage((page) => page + 20)
    // console.log(currentPage);
  }
  
  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 20)
    }    
    // setCurrentPage((page) => page - 20)
    // console.log(currentPage);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent)
    setCurrentPage(pageNumber)
  }


  // Cleveland API
  const loadCleveland = async (keyword) => {
    let artworksData = [];
    const params = {
      q: keyword, // keyword from input
      limit: 20, // number of results
      has_image: 1, // it has an image
      skip: currentPage,
      // page: page,
    };

    const getImages = await http(
      "https://openaccess-api.clevelandart.org/api/artworks",
      { params }
    )
      .then((response) => {
        console.log(response.data.data);
        for (const artwork of response.data.data) {
          const newArtwork = {
            image: artwork.images.web.url,
            id: artwork.id,
            title: artwork.title
          };
          artworksData.push(newArtwork);
        }
      })
      // .then((response) => {
      // setImagesOnLoad((prevImages) => {
      //   return [
      //     ...new Set([...prevImages, ...artworksData.map((b) => b.title)]),
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
      setImagesOnLoad(artworksData);
      if (artworksData.length === 0) {
        setCurrentPage(currentPage - 20)
        // return loadCleveland();
      };
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

  // const pageCountUp = () => {
  //   setCounter(counter + 1);
  //   setSkipCount(counter * 20);
  //   // loadCleveland();
  //   console.log(skipCount);
  // };

  // const pageCountDown = () => {
  //   if (counter === 0) {
  //     return setSkipCount(0);
  //   }
  //   setCounter(counter - 1);
  //   setSkipCount(counter * 20);
  //   // loadCleveland();
  //   console.log(skipCount);
  // };

  useEffect(() => {
    console.log(currentPage);
    loadCleveland();
  }, [currentPage]);

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
          <div key={img.id}>
            <Link to={`/imageDetails/${img.id}`}>
              <img src={img.image} alt="Anyád"/>
            </Link>
            <p>{img.title}</p>
          </div>
        ))}
      </div>
      <button onClick={() => goToPreviousPage()} onChange={(event) => changePage(event)}>Down</button>
      <button onClick={() => goToNextPage()} onChange={(event) => changePage(event)}>Up</button>
      {/* {isFetching && <p>Fetching items...</p>}
      {!isFetching && <button onClick={loadMoreItems}>Load more</button>} */}
    </div>
  );
};

export default Home;

/*
NOT IN USE, replaced by /:id in url
  // const storeDetails = (img) => {
  //   setDetails(img); // local storage eseten ez mar lehet nem is kell, de talan jo lesz meg ez a http.post-hoz
  //   localStorage.setItem("img", img.image);
  //   localStorage.setItem("creator", img.creator);
  //   localStorage.setItem("id", img.id);
  //   localStorage.setItem("title", img.title);
  //   localStorage.setItem("creation_date", img.date);
  //   localStorage.setItem("technique", img.technique);
  //   localStorage.setItem("funFact", img.funFact);
  //   localStorage.setItem("search", keyword);
  // };
*/
