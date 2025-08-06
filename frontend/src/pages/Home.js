import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css'; // Import the CSS file

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:8070/api/todos";

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
    <div className="home-container">
      {/* Navbar */}
      <header className="header">
        To-Do List App
      </header>

      <main className="main-section">
        <div className="task-card">
          <h1 className="form-title">
            {editingId ? 'Edit Task' : 'Add New Task'}
          </h1>

          {/* Task Input */}
          <div className="task-input-group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your task..."
              className="task-input"
            />
            <button
              onClick={handleAddOrEdit}
              className="task-button"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>

          {/* Task List */}
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <div
                  className={`task-title ${task.completed ? 'completed' : ''}`}
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                >
                  {task.title}
                </div>
                <div className="task-actions">
                  <button onClick={() => startEdit(task)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(task._id)} className="delete-btn">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Your To-Do List App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
