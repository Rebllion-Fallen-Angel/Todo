// src/App.jsx or src/components/TodoApp.jsx
import React, { useState } from 'react';
import AuthScreen from './AuthScreen';
import TaskScreen from './TaskScreen';

export default function TodoApp() {
  const [users, setUsers] = useState([
    { id: 1, username: 'demo', password: 'demo123', tasks: [] }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  // Auth Functions
  const handleLogin = () => {
    const user = users.find(u => u.username === formData.username && u.password === formData.password);
    if (user) {
      setCurrentUser(user);
      setError('');
      setFormData({ username: '', password: '' });
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = () => {
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (users.find(u => u.username === formData.username)) {
      setError('Username already exists');
      return;
    }

    const newUser = {
      id: Date.now(),
      username: formData.username,
      password: formData.password,
      tasks: []
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setError('');
    setFormData({ username: '', password: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setFormData({ username: '', password: '' });
    setError('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      setUsers(users.filter(u => u.id !== currentUser.id));
      setCurrentUser(null);
    }
  };

  // Task Functions
  const addTask = () => {
    if (inputValue.trim()) {
      const updatedUser = {
        ...currentUser,
        tasks: [...currentUser.tasks, { id: Date.now(), text: inputValue, completed: false }]
      };
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      setInputValue('');
    }
  };

  const toggleTask = (taskId) => {
    const updatedUser = {
      ...currentUser,
      tasks: currentUser.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    };
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  const deleteTask = (taskId) => {
    const updatedUser = {
      ...currentUser,
      tasks: currentUser.tasks.filter(task => task.id !== taskId)
    };
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  // Render auth screen if not logged in
  if (!currentUser) {
    return (
      <AuthScreen
        authMode={authMode}
        setAuthMode={setAuthMode}
        formData={formData}
        setFormData={setFormData}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        error={error}
      />
    );
  }

  // Render task screen if logged in
  return (
    <TaskScreen
      currentUser={currentUser}
      inputValue={inputValue}
      setInputValue={setInputValue}
      addTask={addTask}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
      filter={filter}
      setFilter={setFilter}
      handleLogout={handleLogout}
      handleDeleteAccount={handleDeleteAccount}
    />
  );
}