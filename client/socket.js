// client/socket.js
import { io } from "socket.io-client";

// const socket = io("http://localhost:4000", {
//   transports: ["websocket"],
// });

const socket = io("https://workly-o2uu.onrender.com", {
  transports: ["websocket"],
});


export default socket;