import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../firebase";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const handleSearch =async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setUser(doc.data())
        })
    } catch (error) {
        setErr(true)
        
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="search">
      <div className="searchForm" id="expt">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {err && <span>user not found</span>}
      {user && <div className="userChat">
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
      <div className="userChat">
        <img src="./boi.jpg" alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
      <div className="userChat">
        <img src="./boi.jpg" alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
      <div className="userChat">
        <img src="./boi.jpg" alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
