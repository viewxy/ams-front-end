import "./App.css";
import React, { useState, useEffect } from "react";
import http from "axios";
import SignUp from "./components/SignUp";

function App() {
  const [museum, setMuseum] = useState([]);
  const [imagesOnLoad, setImagesOnLoad] = useState([]);

  /*
  const loadMuseum = async () => {
    // const responseFetch = await http.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");
    // console.log("http response: ", responseFetch);

    let images = [];
    for (let id = 1; id <= 50; id++) {
      const responseFetch = await http.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      images.push(responseFetch.data.primaryImage);
    };

    // az elso 50 id alapjan 50 db get request, de csak console.log-al mukodik egyenlore
    console.log(images);
    // teaFilter(images);
  };

  const teaFilter = async (resp) => {
    resp = await resp.filter((filt) => filt.data.primaryImage.length > 0);
    setMuseum(resp);
    // console.log(museum);
  };
  */

  // Cleveland API
  const loadCleveland = async() => {
    let images = [];

    const params = {
      q: "sunflower", // keyword from input
      limit: 20, // number of results
      has_image: 1 // it has an image
    };

    const getImages = await http("https://openaccess-api.clevelandart.org/api/artworks", {params})
      .then((response) => {
        for (const artwork of response.data.data) {
          const image = artwork.images.web.url;
          // const barmely masik data a keprol, pl.: ID
          images.push(image);
        };
        setImagesOnLoad(images);
      })
      .catch((e) => {
        console.log("ERROR getting artwork data");
        console.log(e);
      });
  };

  useEffect(() => {
    // loadMuseum();
    loadCleveland();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Art museum!</h1>
      <SignUp/>
      <button onClick={() => loadCleveland()}>KATTINTS</button>
      {museum.length > 0 ? (
        museum.map((artwork, key) => (
          <div key="Kitalálod? A harmadik anyád">
            <p>{artwork.data.creditLine}</p>
            <p>{artwork.data.artistDisplayName}</p>
            <img src={artwork.data.primaryImageSmall} alt="Anyád" key="A másik anyád" />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      {imagesOnLoad.map((img) => (
        <img src={img} alt="Anyád" />
      ))}
    </div>
  );
}

export default App;
