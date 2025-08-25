import React, { useState } from 'react';
import { User, Lock, Bot } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (credentials.username === 'raj.company.ac.in' && credentials.password === '123456') {
        onLogin({ 
          username: credentials.username, 
          name: 'Raj'
        });
      } else {
        alert('Invalid credentials. Please use the demo credentials provided.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-md p-8 transform hover:scale-105 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">Internal Docs Q&A</h1>
          <p className="text-gray-600">Sign in to access your AI assistant</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 hover:border-gray-300 bg-gray-50/50 focus:bg-white"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 hover:border-gray-300 bg-gray-50/50 focus:bg-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
            <p className="font-semibold text-gray-800 mb-2">🔑 Demo Credentials:</p>
            <div className="space-y-1">
              <p className="font-mono text-primary">raj.company.ac.in</p>
              <p className="font-mono text-primary">123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;