import Link from "next/link";

import TaskTracker from "../components/TaskTracker";
import PomodoroTimer from "../components/PomodoroTimer";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";
import TeamUpdates from "../components/TeamUpdates";
import VideoCall from "../components/VideoCall";



// const [darkMode, setDarkMode] = useState(false);

// useEffect(() => {
//   document.documentElement.classList.toggle("dark", darkMode);
// }, [darkMode]);


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };


  return user ? (
  //   <div className="min-h-screen bg-gray-100 p-6">
  //     <div className="flex justify-between items-center mb-4">
  //       <h1 className="text-3xl font-bold">Dashboard</h1>
  //       <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
  //         Logout
  //       </button>
  //     </div>
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
  //       <div className="bg-white p-4 rounded shadow">
  //         <PomodoroTimer />
  //       </div>
  //       <div className="bg-white p-4 rounded shadow">
  //         <TaskTracker />
  //       </div>
  //       <div className="bg-white p-4 rounded shadow">
  //         <TeamUpdates />
  //       </div>
  //       <div className="bg-white p-4 rounded shadow">
  //         <VideoCall />
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   <p>Loading...</p>
  // );

  <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Workly
          </Link>
          <div className="flex items-center space-x-4">
            <p className="text-gray-700">Welcome, {user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <PomodoroTimer />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <TaskTracker />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <TeamUpdates />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <VideoCall />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-200 text-center">
        © {new Date().getFullYear()} Workly. All rights reserved.
      </footer>
    </div>
  ) : (
    <p className="text-center py-20 text-lg font-medium">Loading...</p>
  );
}