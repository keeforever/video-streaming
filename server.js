const express = require("express")
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.use("/", express.static(__dirname + "/public"))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => { console.log(`App listening at port ${PORT}`) })

io.on("connection", (socket) => {
  console.log("socket connected.")
  socket.on("disconnect", () => {
    console.log("socket disconnected.")
  })

  socket.on("room", ({ roomID, offer , answer}) => {
    console.log("roomID :" , roomID)
    console.log(answer)
    socket.emit(roomID + "remote", offer)
    socket.emit(roomID + "local", answer)
  })

})