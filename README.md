# Internal Docs Q&A Agent for Teams

A comprehensive AI-powered solution for internal company documentation queries using AWS Bedrock, React, and modern web technologies.

## 🚀 Project Overview

This hackathon project solves the problem of employees wasting time searching across multiple platforms (Notion, Google Docs, Confluence) for internal processes and updates. The solution provides a centralized AI assistant that can answer natural language questions about company policies and procedures.

## 🏗️ Architecture

### Frontend (React Web App)
- **User Authentication**: Simple login system
- **Interactive Chatbot**: Real-time Q&A interface
- **Chat History**: View past conversations
- **Responsive Design**: Modern UI with Tailwind CSS

### Backend (AWS Infrastructure)
- **Amazon Bedrock Agent**: AI agent with Nova Pro model
- **Knowledge Base**: S3-backed document storage with vector search
- **Lambda Functions**: Query processing and document retrieval
- **API Gateway**: RESTful API for frontend communication
- **S3 Storage**: Company policy documents storage

## 📁 Project Structure

```
AI-Agent-Hackthon/
├── webapp/                          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js            # Authentication component
│   │   │   ├── Dashboard.js        # Main dashboard with chatbot
│   │   │   ├── ChatBot.js          # Interactive chat interface
│   │   │   └── ChatHistory.js      # Past conversations view
│   │   ├── config/
│   │   │   └── api.js              # API configuration and services
│   │   ├── App.js                  # Main app component with routing
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Tailwind CSS styles
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── package.json                # Dependencies and scripts
│   └── tailwind.config.js          # Tailwind configuration
├── aws-infrastructure/              # AWS backend components
│   ├── lambda-functions/
│   │   ├── query-processor.py      # Main query processing Lambda
│   │   └── document-retrieval.py   # Document retrieval action group
│   └── bedrock-agent-setup.md      # Detailed setup instructions
├── HR_Policies_Notion.md           # Sample HR policies
├── Marketing_Policies_Notion.md    # Sample marketing policies
├── IT_Policies_Confluence.html     # Sample IT policies
├── Finance_Policies.docx           # Sample finance policies
├── Engineering_Policies.docx       # Sample engineering policies
└── README.md                       # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- AWS CLI configured with appropriate permissions
- AWS account with Bedrock access enabled

### 1. Frontend Setup

```bash
# Navigate to webapp directory
cd webapp

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

### 2. AWS Infrastructure Setup

Follow the detailed instructions in `aws-infrastructure/bedrock-agent-setup.md`:

1. **Create S3 Bucket** for document storage
2. **Upload Policy Documents** to S3
3. **Create Bedrock Knowledge Base** with S3 data source
4. **Configure Bedrock Agent** with Nova Pro model
5. **Deploy Lambda Functions** for query processing
6. **Setup API Gateway** for frontend communication

### 3. Configuration

Update the API endpoint in `webapp/src/config/api.js`:

```javascript
export const API_CONFIG = {
  baseURL: 'https://your-api-id.execute-api.region.amazonaws.com/prod',
  // ... rest of config
};
```

## 🎯 Features

### User Interface
- **Modern Design**: Clean, responsive interface using Tailwind CSS
- **Brand Compliance**: Uses company colors (#0052cc, #36B37E) and fonts
- **Interactive Chat**: Real-time messaging with typing indicators
- **Chat History**: Browse and review past conversations
- **User Authentication**: Simple login system

### AI Capabilities
- **Natural Language Processing**: Understands conversational queries
- **Policy Knowledge**: Trained on HR, IT, Marketing, Finance, and Engineering policies
- **Contextual Responses**: Provides relevant, formatted answers
- **Fallback Support**: Directs users to human support when needed

### Sample Queries the Agent Can Handle
- "What's our annual leave policy?"
- "How do I set up VPN for remote work?"
- "What are our brand colors and fonts?"
- "What's the password policy?"
- "How to request design assets?"
- "What are the working hours?"

## 🔧 Technical Details

### Frontend Technologies
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Axios**: HTTP client for API calls

### AWS Services Used
- **Amazon Bedrock**: AI agent and knowledge base
- **Amazon Nova Pro**: Foundation model for natural language understanding
- **AWS Lambda**: Serverless compute for query processing
- **Amazon S3**: Document storage and retrieval
- **API Gateway**: RESTful API management
- **CloudWatch**: Logging and monitoring

### Security Features
- **CORS Configuration**: Proper cross-origin resource sharing
- **IAM Roles**: Least privilege access for AWS services
- **Input Validation**: Query sanitization and validation
- **Error Handling**: Graceful error responses

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to your preferred hosting service (Netlify, Vercel, S3, etc.)
```

### Backend Deployment
Follow the AWS infrastructure setup guide to deploy:
1. Lambda functions
2. API Gateway
3. Bedrock Agent configuration
4. S3 bucket setup

## 📊 Sample Data

The project includes sample company policies:
- **HR Policies**: Leave, attendance, onboarding, ethics
- **IT Policies**: Security, remote access, email, software usage
- **Marketing Policies**: Brand guidelines, social media, content, events
- **Finance Policies**: (Document placeholder)
- **Engineering Policies**: (Document placeholder)

## 🎨 Design System

### Colors
- **Primary**: #0052cc (Company Blue)
- **Secondary**: #36B37E (Company Green)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Montserrat font family
- **Body Text**: Roboto font family

## 🔍 Troubleshooting

### Common Issues
1. **CORS Errors**: Check API Gateway CORS configuration
2. **Authentication Issues**: Verify IAM roles and permissions
3. **Agent Not Responding**: Check CloudWatch logs for Lambda functions
4. **Knowledge Base Issues**: Ensure S3 bucket permissions are correct

### Development Mode
The app uses mock API responses in development mode. Set `NODE_ENV=production` to use real AWS services.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for hackathon purposes. Please ensure compliance with your organization's policies before using in production.

## 📞 Support

For technical issues or questions:
- **Company Helpline**: 8500
- **Email**: company.ac.in.com

---

Built with ❤️ for the AI Agent Hackathon