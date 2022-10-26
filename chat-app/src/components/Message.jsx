import React from 'react'

function Message() {
  return (
    <div className='message'>
        <div className="messageInfo">
            <img src="./boi.jpg" alt="" />
            <span>just now</span>
        </div>
        <div className="messageContect">
            <p >hello</p>
            <img src="./boi.jpg" className='image' alt="" />
        </div>
    </div>
  )
}

export default Message