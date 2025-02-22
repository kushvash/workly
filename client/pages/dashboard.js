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
    router.push("/login");
  };


  return user ? (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
    </div>
  ) : (
    <p>Loading...</p>
  );
  // return user ? (
  //   <div>
  //     <h1>Dashboard</h1>
  //     <p>Welcome, {user.email}</p>
  //     <button onClick={handleLogout}>Logout</button>
  //     <PomodoroTimer />
  //     <TaskTracker />
  //     <TeamUpdates />
  //     <VideoCall />
  //   </div>
  // ) : (
  //   <p>Loading...</p>
  // );
}