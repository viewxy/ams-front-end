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

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>ImageDetails</h1>
      {/* ez most kattintasra visszamegy a fooldalra */}
      <Link to="/"><img src={imgSource} alt="Anyád"/></Link>
      
    </div>
  )
}

export default ImageDetails
