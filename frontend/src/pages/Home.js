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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddOrEdit();
                }
              }}
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

          {/* Task Cards Grid */}
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add your first task above.</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`task-card-item ${task.completed ? 'is-completed' : ''}`}
                >
                  <div className="task-card-header">
                    <span className={`status-chip ${task.completed ? 'chip-done' : 'chip-open'}`}>
                      {task.completed ? 'Done' : 'Open'}
                    </span>
                    <div className="task-actions">
                      <button
                        onClick={() => startEdit(task)}
                        className="edit-btn"
                        aria-label="Edit task"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="delete-btn"
                        aria-label="Delete task"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <button
                    className="task-card-title"
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                    aria-pressed={task.completed}
                    title={task.completed ? 'Mark as not done' : 'Mark as done'}
                  >
                    <span className={`task-title-text ${task.completed ? 'completed' : ''}`}>
                      {task.title}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
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
