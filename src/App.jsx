import "./App.css";
import React, { useState, useEffect } from "react";
import http from "axios";
import SignUp from "./components/SignUp";

function App() {
  const [museum, setMuseum] = useState([]);
  const [objectIds, setObjectIds] = useState([]);

  const loadMuseum = async () => {
    const responseFetch = await http.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");
    console.log("http response: ", responseFetch);
    // sanya: sztem tok folosleges az egesz "/objects" lekerest megcsinalni. mert mindossze egy hasznos info
    // van benne nekunk, az "objectIDs", ami egy sima array szamokkal 1-tol 477.967-ig, tehat semmi egyedi
    // nincs benne
    // helyette mondjuk csinalhatunk 2 opciot a landing page-en par kep megjelenitesere:
    // vagy egy search, pl.: https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=sunflowers
    // itt a "hasImage=true" eleve csak azokat keri le amiknel van img
    // vagy (pl.) 20 kulon http.get (mondjuk for ciklusban) az objects-en belul, "/objects/${id}"

    setObjectIds(responseFetch.data.objectIDs.slice(0, 20));

    // response.data ? response = response.filter(filt => filt.data.primaryImage.length > 1) : console.log("shit")
    // teaFilter(response);
  };

  console.log("roviditett array: ", objectIds);

  const teaFilter = async (resp) => {
    resp = await resp.filter((filt) => filt.data.primaryImage.length > 0);
    setMuseum(resp);
    console.log(museum);
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
        museum.map((muse, key) => (
          <div key="Kitalálod? A harmadik anyád">
            <p>{muse.data.creditLine}</p>
            <p>{muse.data.artistDisplayName}</p>
            <img src={muse.data.primaryImageSmall} alt="Anyád" key="A másik anyád" />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
