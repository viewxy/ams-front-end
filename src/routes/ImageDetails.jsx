import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import http from "axios";

const ImageDetails = ({details}) => {
  const [imgSource, setImgSource] = useState("");

  // itt jon at a kattintott kep osszes adata
  // console.log(details);

  const load = async() => {
    const response = await http.get(`https://openaccess-api.clevelandart.org/api/artworks/${details.id}?indent=1`);
    // console.log(response.data.data);
    setImgSource(response.data.data.images.web.url);
    
  };

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

  useEffect(() => {
    load();
  }, []);

  return (
    <div className='full'>
      <h1>Image details</h1>
      <p>(Click on the image to return)</p>
      {/* ez most kattintasra visszamegy a fooldalra */}
      <div className='detailed'>
        <Link to="/"><img src={storedDetails.img} alt="Anyád"/></Link>
        <div className='pDet'>
          <p><b>Creator:</b> {storedDetails.creator}</p>
          <p><b>Title:</b> {storedDetails.title}</p>
          <p><b>Date of creation:</b> {storedDetails.date}</p>
          <p><b>Technique:</b> {storedDetails.technique}</p>
          {storedDetails.funFact !== "null" ? <p><b>Fun fact:</b> {storedDetails.funFact}</p> : <p>No fun fact :'</p>}
        </div>
      </div>
    </div>
  )
}

export default ImageDetails
