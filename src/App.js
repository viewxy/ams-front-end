import './App.css';
import React, { useState, useEffect } from 'react';
import http from 'axios';

function App() {
  let [museum, setMuseum] = useState([]);

  const loadMuseum = async () => {
    let response = []
    let responseFetch = await http.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/400000')
    console.log(responseFetch)
    response.push(responseFetch)
    // response.data ? response = response.filter(filt => filt.data.primaryImage.length > 1) : console.log("shit")
    teaFilter(response)
  }

  const teaFilter = async (resp) => {
    resp = await resp.filter(filt => filt.data.primaryImage.length > 0)
    setMuseum(resp)
    console.log(museum)
  }

  useEffect(() => {
    loadMuseum();
  }, [])

  return (
    <div className="App">
      <h1>Welcome to Art museum!</h1>
      <button onClick={() => loadMuseum()}>KATTINTS</button>
      {museum.length > 0 ? museum.map((muse, key) => (
        <div key="Kitalálod? A harmadik anyád">
          <p>{muse.data.creditLine}</p>
          <p>{muse.data.artistDisplayName}</p>
          <img src={muse.data.primaryImageSmall} alt="Anyád" key="A másik anyád" />
        </div>
      ))
        :
        <p>Loading...</p>}
    </div>
  );
}

export default App;
