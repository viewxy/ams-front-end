import React, {useState} from 'react';
import http from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  let navigate = useNavigate();

  const signUp = async () => {
    try {
      await http.post("http://localhost:3001/api/signup", {
        name: nameValue,
        password: passwordValue,
      });
      alert("Succesful signup");
      setNameValue("");
      setPasswordValue("");
    } catch (err) {
      console.log(err.response);
      if (!err.response) {
        alert("Oops... Something went wrong");
      }
      if (err.response.status === 409) {
        alert("Username already exists");
      }
      if (err.response.status === 400) {
        alert("Missing credentials");
      }
    }
    navigate("/login")
  };

  return (
    <div className="signup-form">
      <input type="text" placeholder="username" value={nameValue} onChange={(e) => setNameValue(e.target.value)}/>
      <input
        type="password"
        placeholder="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <button onClick={signUp}>Sign up</button>
    </div>
  )
}

export default SignUp
