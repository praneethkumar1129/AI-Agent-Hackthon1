import React, { useState } from 'react';
import { Send, History, LogOut, Bot, User, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatBot from './ChatBot';
import { currentApiService } from '../config/api';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello ${user?.name}! I'm your Internal Docs Q&A Assistant. I can help you with company policies, procedures, and guidelines. What would you like to know?`,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Call Bedrock Agent via API
      const response = await currentApiService.sendQuery(message);
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I'm experiencing technical difficulties. Please contact:\n\n📞 Company Helpline: 8500\n📧 Email: company.ac.in.com",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('leave') || lowerQuery.includes('vacation')) {
      return "Based on our HR policies:\n\n• Annual Paid Leave: 18 days\n• Sick Leave: 12 days (no carry forward)\n• Casual Leave: 7 days (approval required)\n• Maternity Leave: 26 weeks\n• Paternity Leave: 10 days\n\nWould you like more details about any specific leave type?";
    }
    
    if (lowerQuery.includes('working hours') || lowerQuery.includes('attendance')) {
      return "Our attendance policy includes:\n\n• Working hours: 9:30 AM – 6:30 PM\n• Lunch break: 1 hour\n• Tea breaks: 2 breaks of 15 minutes each\n• Grace time: 15 minutes allowed (max 3 times/month)\n• Half-day marked if late > 2 hours";
    }
    
    if (lowerQuery.includes('brand') || lowerQuery.includes('logo') || lowerQuery.includes('colors')) {
      return "Our brand guidelines specify:\n\n• Logo: Only official PNG/SVG formats allowed\n• Primary colors: #0052cc (Blue), #36B37E (Green)\n• Fonts: Montserrat for headings, Roboto for body text\n• Important: Do not alter brand assets\n\nNeed help with specific brand materials?";
    }
    
    if (lowerQuery.includes('password') || lowerQuery.includes('security') || lowerQuery.includes('2fa')) {
      return "IT Security requirements:\n\n• Strong passwords (minimum 12 characters)\n• Two-Factor Authentication (2FA) required for critical systems\n• Company-approved antivirus and firewall mandatory\n• Data encryption required for laptops and mobile devices\n\nNeed help setting up 2FA?";
    }
    
    if (lowerQuery.includes('remote') || lowerQuery.includes('vpn') || lowerQuery.includes('work from home')) {
      return "Remote access policy:\n\n• Access only via secure VPN\n• Avoid public Wi-Fi unless VPN is active\n• Log off after work hours\n• Access logs monitored by IT security\n\nContact IT for VPN setup assistance.";
    }
    
    return "I'm sorry, I couldn't find specific information about your query in our current knowledge base. Please contact:\n\n📞 Company Helpline: 8500\n📧 Email: company.ac.in.com\n\nOur support team will be happy to assist you further!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-xl mr-3 transform hover:rotate-12 transition-transform duration-300">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Internal Docs Q&A</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                <User className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-medium text-green-800">{user?.name}</span>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Instructions Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-4 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">💡 How to Use</h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start group hover:bg-blue-50 p-2 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
                  <p>Ask about HR policies like leave, attendance, or onboarding</p>
                </div>
                <div className="flex items-start group hover:bg-green-50 p-2 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
                  <p>Inquire about IT security guidelines and remote work policies</p>
                </div>
                <div className="flex items-start group hover:bg-purple-50 p-2 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
                  <p>Get brand guidelines and marketing procedures</p>
                </div>
                <div className="flex items-start group hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
                  <p>Type your question naturally in the chat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Bot */}
          <div className="lg:col-span-2">
            <ChatBot messages={messages} onSendMessage={handleSendMessage} />
          </div>

          {/* Sample Questions */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-4 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">🚀 Sample Questions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleSendMessage("What's our annual leave policy?")}
                  className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-500 hover:to-indigo-500 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium border border-blue-100 hover:border-transparent transform hover:scale-105 hover:shadow-lg"
                >
                  📅 What's our annual leave policy?
                </button>
                <button
                  onClick={() => handleSendMessage("How do I set up VPN for remote work?")}
                  className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-500 hover:to-emerald-500 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium border border-green-100 hover:border-transparent transform hover:scale-105 hover:shadow-lg"
                >
                  🔒 How do I set up VPN for remote work?
                </button>
                <button
                  onClick={() => handleSendMessage("What are our brand colors?")}
                  className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium border border-purple-100 hover:border-transparent transform hover:scale-105 hover:shadow-lg"
                >
                  🎨 What are our brand colors?
                </button>
                <button
                  onClick={() => handleSendMessage("What's the password policy?")}
                  className="w-full text-left p-4 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-500 hover:to-red-500 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium border border-orange-100 hover:border-transparent transform hover:scale-105 hover:shadow-lg"
                >
                  🛡️ What's the password policy?
                </button>
                <button
                  onClick={() => handleSendMessage("What are our working hours?")}
                  className="w-full text-left p-4 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-500 hover:to-cyan-500 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium border border-teal-100 hover:border-transparent transform hover:scale-105 hover:shadow-lg"
                >
                  ⏰ What are our working hours?
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;