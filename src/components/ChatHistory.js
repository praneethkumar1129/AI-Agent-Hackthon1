import React from 'react';
import { ArrowLeft, Bot, User, Calendar, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatHistory = ({ user, onLogout }) => {
  const navigate = useNavigate();

  // Sample conversation data based on company policies
  const sampleConversations = [
    {
      id: 1,
      title: "Leave Policy Inquiry",
      date: "2024-01-15",
      messages: [
        { type: 'user', content: "What's our annual leave policy?", time: "10:30 AM" },
        { type: 'bot', content: "Based on our HR policies:\n\n• Annual Paid Leave: 18 days\n• Sick Leave: 12 days (no carry forward)\n• Casual Leave: 7 days (approval required)\n• Maternity Leave: 26 weeks\n• Paternity Leave: 10 days", time: "10:30 AM" }
      ]
    },
    {
      id: 2,
      title: "Brand Guidelines Question",
      date: "2024-01-14",
      messages: [
        { type: 'user', content: "What are our official brand colors?", time: "2:15 PM" },
        { type: 'bot', content: "Our brand guidelines specify:\n\n• Primary colors: #0052cc (Blue), #36B37E (Green)\n• Fonts: Montserrat for headings, Roboto for body text\n• Logo: Only official PNG/SVG formats allowed\n• Important: Do not alter brand assets", time: "2:15 PM" }
      ]
    },
    {
      id: 3,
      title: "IT Security Policy",
      date: "2024-01-13",
      messages: [
        { type: 'user', content: "What are the password requirements?", time: "11:45 AM" },
        { type: 'bot', content: "IT Security requirements:\n\n• Strong passwords (minimum 12 characters)\n• Two-Factor Authentication (2FA) required for critical systems\n• Company-approved antivirus and firewall mandatory\n• Data encryption required for laptops and mobile devices", time: "11:45 AM" }
      ]
    },
    {
      id: 4,
      title: "Remote Work Policy",
      date: "2024-01-12",
      messages: [
        { type: 'user', content: "Can I work from home? What's the policy?", time: "9:20 AM" },
        { type: 'bot', content: "Remote access policy:\n\n• Access only via secure VPN\n• Avoid public Wi-Fi unless VPN is active\n• Log off after work hours\n• Access logs monitored by IT security\n\nContact IT for VPN setup assistance.", time: "9:20 AM" }
      ]
    },
    {
      id: 5,
      title: "Social Media Guidelines",
      date: "2024-01-11",
      messages: [
        { type: 'user', content: "What's our social media policy for employees?", time: "3:30 PM" },
        { type: 'bot', content: "Social Media Policy:\n\n• All posts must be approved by Marketing Head\n• Use only official handles for announcements\n• No employee should disclose project details on social media\n• Respond to comments in a professional manner", time: "3:30 PM" }
      ]
    }
  ];

  const [selectedConversation, setSelectedConversation] = React.useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-600 hover:text-primary transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Bot className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Chat History</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-2" />
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Past Conversations</h2>
                <p className="text-sm text-gray-600 mt-1">Click to view details</p>
              </div>
              
              <div className="divide-y">
                {sampleConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-4 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{conversation.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(conversation.date).toLocaleDateString()}
                        </div>
                      </div>
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conversation Detail */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">{selectedConversation.title}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedConversation.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-primary text-white ml-3' 
                              : 'bg-gray-200 text-gray-600 mr-3'
                          }`}
                        >
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap">
                            {message.content}
                          </div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to view the details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;