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
    // <div style={{ marginTop: "20px" }}>
    //   <h2>Team Online</h2>
    //   <ul>
    //     {onlineUsers.map((user, index) => (
    //       <li key={index}>{user.email}</li>
    //     ))}
    //   </ul>

    //   <h2>Notifications</h2>
    //   <ul>
    //     {notifications.map((notif, index) => (
    //       <li key={index}>{notif.message}</li>
    //     ))}
    //   </ul>
    // </div>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Team Online Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Online</h2>
        {onlineUsers.length > 0 ? (
          <ul className="space-y-2">
            {onlineUsers.map((user, index) => (
              <li
                key={index}
                className="p-2 bg-green-100 text-green-800 rounded-md flex items-center space-x-2"
              >
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>{user.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No team members online.</p>
        )}
      </div>

        {/* Notifications Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
          {notifications.length > 0 ? (
            <ul className="space-y-3">
              {notifications.map((notif, index) => (
                <li
                  key={index}
                  className="p-3 bg-yellow-100 text-yellow-800 rounded-md shadow-sm"
                >
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No new notifications.</p>
          )}
        </div>
      </div>
  );
}