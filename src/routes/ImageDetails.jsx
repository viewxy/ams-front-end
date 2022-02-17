import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import http from "axios";

const ImageDetails = ({details}) => {
  const [imgSource, setImgSource] = useState("");

  // itt jon at a kattintott kep osszes adata
  console.log(details);

  const load = async() => {
    const response = await http.get(`https://openaccess-api.clevelandart.org/api/artworks/${details.id}?indent=1`);
    // console.log(response.data.data);
    setImgSource(response.data.data.images.web.url);
    
  };

  // const storedDetailsImg = localStorage.getItem('img')
  // const storedDetailsCreator = localStorage.getItem('creator')
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

  
  // console.log(storedDetails)

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Image details</h1>
      <p>(Click on the image to return)</p>
      {/* ez most kattintasra visszamegy a fooldalra */}
      <Link to="/"><img src={storedDetails.img} alt="Anyád"/></Link>
      <p>Creator: {storedDetails.creator}</p>
      <p>Title: {storedDetails.title}</p>
      <p>Date of creation: {storedDetails.date}</p>
      <p>Technique: {storedDetails.technique}</p>
      {storedDetails.funFact !== "null" ? <p>Fun fact: {storedDetails.funFact}</p> : <p>No fun fact :'(</p>}
      {/* <p>{details.creator}</p> */}
      
    </div>
  )
}

export default ImageDetails
