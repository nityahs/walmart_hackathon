import React, { useEffect, useState } from "react";
import { fetchTasks, uploadFile, toggleTask } from "./api/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTasks().then((res) => setTasks(res.data));
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadFile(formData);
    setTasks(res.data.tasks);
  };

  const handleToggle = async (id) => {
    const res = await toggleTask(id);
    setTasks((prev) =>
      prev.map((t) => (t._id === res.data._id ? { ...t, completed: res.data.completed } : t))
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Smart To-Do Generator (Modular)</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-2 px-4 py-2 bg-blue-500 text-white">Upload</button>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            onClick={() => handleToggle(task._id)}
            className={`cursor-pointer p-2 my-2 border rounded ${task.completed ? "bg-green-200" : "bg-white"}`}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
