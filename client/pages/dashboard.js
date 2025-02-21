import TaskTracker from "../components/TaskTracker";
import PomodoroTimer from "../components/PomodoroTimer";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";
import TeamUpdates from "../components/TeamUpdates";
import VideoCall from "../components/VideoCall";



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
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <PomodoroTimer />
      <TaskTracker />
      <TeamUpdates />
      <VideoCall />
    </div>
  ) : (
    <p>Loading...</p>
  );
}