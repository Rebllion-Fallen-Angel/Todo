// src/components/AuthScreen.jsx
import React from 'react';
import { User, UserPlus } from 'lucide-react';

export default function AuthScreen({
  authMode,
  setAuthMode,
  formData,
  setFormData,
  handleLogin,
  handleRegister,
  error
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
            <User size={48} className="mx-auto mb-3" />
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-indigo-100 mt-2">Manage your tasks efficiently</p>
          </div>

          <div className="p-8">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => { setAuthMode('login'); }}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  authMode === 'login'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setAuthMode('register'); }}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  authMode === 'register'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (authMode === 'login' ? handleLogin() : handleRegister())}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <button
                onClick={authMode === 'login' ? handleLogin : handleRegister}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 font-medium shadow-lg flex items-center justify-center gap-2"
              >
                {authMode === 'login' ? <User size={20} /> : <UserPlus size={20} />}
                {authMode === 'login' ? 'Login' : 'Register'}
              </button>
            </div>

            {authMode === 'login' && (
              <p className="mt-4 text-center text-sm text-gray-500">
                Demo: username: <span className="font-semibold">demo</span> | password: <span className="font-semibold">demo123</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}