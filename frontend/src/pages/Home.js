import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:8070/api/todos";

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAddOrEdit = async () => {
    if (!input.trim()) return;

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, { title: input });
      } else {
        await axios.post(API, { title: input });
      }
      setInput('');
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/${id}`, { completed: !currentStatus });
      fetchTasks();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const startEdit = (task) => {
    setInput(task.title);
    setEditingId(task._id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow p-4 text-center font-bold text-xl text-gray-800">
        To-Do List App
      </header>

      <div className="flex-grow flex items-start justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-8">
        <div className="bg-white w-full max-w-xl rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {editingId ? 'Edit Task' : 'Add New Task'}
          </h1>

          {/* Task Input */}
          <div className="flex justify-center space-x-4 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your task..."
              className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddOrEdit}
              className="w-1/4 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>

          {/* Task List */}
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
              >
                <div
                  className={`flex-1 text-lg cursor-pointer ${
                    task.completed ? 'line-through text-gray-400' : ''
                  }`}
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                >
                  {task.title}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(task)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 Your To-Do List App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
