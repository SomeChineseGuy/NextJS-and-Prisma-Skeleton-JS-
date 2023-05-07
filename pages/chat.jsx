import io from "socket.io-client"
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"
import styles from '@/styles/chat.module.css'

let socket;

export default function Chat() {
  const [username, setUsername] = useState("")
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    socketInitializer();
  }, [])
  
  const socketInitializer = async () => {
    await fetch ("/api/socket");
    socket = io();
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on("receive_message", (data) => {
      setMessageList((list) => 
        [...list, data]
      )
    })
  }

  const joinRoom = () => {
    if(username !== ""){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  const sendMessage =  async () => {
    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }
    socket.emit("send_message", messageData)
    setMessageList((list) => 
      [...list, messageData]
    )
     setCurrentMessage("")
}

  return (
    <div className={styles.chatwindow}>
      {!showChat ? (
      <div className={styles.joinChatContainer}>
      <h3>TripMate Chat</h3>
      <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
      <input type="text" placeholder="room" onChange={(event) => setRoom(event.target.value)} />
      <button onClick={joinRoom}> Accept</button>
      </div> )
      :
      (
      <div> 
      <div className={styles.chatheader}>
        <p>Match</p>
      </div>
      <div className={styles.chatbody}>
        <ScrollToBottom className={styles.messagecontainer}>
        {messageList.map((messageContent) => {
          return (
          <div className={styles.message} id={username === messageContent.author ? "you" : "other"}>
          <div className={styles.messagecontent}>
            <p>{messageContent.message}</p>
            </div> 
            <div className={styles.messagemeta}>
              <p id="time">{messageContent.time}</p>
              <p id="author">{messageContent.author}</p>

            </div>
          </div>
          );
        })}
        </ScrollToBottom>
      </div>
      <div className={styles.chatfooter}>
        <input type="text" value={currentMessage} placeholder="New Message" onChange={(event) => setCurrentMessage(event.target.value)} onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}/>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
       </div>) }
    </div>
  )
}


