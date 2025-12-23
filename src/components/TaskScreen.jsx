// src/components/TaskScreen.jsx
import React from 'react';
import { Trash2, Plus, CheckCircle2, Circle, Filter, LogOut } from 'lucide-react';

export default function TaskScreen({
  currentUser,
  inputValue,
  setInputValue,
  addTask,
  toggleTask,
  deleteTask,
  filter,
  setFilter,
  handleLogout,
  handleDeleteAccount
}) {
  const filteredTasks = currentUser.tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: currentUser.tasks.length,
    active: currentUser.tasks.filter(t => !t.completed).length,
    completed: currentUser.tasks.filter(t => t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
                <p className="text-indigo-100">Welcome back, {currentUser.username}!</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2 font-medium shadow-lg"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
          </div>

          {/* Filter & Delete Account */}
          <div className="px-6 pt-4 flex justify-between items-center">
            <div className="flex gap-2">
              {['all', 'active', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === f
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={handleDeleteAccount}
              className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              Delete Account
            </button>
          </div>

          {/* Task List */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Filter size={48} className="mx-auto mb-3 opacity-30" />
                <p>No tasks found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    className="group flex items-center gap-3 p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex-shrink-0 transition-transform hover:scale-110"
                    >
                      {task.completed ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                      ) : (
                        <Circle size={24} className="text-gray-300 group-hover:text-indigo-400" />
                      )}
                    </button>
                    <span
                      className={`flex-1 text-lg ${
                        task.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-700'
                      }`}
                    >
                      {task.text}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}