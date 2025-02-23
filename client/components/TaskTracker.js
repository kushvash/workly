// client/components/TaskTracker.js
import socket from "../socket";
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
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white px-4 rounded hover:bg-green-600">
          Add
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            {editTaskId === t.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
                <button onClick={handleUpdateTask} className="ml-2 bg-blue-500 text-white px-2 rounded">Save</button>
              </>
            ) : (
              <>
                <span>{t.text}</span>
                <div className="space-x-2">
                  <button onClick={() => handleEditTask(t.id)} className="bg-yellow-500 text-white px-2 rounded">Edit</button>
                  <button onClick={() => handleDeleteTask(t.id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  // return (
  //   <div>
  //     <h2>Your Tasks</h2>
  //     <input
  //       type="text"
  //       placeholder="Add a new task..."
  //       value={task}
  //       onChange={(e) => setTask(e.target.value)}
  //     />
  //     <button onClick={handleAddTask}>Add Task</button>

  //     <ul>
  //       {tasks.map((t) => (
  //         <li key={t.id}>
  //           {editTaskId === t.id ? (
  //             <>
  //               <input
  //                 type="text"
  //                 value={editTaskText}
  //                 onChange={(e) => setEditTaskText(e.target.value)}
  //               />
  //               <button onClick={handleUpdateTask}>Save</button>
  //               <button onClick={() => setEditTaskId(null)}>Cancel</button>
  //             </>
  //           ) : (
  //             <>
  //               {t.text}{" "}
  //               <button onClick={() => handleEditTask(t.id)}>Edit</button>
  //               <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
  //             </>
  //           )}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}