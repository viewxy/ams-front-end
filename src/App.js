import "./App.css";
import React, { useState, useEffect } from "react";
import http from "axios";

function App() {
  let [museum, setMuseum] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');


  const signUp = async () => {
    try {
      await http.post('http://localhost:4000/api/signup', {
        name: nameValue,
        password: passwordValue
      })
      alert("Succesful signup")
      setNameValue('')
      setPasswordValue('')
    } catch (err) {
      console.log(err.response)
      if (!err.response) {
        alert("Oops... Something went wrong")
      }
      if (err.response.status === 409) {
        alert('Username already exists')
      }
      if (err.response.status === 400) {
        alert('Missing credentials')
      }
    }
  }

  const loadMuseum = async () => {
    let response = [];
    const responseFetch = await http.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/400000");
    console.log(responseFetch);
    response.push(responseFetch);
    // response.data ? response = response.filter(filt => filt.data.primaryImage.length > 1) : console.log("shit")
    teaFilter(response);
  };

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
      <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
      <button onClick={signUp}>Sign up</button>
      <br />
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
