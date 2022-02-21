import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  // let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  // if (username) {
    //   setLoggedIn(true)
    // }
    
    //   let username;
    //   useEffect(() => {
  //     username = sessionStorage.getItem('username')
  //     if (username) {
  //     setLoggedIn(true)
  //   }
  // }, [])

  let username;
  const getUsername = () => {
    username = localStorage.getItem('username')
  }
  
  useEffect(() => {
    // getUsername()
    if (username) {
      setLoggedIn(true)
    }
  }, [username])
  

  return (
    <div className="navbar">
      <nav>
        <Link to="/">HOME</Link> |{" "}
        <Link to="/imageDetails">Image Details (not working)</Link> |{" "}
        <Link to="/favorites">Favorites</Link> |{" "}
        {/* <Link to="/signup">Sign Up</Link> |{" "} */}
        {/* <Link to="/login">Login</Link> */}
        {loggedIn ? (<p>You are logged in as {username}</p>, getUsername()) : (<><Link to="/signup">Sign Up</Link> |{" "}<Link to="/login">Login</Link></>)}
        {/* <button onClick={() => navigate("/")}>Katt</button> */}
      </nav>
    </div>
  );
};

export default NavBar;
