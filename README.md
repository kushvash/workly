# Workly – Remote Work Productivity App

_Workly_ is a comprehensive web application designed to enhance productivity for remote teams.  
It integrates essential tools like **task tracking**, a **Pomodoro timer**, **real-time notifications**, **team status updates**, and **peer-to-peer video calling**.  
The platform enables teams to collaborate seamlessly in real-time, improving communication and task management efficiency.

---

## 🚀 Features

- **Daily Task Tracking:**  
  - Create, edit, and delete tasks with real-time updates.  
  - Get notified instantly when team members complete tasks.  

- **Pomodoro Timer:**  
  - Integrated timer to help users stay focused with structured work and break sessions.  
  - Visual cues and responsive design for enhanced usability.  

- **Team Online Status & Notifications:**  
  - Real-time updates of team members' online status using **WebSockets**.  
  - Instant notifications for task completions and incoming calls.  

- **Video Call via Email:**  
  - Initiate video calls by entering a teammate’s email.  
  - Receive incoming call notifications with **accept/reject** options.  
  - Establish **peer-to-peer video connections** using **WebRTC** with ICE candidate handling.  

---

## 🛠️ Tech Stack

| Technology  | Purpose                                  |
|-------------|------------------------------------------|
| Next.js     | Frontend framework                       |
| React       | Component-based UI development          |
| Tailwind CSS | Responsive and clean UI styling        |
| Node.js     | Backend server                           |
| Express.js  | RESTful API handling                     |
| Socket.io   | Real-time communication (WebSockets)     |
| WebRTC      | Peer-to-peer video calling              |
| Firebase    | Authentication and real-time data storage |
| Vercel      | Frontend deployment                      |
| Render      | Backend deployment                       |

---

## 🧩 Technical Challenges & Solutions

- **Real-time Data Synchronization:**  
  Achieved seamless real-time communication with **Socket.io**, ensuring instant propagation of task updates and team statuses.

- **WebRTC Signaling:**  
  Developed a robust signaling system for **offer/answer exchanges** and **ICE candidate handling**, enabling stable peer-to-peer video calls.

- **User-friendly Video Calls:**  
  Replaced room-based calls with an **email-based calling system**, allowing users to easily initiate calls and receive notifications with accept/reject options.

- **Responsive UI/UX:**  
  Utilized **Tailwind CSS** to create an interface that’s responsive across devices, ensuring smooth user interactions.

---

## 📝 How to Use

1. **Sign Up / Log In:**  
   Use Firebase Authentication to access the app.

2. **View Team Status:**  
   Instantly see which team members are online.

3. **Manage Tasks:**  
   Add new tasks, track progress, and receive real-time notifications.

4. **Use the Pomodoro Timer:**  
   Improve productivity with structured work sessions.

5. **Start a Video Call:**  
   - Enter the email of the user you wish to call.  
   - The callee receives an incoming call notification with options to **Accept** or **Reject**.  
   - Upon acceptance, both users can view each other’s video streams.  

---

## 📚 Lessons Learned

- Gained in-depth knowledge of **real-time communication** with **WebSockets** and **WebRTC**.  
- Mastered **peer-to-peer connections** and handled complex signaling scenarios for video calling.  
- Improved **state management** to ensure smooth UX during tasks like incoming calls and notifications.  
- Enhanced skills in **full-stack development** and **cloud deployment**.  

---

## 🚀 Future Improvements

- Improve ICE candidate handling to reduce connection time.  
- Add audio notifications for incoming calls and task completions.  
- Enhance mobile responsiveness and implement dark mode.  
- Add call recording functionality and save recordings to Firebase Storage.  

---

## 🌐 Live Demo & Code

- **Live App:** [Workly Live](https://your-live-demo-link.com)  
- **Source Code:** [GitHub Repository](https://github.com/your-repo)  

---

## 🖼️ Screenshots

> _Include screenshots or a demo GIF showcasing the dashboard, task management, Pomodoro timer, and video call feature here._

---

## 💡 Key Takeaways

Workly streamlines remote team collaboration through an intuitive interface, real-time updates, and direct video communication.  
By integrating various productivity tools into a single platform, it helps teams stay connected, organized, and efficient.

---
