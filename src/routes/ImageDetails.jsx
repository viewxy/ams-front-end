import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import http from "axios";

const ImageDetails = ({details}) => {
  // jelenleg a load, useEffect helyett full a local storage adatokat hasznaljuk
  // const [imgSource, setImgSource] = useState("");

  // itt jon at a kattintott artwork osszes adata
  // console.log(details);

  // const load = async() => {
  //   const response = await http.get(`https://openaccess-api.clevelandart.org/api/artworks/${details.id}?indent=1`);

  //   console.log(response.data.data); // for more artwork info
  //   setImgSource(response.data.data.images.web.url);
  // };

  const storedDetails = {
    img: localStorage.getItem('img'),
    creator: localStorage.getItem('creator'),
    id: localStorage.getItem('id'),
    title: localStorage.getItem('title'),
    date: localStorage.getItem('creation_date'),
    technique: localStorage.getItem('technique'),
    funFact: localStorage.getItem('funFact'),
    search: localStorage.getItem('search')
  }

  // useEffect(() => {
  //   load();
  // }, []);

  return (
    <div className='full'>
      <h1>Image details</h1>
      <p>(Click on the image to return)</p>
      <div className='detailed'>
        <Link to="/"><img src={storedDetails.img} alt="Anyád"/></Link>
        <div className='pDet'>
          <p><b>Creator:</b> {storedDetails.creator}</p>
          <p><b>Title:</b> {storedDetails.title}</p>
          <p><b>Date of creation:</b> {storedDetails.date}</p>
          <p><b>Technique:</b> {storedDetails.technique}</p>
          {storedDetails.funFact !== "null" ? <p><b>Fun fact:</b> {storedDetails.funFact}</p> : <p>No fun fact :'(</p>}
        </div>
      </div>
    </div>
  )
}

export default ImageDetails

/*
const signup = async() => {
    try {
      await http.post("http://localhost:3001/api/signup", {
      username: nameValue,
      password: passwordValue
      });
      alert ("success");
      setNameValue("");
      setPasswordValue("");
      setDivToShow("login");
    } catch (err) {
      if (!err.response) alert("No No");
      if (err.response.status === 409) alert("User already exists");
      if (err.response.status === 400) alert("Missing input");
    };
  };
*/
