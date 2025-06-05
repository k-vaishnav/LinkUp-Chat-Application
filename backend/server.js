// import your modules
import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { connection } from "./config.js";
import { router } from "./routes/auth.route.js";
import { Message } from "./model/messageSchema.js";
import { fileURLToPath } from 'url';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// 1.create the server using http
const server = http.createServer(app);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname , "../frontend")));



//  2.Create Socket server.
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// 3.routes to serve frontend

app.use("/api/auth", router);
// 4.Use socket events.
const onlineUsers = {}; // to store all online users
const typingUsers = new Set();

io.on("connection", (socket) => {
    console.log("connection made.");

    socket.on("join", (data) => {
        // to display the previous messages to the new user
        Message.find()
            .sort({ timeStamp: 1 })
            .limit(50)
            .then((messages) => {
                socket.emit("load_messages", messages);
            })
            .catch((err) => {
                console.log(err);
            });

        socket.username = data;
        onlineUsers[`${data}`] = socket.id;
        const message = `${data} has joined.`;
        // Broadcast joined message to all the other users
        socket.broadcast.emit("joined", message);
        const updatedData = {
            users: Object.keys(onlineUsers),
            count: Object.keys(onlineUsers).length,
        };
        // Emit updated-users Event to display the online users count and name
        io.emit("update-users", updatedData);
    });

    // Listen to typing event

    socket.on("typing", () => {
        if (socket.username) {
            typingUsers.add(socket.username);
            // Emit typing indicator to allthe online users
            io.emit("typingUpdate", Array.from(typingUsers));
        }
    });

    // listen to stopTyping event

    socket.on("stopTyping", () => {
        if (socket.username) {
            typingUsers.delete(socket.username);
            io.emit("typingUpdate", Array.from(typingUsers));
        }
    });

    // listen to sendMessage event
    socket.on("sendMessage", async (data) => {
        const newMessage = new Message({
            avatar: data.avatar,
            sender: socket.username,
            message: data.messageInput,
            time: data.time,
        });
        await newMessage.save();
        // broadcast this message to all the clients.
        socket.broadcast.emit("broadcast_message", newMessage);
    });
    // socket listens to disconnecting Event when user logouts
    function handleUserDisconnect(socket) {
    if (socket.username && onlineUsers[socket.username]) {
        delete onlineUsers[socket.username];
        typingUsers.delete(socket.username);
        io.emit("update-users", {
            users: Object.keys(onlineUsers),
            count: Object.keys(onlineUsers).length,
        });
        io.emit("typingUpdate", Array.from(typingUsers));
        console.log(`${socket.username} has disconnected or logged out.`);
    }
}
socket.on("logout", () => {
        handleUserDisconnect(socket);
        socket.disconnect(true);
    });

    // when users directly clear the screen
    socket.on("disconnect", () => {
        handleUserDisconnect(socket);
    });
});
// listen to the server
server.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000.");
    connection();
});
