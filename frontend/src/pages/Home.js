import React from 'react';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      

      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-8">
        <div className="bg-white w-full max-w-xl rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Welcome to Your To-Do List</h1>
          <p className="text-center text-gray-600 mb-8">Organize your tasks and stay productive!</p>

          {/* Task Input and Add Button */}
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Enter new task..."
              className="w-3/4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-1/4 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200">
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Footer (Optional) */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 Your To-Do List App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
