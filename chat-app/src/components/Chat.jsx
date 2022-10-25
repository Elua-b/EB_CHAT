import React from 'react'
import Input from './Input'
import Messages from './Messages'

function Chat() {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
            <img src="./video.jpg" alt="" />
            <img src="./person.jpg" alt="" />
            <img src="./dots.jpg" alt="" />

        </div>
      </div>
        <Messages/>
        <Input/>
    </div>
  )
}

export default Chat