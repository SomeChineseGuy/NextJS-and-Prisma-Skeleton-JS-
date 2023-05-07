import {Server} from "socket.io"

export default function SocketHandler (req, res){
  if(res.socket.server.io){
    console.log("Already connected");
    res.end()
    return;
} else {
const io = new Server(res.socket.server);
res.socket.server.io = io;

io.on("connection", socket => {
  console.log("User Connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on("send-message", (data) => {
    socket.to(data.room).emit("receive_message", data)
   })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id)
  })
})
}
res.end()
}


