import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage,db } from "../firebase";
import { async } from "@firebase/util";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function Login() {
  const [err, setErr] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const email = e.target[0].value;
    const password = e.target[1].value;
  
   
    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/")

    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
    <span className="logo">EB-chart</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {err && <span>Something went long</span>}

          <button>Sign in</button>
 </form>
 <p>You don't have an account ? <Link to="/register">Register</Link> </p>
 </div>
 </div>
  )
}

export default Login