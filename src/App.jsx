import "./App.css";
import React, { useState, useEffect } from "react";
import http from "axios";
import SignUp from "./components/SignUp";

function App() {
  // const [museum, setMuseum] = useState([]);
  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [isShown, setIsShown] = useState(true);

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

 const showArtworkDetails = () => {
   setIsShown((isShown) => !isShown);
 };

  // Cleveland API
  const loadCleveland = async(keyword) => {
    let imageData = [];

    const params = {
      q: keyword, // keyword from input
      limit: 20, // number of results
      has_image: 1 // it has an image
    };  
  
    const getImages = await http("https://openaccess-api.clevelandart.org/api/artworks", {params})
      .then((response) => {
        for (const artwork of response.data.data) {
          let creator = artwork.creators.length > 0 ? artwork.creators[0].description : "Unknown";
          const newImage = {
            image: artwork.images.web.url,
            id: artwork.id,
            title: artwork.title,
            creator: creator,
            date: artwork.creation_date,
            details: artwork.tombstone,
          }
          // const image = artwork.images.web.url;
          // const id = artwork.id;
          // const title = artwork.title;
          // const creator = artwork.creators[0].description;
          // const date = artwork.creation_date;
          // const details = artwork.tombstone;
          imageData.push(newImage);
        };
        console.log(imageData)
        setImagesOnLoad(imageData);
      })
      .catch((e) => {
        console.log("ERROR getting artwork data");
        console.log(e);
      });
  };

  const loadDetails = async(url) => {
    const getImages = await http(url)
      .then((response) => {
        // for (const artwork of response.data.data) {
        //   let creator = artwork.creators.length > 0 ? artwork.creators[0].description : "Unknown";
        //   const newImage = {
        //     image: artwork.images.web.url,
        //     id: artwork.id,
        //     title: artwork.title,
        //     creator: creator,
        //     date: artwork.creation_date,
        //     details: artwork.tombstone,
        //   }
        //   // const image = artwork.images.web.url;
        //   // const id = artwork.id;
        //   // const title = artwork.title;
        //   // const creator = artwork.creators[0].description;
        //   // const date = artwork.creation_date;
        //   // const details = artwork.tombstone;
        //   imageData.push(newImage);
        // };
        console.log(response);
      })
      .catch((e) => {
        console.log("ERROR getting artwork data");
        console.log(e);
      });
  }

  useEffect(() => {
    loadCleveland();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Art museum!</h1>
      <SignUp/>
      <input placeholder='Search' type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
      <button onClick={() => loadCleveland(keyword)}>KATTINTS</button>
      {/* {museum.length > 0 ? (
        museum.map((artwork, key) => (
          <div key="Kitalálod? A harmadik anyád">
            <p>{artwork.data.creditLine}</p>
            <p>{artwork.data.artistDisplayName}</p>
            <img src={artwork.data.primaryImageSmall} alt="Anyád" key="A másik anyád" />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )} */}
      {imagesOnLoad.map((img, i) => (
        <div key={i} onClick={showArtworkDetails}>
          <img src={img.image} alt="Anyád" key={i} />
          <div className={isShown ? "miniArt" : "detailedArt"}>
            <p>{img.title}</p>
          </div>
        </div>
        // <img src={img.image} alt="Anyád" key={i} onClick={(e) => loadDetails(`https://openaccess-api.clevelandart.org/api/artworks/?q=${e.target.title}`)}/>
      ))}
    </div>
  );
}

export default App;

/* 
https://openaccess-api.clevelandart.org/api/artworks/{id}
*/