import "./App.css";
import React, { useState, useEffect } from "react";
import http from "axios";
import SignUp from "./components/SignUp";

function App() {
  const [museum, setMuseum] = useState([]);

  const loadMuseum = async () => {
    // const responseFetch = await http.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");
    // console.log("http response: ", responseFetch);

    let images = [];

    for (let id = 1; id <= 50; id++) {
      const responseFetch = await http.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      images.push(responseFetch.data.primaryImage);
    };

    console.log(images);
    // teaFilter(response);

    // sanya: sztem tok folosleges az egesz "/objects" lekerest megcsinalni. mert mindossze egy hasznos info
    // van benne nekunk, az "objectIDs", ami egy sima array szamokkal 1-tol 477.967-ig, tehat semmi egyedi
    // nincs benne
    // helyette mondjuk csinalhatunk 2 opciot a landing page-en par kep megjelenitesere:
    // vagy egy search, pl.: https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=sunflowers
    // itt a "hasImage=true" eleve csak azokat keri le amiknel van img
    // vagy (pl.) 20 kulon http.get (mondjuk for ciklusban) az objects-en belul, "/objects/${id}"
  };

  const teaFilter = async (resp) => {
    resp = await resp.filter((filt) => filt.data.primaryImage.length > 0);
    setMuseum(resp);
    // console.log(museum);
  };

  useEffect(() => {
    loadMuseum();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Art museum!</h1>
      <SignUp/>
      <button onClick={() => loadMuseum()}>KATTINTS</button>
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
    </div>
  );
}

export default App;
