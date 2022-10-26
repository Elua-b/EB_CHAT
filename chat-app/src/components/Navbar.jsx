import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Navbar() {
  const {currentUser}=useContext(AuthContext)
  const navigate=useNavigate();
  const handleLogout=()=>{
    signOut(auth);
    navigate('/login');
  }
  return (
    <div className="navbar">
      <span className="logo">EB_chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={
        handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
