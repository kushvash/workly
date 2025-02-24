# workly
Remote work app

Workly is a comprehensive web application designed to enhance productivity for remote teams. It integrates essential tools like task tracking, a Pomodoro timer, real-time notifications, team status updates, and a peer-to-peer video calling feature. The platform enables teams to collaborate seamlessly in real-time, improving communication and task management efficiency.

## Features

Daily Task Tracking:
	•	Create, edit, and delete tasks with real-time updates.
	•	Get notified instantly when team members complete tasks.

Pomodoro Timer:
	•	Integrated timer to help users stay focused with structured work and break sessions.
	•	Visual cues and responsive design for enhanced usability.

Team Online Status & Notifications:
	•	Real-time updates of team members’ online status using WebSockets.
	•	Instant notifications for task completions and incoming calls.

Video Call via Email:
	•	Initiate video calls by entering a teammate’s email.
	•	Receive incoming call notifications with accept/reject options.
	•	Establish peer-to-peer video connections using WebRTC with robust ICE candidate handling.

## Tech Stack
	
Frontend: Next.js, React, Tailwind CSS
Backend: Node.js, Express.js
Real-time Communication: Socket.io (WebSockets) for live updates and notifications
Video Calling: WebRTC for peer-to-peer video streams with STUN servers for NAT traversal
Database & Authentication: Firebase for user authentication and real-time data storage
Deployment: Vercel (frontend), Render (backend)

## Technical Challenges & Solutions

### Real-time Data Synchronization:
	Achieved seamless real-time communication with Socket.io, ensuring that task updates, team statuses, and video call signals propagate instantly across all users.

### WebRTC Signaling:
        Implemented a robust signaling system to handle offer/answer exchanges and ICE candidates, ensuring stable peer-to-peer video connections even behind NATs.
	
### User-friendly Video Calls:
        Replaced traditional room-based calls with an email-based calling system, making the process more intuitive for users. Calls come with an incoming call notification allowing users to accept or reject calls conveniently.

### Responsive UI/UX:
	Leveraged Tailwind CSS to build a clean, responsive interface that works seamlessly on desktops and mobile devices.

🌟 How to Use
	1.	Sign Up / Log In via Firebase Authentication.
	2.	View Team Status: Instantly see who’s online.
	3.	Manage Tasks: Add new tasks, track progress, and receive real-time updates.
	4.	Use the Pomodoro Timer: Stay productive with structured work intervals.
	5.	Start a Video Call:
	•	Enter a Room Id and click on "Start Call".
    •	The call starts as soon as the other user enters the room.

📈 Future Improvements

🔄 Improve ICE candidate handling to ensure faster connection times.
🔔 Add audio notifications for incoming calls and task completions.
📱 Enhance mobile responsiveness and add dark mode support.
📹 Record video calls and save them to Firebase Storage for future reference.

🚀 Live Demo & Code

🌐 Live App: Workly Live
📂 Source Code: GitHub Repository

💡 Workly is designed to be a one-stop solution for remote teams, streamlining productivity and communication through a simple, user-friendly interface.
