import React, {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import http from "axios";

const ImageDetails = ({details}) => {
  let {id} = useParams(); // coming from the URL

  const [notes, setNotes] = useState("");

  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [technique, setTechnique] = useState("");
  const [funFact, setFunFact] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const load = async() => {
    const response = await http.get(`https://openaccess-api.clevelandart.org/api/artworks/${id}?indent=1`);
    // console.log(response.data.data); // for more artwork info
    const creator = response.data.data.creators.length > 0 ? response.data.data.creators[0].description : "Unknown";
    setCreator(creator);
    setTitle(response.data.data.title);
    setDate(response.data.data.creation_date);
    setTechnique(response.data.data.technique);
    setFunFact(response.data.data.fun_fact);
    setImageUrl(response.data.data.images.web.url);
  };

  const saveToFavorites = async() => {
    try {
      await http.post("http://localhost:3001/api/favorites", {
        id: id,
        title: title,
        url: imageUrl
      });
      alert ("success");
      setNotes("");
    } catch (err) {
      if (!err.response) alert("No No");
      if (err.response.status === 400) alert("Missing input");
    };
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className='full'>
      <h1>Image details</h1>
      <p>(Click on the image to return)</p>
      <div className='detailed'>
        <Link to="/"><img src={imageUrl} alt="Wait for it..."/></Link>
        <button onClick={saveToFavorites}>Save To Favorites</button>
        <div className='pDet'>
          <p><b>Creator:</b> {creator}</p>
          <p><b>Title:</b> {title}</p>
          <p><b>Date of creation:</b> {date}</p>
          <p><b>Technique:</b> {technique}</p>
          {funFact !== "null" ? <p><b>Fun fact:</b> {funFact}</p> : <p>No fun fact :'(</p>}
        </div>
        <input type="text" placeholder="notes" value={notes} onChange={(e) => setNotes(e.target.value)}/>
      </div>
    </div>
  )
}

export default ImageDetails

/*
NOT IN USE
// const storedDetails = {
  //   img: localStorage.getItem('img'),
  //   creator: localStorage.getItem('creator'),
  //   id: localStorage.getItem('id'),
  //   title: localStorage.getItem('title'),
  //   date: localStorage.getItem('creation_date'),
  //   technique: localStorage.getItem('technique'),
  //   funFact: localStorage.getItem('funFact'),
  //   search: localStorage.getItem('search')
  // };
*/
