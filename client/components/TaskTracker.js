// client/components/TaskTracker.js
import socket from "../socket";
// import { auth } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function TaskTracker() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddTask = async () => {
    if (!task.trim()) return;
    await addDoc(collection(db, "tasks"), {
      text: task,
      userId: user.uid,
      createdAt: new Date(),
    });
    setTask("");
  };

  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    await deleteDoc(doc(db, "tasks", id));
    socket.emit("task_completed", { text: taskToDelete.text, user: auth.currentUser.email });
  };

  const handleEditTask = async (id) => {
    setEditTaskId(id);
    setEditTaskText(tasks.find((t) => t.id === id)?.text || "");
  };

  const handleUpdateTask = async () => {
    if (!editTaskText.trim()) return;
    await updateDoc(doc(db, "tasks", editTaskId), { text: editTaskText });
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {editTaskId === t.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button onClick={handleUpdateTask}>Save</button>
                <button onClick={() => setEditTaskId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {t.text}{" "}
                <button onClick={() => handleEditTask(t.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}