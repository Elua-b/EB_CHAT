import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage,db } from "../firebase";
import { async } from "@firebase/util";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [err, setErr] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"userChats",res.user.uid),{})
            navigate("/")
          });
        }
        // .then((userCredential) => {
        //   // Signed in
        //   const user = userCredential.user;
        //   console.log(user);
        //   // ...
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   // ..
        // });
      );
     
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
          <input type="text" placeholder="display name" name="displayName" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="./avatar.jpg" alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up </button>
          {err && <span>Something went long</span>}
          <p>You do have an account ? <Link to="/login">Login</Link> </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
