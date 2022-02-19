import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Home from "./routes/Home";
import ImageDetails from "./routes/ImageDetails";
import Favorites from "./routes/Favorites";

function App() {
  const [details, setDetails] = useState({});
  /*
  sweet memories :)
  const teaFilter = async (resp) => {
    resp = await resp.filter((filt) => filt.data.primaryImage.length > 0);
    setMuseum(resp);
    // console.log(museum);
  };
  */

  return (
    <div className="App">
      <NavBar/>
      <h1>Welcome to Art museum!</h1>
      <SignUp/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/imageDetails/:id" element={<ImageDetails/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
    </div>
  );
}

export default App;
