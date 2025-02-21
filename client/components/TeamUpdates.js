// client/components/TeamUpdates.js
import { useEffect, useState } from "react";
import socket from "../socket";
import { auth } from "../firebaseConfig";

export default function TeamUpdates() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      socket.emit("user_online", { email: user.email });
    }

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("task_notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("online_users");
      socket.off("task_notification");
    };
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Team Online</h2>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>

      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
}