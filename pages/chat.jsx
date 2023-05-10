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
    <div className="flex messenger p-4 bg-white h-screen overflow-hidden" >
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
              <div className="basis-2/6 pt-3 bg-white border-r border-slate-100">
                <p>Match History</p>
                <i className="fa fa-search pr-2"></i>
                <input type="text" name="search" id="search" placeholder="Search" className="font-light focus:outline-none" />
                <div className="flex hover:bg-slate-100 transition px-5 py-3 hover:cursor-pointer">
                <div className="pr-4">
                <img  width="50" />
                <img src="https://robohash.org/etquasquis.png?size=50x50&set=set1" width="50" />
                <h3 className="text 500 tex-md">Bob Ross</h3>
                <p class="text-sm text-gray-400 font-light overflow-hidden h-5">Chat Message Preview</p>
                </div>
              </div>
              </div>
              <div className="bg-orange-300 user-info-header px-5 py-3">
                <p>Match</p>
              </div >
              <div className={styles.chatbody}>
                <ScrollToBottom className={styles.messagecontainer}>
                  {messageList.map((messageContent) => {
                    return (
                      <div className={username === messageContent.author ? "flex justify-start px-5 mb-2 bg-blue-300 text-black py-2 text-sm max-w-[100%] rounded font-light" : "flex justify-end px-5 mb-2 bg-amber-300 text-black py-2 text-sm max-w-[100%] rounded font-light"}>
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


