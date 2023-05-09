import io from "socket.io-client"
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"
import styles from '@/styles/chat.module.css'


let socket;

export default function Chat() {
  const [username, setUsername] = useState("")
  const [currentMessage, setCurrentMessage] = useState()
  const [messageList, setMessageList] = useState([])
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    socketInitializer();
  }, [])

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on("receive", (data) => {
      setMessageList((list) =>
        [...list, data]
      )
    })
    return () => {
      socket.disconnect();
    };
  }

  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      socket.emit("send", messageData)
      setMessageList((list) =>
        [...list, messageData]
      )
      setCurrentMessage("")
    }
  }

  return (
    <div >
      <div className={styles.chatwindow}>
        {!showChat ? (
          <div className={styles.joinChatContainer}>
            <h3>TripMate Chat</h3>
            <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
            <input type="text" placeholder="room" onChange={(event) => setRoom(event.target.value)} />
            <button onClick={joinRoom}> Accept</button>
          </div>)
          :
          (
            <div>
              <div className={styles.matches}>
                <input type="text" name="search" id="search" placeholder="Search" />
                <p>Match History</p>
              </div>
              <div className={styles.chatheader}>
                <p>Match</p>
              </div>
              <div className={styles.chatbody}>
                <ScrollToBottom className={styles.messagecontainer}>
                  {messageList.map((messageContent) => {
                    return (
                      <div className={username === messageContent.author ? styles.you : styles.other}>
                        <div className={styles.messagecontent}>
                          <p>{messageContent.message}</p>
                        </div>
                        <div className={styles.messagemeta}>
                          <p className={styles.time}>{messageContent.time}</p>
                          <p className={styles.author}>{messageContent.author}</p>
                        </div>
                      </div>
                    );
                  })}
                </ScrollToBottom>
              </div>
              <div className={styles.chatfooter}>
                <input type="text" value={currentMessage} placeholder="New Message" onChange={(event) => setCurrentMessage(event.target.value)} onKeyPress={(event) => {event.key === "Enter" && sendMessage()}} />
                <button onClick={sendMessage}>&#9658;</button>
              </div>
            </div>)}
      </div>
    </div>
  )
}


