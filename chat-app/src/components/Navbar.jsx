import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">EB_chat</span>
      <div className="user">
        <img src="./boi.jpg" alt="" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
