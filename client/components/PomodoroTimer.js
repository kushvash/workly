// client/components/PomodoroTimer.js
import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      setIsRunning(false);
      alert(isBreak ? "Break is over! Time to work!" : "Work session completed! Take a break.");
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60); // Switch between 25-min work and 5-min break
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  return (
    // <div style={{ textAlign: "center", marginTop: "20px" }}>
    //   <h2>{isBreak ? "Break Time" : "Work Time"}</h2>
    //   <h1 style={{ fontSize: "48px" }}>{formatTime(timeLeft)}</h1>
    //   <button onClick={handleStartPause}>{isRunning ? "Pause" : "Start"}</button>
    //   <button onClick={handleReset} style={{ marginLeft: "10px" }}>
    //     Reset
    //   </button>
    // </div>

    <div className="mt-6 p-6 bg-white rounded-lg shadow flex flex-col items-center space-y-6">
  <h2 className={`text-2xl font-bold ${isBreak ? "text-green-600" : "text-blue-600"}`}>
    {isBreak ? "Break Time" : "Work Time"}
  </h2>

  <div className="w-48 h-48 flex items-center justify-center rounded-full border-8 border-blue-500 shadow-inner">
    <h1 className="text-5xl font-extrabold text-gray-800">{formatTime(timeLeft)}</h1>
  </div>

  <div className="flex space-x-4">
    <button
      onClick={handleStartPause}
      className={`px-6 py-2 rounded text-white font-semibold shadow transition ${
        isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {isRunning ? "Pause" : "Start"}
    </button>
    <button
      onClick={handleReset}
      className="px-6 py-2 rounded bg-red-500 text-white font-semibold shadow hover:bg-red-600"
    >
      Reset
    </button>
  </div>
</div>
  );
}