import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import http from "axios";

const ImageDetails = ({id}) => {
  const [imgSource, setImgSource] = useState("");

  // itt probalom athozni az image id-t
  console.log(id);

  const load = async() => {
    // itt majd az image id-t kene betenni a link vegere
    const response = await http.get(`https://openaccess-api.clevelandart.org/api/artworks/${id}?indent=1`);
    // console.log(response.data.data);
    setImgSource(response.data.data.images.web.url);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>ImageDetails</h1>
      {/* ez most kattintasra csak visszamegy a fooldalra */}
      <Link to="/"><img src={imgSource} alt="Anyád"/></Link>
    </div>
  )
}

export default ImageDetails
