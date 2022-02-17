import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import http from "axios";

const Home = ({setDetails}) => {
  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isShown, setIsShown] = useState(true);

  // Cleveland API
  const loadCleveland = async(keyword) => {
    let imageData = [];
    let search = "";
    const params = {
      q: keyword, // keyword from input
      limit: 20, // number of results
      has_image: 1 // it has an image
    };

    const getImages = await http("https://openaccess-api.clevelandart.org/api/artworks", {params})
      .then((response) => {
        const searchBar = `https://openaccess-api.clevelandart.org/api/artworks?${params.q}&limit=20&has_image=1`;
        for (const artwork of response.data.data) {
          let creator = artwork.creators.length > 0 ? artwork.creators[0].description : "Unknown";
          const newImage = {
            image: artwork.images.web.url,
            id: artwork.id,
            title: artwork.title,
            creator: creator,
            date: artwork.creation_date,
            details: artwork.tombstone,
            funFact: artwork.fun_fact,
            technique: artwork.technique,
            search: search
          }
          imageData.push(newImage);
          // console.log(newImage)
        };
        search = searchBar;
        setImagesOnLoad(imageData);
      })
      .catch((e) => {
        console.log("ERROR getting artwork data");
        console.log(e);
      });
  };

  const showArtworkDetails = () => {
    setIsShown((isShown) => !isShown);
  };

  useEffect(() => {
    loadCleveland();
  }, []);

  return (
    <div>
      <input placeholder='Search' type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
      <button onClick={() => loadCleveland(keyword)}>KATTINTS</button>
      {/* {imagesOnLoad.map((img, i) => (
        <div key={i} onClick={showArtworkDetails}>
          <img src={img.image} alt="Anyád" />
          <div className={isShown ? "miniArt" : "detailedArt"}>
            <p>{img.title}</p>
          </div>
        </div>
      ))} */}
      {imagesOnLoad.map((img, i) => (
        <div key={i}>
          <Link to="/imageDetails"><img src={img.image} onClick={() => {
    setDetails(img)
    localStorage.setItem('img', img.image)
    localStorage.setItem('creator', img.creator)
    localStorage.setItem('id', img.id)
    localStorage.setItem('title', img.title)
    localStorage.setItem('creation_date', img.date)
    localStorage.setItem('technique', img.technique)
    localStorage.setItem('funFact', img.funFact)
    localStorage.setItem('search', img.search)
    // localStorage.setItem('search', params)
  }} alt="Anyád" /></Link>
          <p>{img.id}</p>
        </div>
      ))}

    </div>
  )
}

export default Home
