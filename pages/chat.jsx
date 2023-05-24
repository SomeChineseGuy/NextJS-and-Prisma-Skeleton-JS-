import io from "socket.io-client";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"

let socket;

export default function Chat(users) {
  const [currentMessage, setCurrentMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("");
  const { user } = useUser();
  const [conversation, setConversation] = useState();
  const [activeChat, setActiveChat] = useState();

  console.log("This is the message list", messageList)

  useEffect( () => {
    socketInitializer();
  }, []);

  
  const socketInitializer = async () => { 
    await fetch("/api/socket");
    //Place a guard on socket because useEffect is called twice. 
    if(!socket){
    socket = io();
    socket.on("connect", function () {
      console.log("connect event", arguments)
    })
    socket.on("receive", data => {
      console.log("data received", data)
      const messageAlreadyRecorded = messageList.some((message) => {
        return message.timestamp === data.timestamp && message.sender === data.sender; 
      })
      console.log("message already recorded", messageAlreadyRecorded)
      if(!messageAlreadyRecorded){
      setMessageList((list) => [...list, data]);
      }
    });
  }
    return () => socket.on("disconnect")
  };

  let activeEmail = "";

  if (user) {
    activeEmail = user.email;
  }

  const usersList = users.users;
  const matchList = users.match;
  const chatList = users.chat;
  const messagesList = users.messages;

  let validUser = {};
  let matchHistory = [];
  let matchedUsers = [];
  let matchedChats = [];
  let matchedMessages = [];
  let openChat = [];




  //Find Active Logged-In User
  usersList.forEach(function (item) {
    if (item.email === activeEmail) {
      validUser = item;
    }
    return validUser;
  });

  
  //Find Matches for Active Logged-In User
  matchList.forEach(function (item) {
    if (item.user_1 === validUser.id || item.user_2 === validUser.id) {
      matchHistory.push(item);
    }
    return matchHistory;
  });

  //Return User Information for the Matches
  usersList.forEach(function (item) {
    matchHistory.forEach(function (items) {
      if (item.id === items.user_2 || item.id === items.user_1) {
        if(item.email !== validUser.email){
        matchedUsers.push(item);
      }
      }
    });
    return matchedUsers;
  });

  // Return Chat Information for the Matches
  chatList.forEach(function (item) {
    matchHistory.forEach(function (items) {
      if (item.match === items.id) {
        matchedChats.push(item);
      }
    });
    return matchedChats;
  });

  //Return Message History for Chat Matches
  messagesList.forEach(function (item) {
    matchedChats.forEach(function (items) {
      if (item.chat === items.id) {
        matchedMessages.push(item);
      }
    });
    return matchedMessages;
  });

  const handleClick = async (e) => {
    setConversation(e.target.innerText);
  };

  //Based on the conversation selected find the user information
  matchedUsers.forEach(function (item) {
    if (item.first_name.trim() === conversation) {
      openChat = item;
    }
    return openChat;
  });

  let chatHistory = [];
  let chatInformation = [];
  let chatMessages = [];

  //Based on the user selected find their chat history
  matchHistory.forEach(function (item) {
    if (item.user_2 === openChat.id || item.user_1 === openChat.id) {
      chatHistory.push(item);
    }
    return chatHistory;
  });

  //Based on the chat history find the chat information for this chat
  chatList.forEach(function (item) {
    chatHistory.forEach(function (items) {
      if (item.match === items.id) {
        chatInformation.push(item);
      }
    });
    return chatInformation;
  });
  
  //Based on the chat information find the messages for the chat.
  messagesList.forEach(function (item) {
    chatInformation.forEach(function (items) {
      if (item.chat === items.id) {
        chatMessages.push(item);
      }
    });
    return chatMessages;
  });

  const sendMessage = async () => {
    // setRoom(room || chatInformation[0].id);
    // socket.emit("join_room", room);
    setActiveChat( activeChat || chatInformation[0].id);
    if (currentMessage !== "") {
      const messageData = {
        room: room || chatInformation[0].id ,
        activeChat: activeChat || chatInformation[0].id,
        sender: activeEmail,
        message: currentMessage,
      };
      socket.emit("send", messageData);
      setMessageList((list) => [...list, messageData]);
      let dataActiveChat = messageData.activeChat;
      let dataSender = messageData.sender;
      let dataMessage = messageData.message;
      const body = { dataActiveChat, dataSender, dataMessage };
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setCurrentMessage("");
    }
  };

  return (
    <div className="pt-40 bg-orange-100">
      <div className="flex">
        <div className=" w-80 h-screen bg-orange-100">
          <h3 className="uppercase text-center text-[#5271ff] text-lg font-bold pt-4">
            Chat History
          </h3>
          <div className="flex-col">
            {matchedUsers.map((match) => (
              <div className="pr-4 hover:bg-slate-100 transition px-5 py-3">
                <h3
                  onClick={handleClick}
                  className="hover:cursor-pointer 500 text-lg text-[#5271ff] text-center"
                >
                  {match.first_name}
                </h3>
                <img
                  priority
                  className="ml-28 rounded-full"
                  src={match.profile_photo}
                  width="65"
                  height="50"
                  alt="Profile pic"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow h-screen ">
          <div className="border border-orange-300 ">
          {conversation === undefined ? (
              <div className="bg-gradient-to-br from-[#5271ff] to-[#5271ee] user-info-header px-5 py-6 flex items-center text-md uppercase">Select a Match from Chat History to Open a Chat</div>
            ) : 
            ( <div>
            <div className="bg-gradient-to-br from-[#5271ff] to-[#5271ee] user-info-header px-5 py-6 flex items-center">
              <h3 className="text-lg">{openChat.first_name}</h3>
              <img
                className="ml-10 rounded-full"
                priority
                src={openChat.profile_photo}
                width="50"
              />
            </div>
            <div className=" message-area mt-4 px-4 h-96 bg-white overflow-y-auto">
              {chatMessages.map((previousMessages) => {
                return (
                  <div
                    className={
                      previousMessages.sender === activeEmail
                        ? "flex-col justify-start px-5 mb-2 bg-blue-300 text-black py-2 text-base max-w-[100%] rounded font-light"
                        : "flex justify-end px-5 mb-2 bg-amber-300 text-black py-2 text-base max-w-[100%] rounded font-light"
                    }
                  >
                    {previousMessages.message_content}
                  </div>
                );
              })}
              {messageList.map((messageContent) =>
                // openChat.first_name === messageContent.room ? (
                  <div
                    className={
                      messageContent.sender === activeEmail
                        ? "flex-col justify-start px-5 mb-2 bg-blue-300 text-black py-2 text-base max-w-[100%] rounded font-light"
                        : "flex justify-end px-5 mb-2 bg-amber-300 text-black py-2 text-base max-w-[100%] rounded font-light"
                    }
                  >
                    <div className="">
                      <p>{messageContent.message}</p>
                    </div>
                  </div>
                // ) : (
                //   <div></div>
                // )
              )}
            </div>
            <div className="bg-orange-300 flex">
              <input
                className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white w-11/12"
                type="text"
                value={currentMessage}
                placeholder="New Message"
                onChange={(event) => setCurrentMessage(event.target.value)}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
              <button className="bg-orange-300 pl-8" onClick={sendMessage}>
                {" "}
                &#9658; Send
              </button>
            </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   console.log(context.req)
//   const prisma = new PrismaClient()
//   const users = await prisma.user.findMany()
//   const match = await prisma.match.findMany()
//   const chat = await prisma.chat.findMany()
//   const messages = await prisma.message.findMany()
//   return {
//     props: { users, match, chat, messages }
//   }
// }

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = await getSession(context.req, context.res);
    console.log(session.user.email);
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    const match = await prisma.match.findMany();
    const chat = await prisma.chat.findMany();
    const messages = await prisma.message.findMany();
    return {
      props: { users, match, chat, messages },
    };
  },
});
