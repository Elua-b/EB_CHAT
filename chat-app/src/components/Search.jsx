import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.id
        : user.uid + currentUser.uid;
        try {
          
       
          const res = await getDoc(doc(db, "chats",combinedId));
          if(!res.exists()){
            await setDocs(doc,(db,"chats",combinedId),{messages:[]});
            await updateDoc(doc(db,"userChats",currentUser.uid),{
              [combinedId +".userInfo"]:{
                uid:user.uid,
                displayName:user.displayName,
                
                photoURL:user.photoURL,
              },
              [combinedId+ ".date"]:serverTimestamp()
            })
            await updateDoc(doc(db,"userChats",user.uid),{
              [combinedId +".userInfo"]:{
                uid:currentUser.uid,
                displayName:currentUser.displayName,
                
                photoURL:currentUser.photoURL,
              },
              [combinedId+ ".date"]:serverTimestamp()
            });
          }
        }catch (error) {
          setUser(null)
          setUsername("")
        };
      
    
  }

  return (
    <div className="search">
      <div className="searchForm" id="expt">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>user not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
      {/* <div className="userChat">
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
      </div> */}
    </div>
  );
}

export default Search;
