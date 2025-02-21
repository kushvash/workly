import { io } from "socket.io-client";

// Create a single socket instance
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export default socket;