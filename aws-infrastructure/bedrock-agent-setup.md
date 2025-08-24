# Bedrock Agent Setup Guide

## Step 1: Create S3 Bucket for Document Storage

### 1.1 Create S3 Bucket
```bash
aws s3 mb s3://internal-docs-qa-bucket --region us-east-1
```

### 1.2 Upload Policy Documents
```bash
aws s3 cp HR_Policies_Notion.md s3://internal-docs-qa-bucket/
aws s3 cp IT_Policies_Confluence.html s3://internal-docs-qa-bucket/
aws s3 cp Marketing_Policies_Notion.md s3://internal-docs-qa-bucket/
aws s3 cp Finance_Policies.docx s3://internal-docs-qa-bucket/
aws s3 cp Engineering_Policies.docx s3://internal-docs-qa-bucket/
```

### 1.3 Set Bucket Policy for Bedrock Access
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "BedrockAgentAccess",
            "Effect": "Allow",
            "Principal": {
                "Service": "bedrock.amazonaws.com"
            },
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::internal-docs-qa-bucket",
                "arn:aws:s3:::internal-docs-qa-bucket/*"
            ]
        }
    ]
}
```

## Step 2: Create Knowledge Base

### 2.1 Navigate to Bedrock Console
1. Go to AWS Bedrock Console
2. Select "Knowledge bases" from the left menu
3. Click "Create knowledge base"

### 2.2 Configure Knowledge Base
- **Name**: `internal-docs-knowledge-base`
- **Description**: `Knowledge base for internal company policies and procedures`
- **IAM Role**: Create new service role or use existing

### 2.3 Data Source Configuration
- **Data source name**: `company-policies`
- **S3 URI**: `s3://internal-docs-qa-bucket/`
- **Chunking strategy**: Default chunking
- **Metadata**: Enable metadata extraction

### 2.4 Embeddings Model
- **Model**: `amazon.titan-embed-text-v1`
- **Vector database**: Amazon OpenSearch Serverless (recommended)

## Step 3: Create Bedrock Agent

### 3.1 Agent Configuration
1. Go to "Agents" in Bedrock Console
2. Click "Create Agent"
3. Configure basic settings:
   - **Agent name**: `internal-docs-qa-agent`
   - **Description**: `AI assistant for internal company documentation`
   - **Foundation model**: `anthropic.claude-3-sonnet-20240229-v1:0` or `amazon.nova-pro-v1:0`

### 3.2 Agent Instructions
```
You are an internal company AI assistant that helps employees find information about company policies, procedures, and guidelines. You have access to HR policies, IT security guidelines, marketing procedures, finance policies, and engineering standards.

When answering questions:
1. Always provide accurate information based on the company documents
2. Be helpful and professional in your responses
3. If you cannot find specific information, direct users to contact:
   - Company Helpline: 8500
   - Email: company.ac.in.com
4. Format your responses clearly with bullet points when appropriate
5. Always cite which policy document you're referencing

You can help with questions about:
- Leave policies and HR procedures
- IT security requirements and guidelines
- Brand guidelines and marketing procedures
- Finance policies and expense procedures
- Engineering standards and practices

If a query is outside your knowledge base, politely explain that you cannot help with that specific request and provide the contact information above.
```

### 3.3 Action Groups Configuration

#### Action Group 1: Document Retrieval
- **Name**: `DocumentRetrieval`
- **Description**: `Retrieve specific policy documents`
- **Lambda function**: `document-retrieval-function`
- **API Schema**:
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Document Retrieval API",
    "version": "1.0.0"
  },
  "paths": {
    "/get-policy": {
      "post": {
        "summary": "Get specific policy document",
        "operationId": "get_policy_document",
        "parameters": [
          {
            "name": "policy_type",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "enum": ["HR", "IT", "Marketing", "Finance", "Engineering"]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Policy document retrieved successfully"
          }
        }
      }
    },
    "/search-policies": {
      "post": {
        "summary": "Search across all policies",
        "operationId": "search_policies",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Search completed successfully"
          }
        }
      }
    }
  }
}
```

### 3.4 Knowledge Base Association
1. In the Agent configuration, go to "Knowledge bases"
2. Click "Add knowledge base"
3. Select the `internal-docs-knowledge-base` created earlier
4. Configure instruction for knowledge base:
```
Use this knowledge base to answer questions about company policies and procedures. Always reference the specific policy document when providing information.
```

## Step 4: Deploy Lambda Functions

### 4.1 Create IAM Role for Lambda
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::internal-docs-qa-bucket",
                "arn:aws:s3:::internal-docs-qa-bucket/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeAgent"
            ],
            "Resource": "*"
        }
    ]
}
```

### 4.2 Deploy Query Processor Lambda
```bash
# Create deployment package
zip -r query-processor.zip query-processor.py

# Deploy function
aws lambda create-function \
    --function-name query-processor \
    --runtime python3.9 \
    --role arn:aws:iam::YOUR-ACCOUNT:role/lambda-execution-role \
    --handler query-processor.lambda_handler \
    --zip-file fileb://query-processor.zip
```

### 4.3 Deploy Document Retrieval Lambda
```bash
# Create deployment package
zip -r document-retrieval.zip document-retrieval.py

# Deploy function
aws lambda create-function \
    --function-name document-retrieval-function \
    --runtime python3.9 \
    --role arn:aws:iam::YOUR-ACCOUNT:role/lambda-execution-role \
    --handler document-retrieval.lambda_handler \
    --zip-file fileb://document-retrieval.zip
```

## Step 5: Create API Gateway

### 5.1 Create REST API
1. Go to API Gateway Console
2. Create new REST API
3. Name: `internal-docs-api`

### 5.2 Create Resources and Methods
- **Resource**: `/query`
- **Method**: `POST`
- **Integration**: Lambda Function (`query-processor`)

### 5.3 Enable CORS
```json
{
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
}
```

### 5.4 Deploy API
1. Create deployment stage: `prod`
2. Note the API endpoint URL

## Step 6: Test the Agent

### 6.1 Test via Bedrock Console
1. Go to your agent in Bedrock Console
2. Use the test interface
3. Try sample queries:
   - "What's our leave policy?"
   - "How do I set up VPN for remote work?"
   - "What are our brand colors?"

### 6.2 Test via API Gateway
```bash
curl -X POST https://your-api-id.execute-api.region.amazonaws.com/prod/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is our annual leave policy?"}'
```

## Step 7: Update React App Configuration

Update the API endpoint in your React app:

```javascript
// src/config/api.js
export const API_CONFIG = {
  baseURL: 'https://your-api-id.execute-api.region.amazonaws.com/prod',
  endpoints: {
    query: '/query'
  }
};
```

## Troubleshooting

### Common Issues:
1. **Permission Errors**: Ensure IAM roles have correct permissions
2. **CORS Issues**: Verify CORS configuration in API Gateway
3. **Agent Not Responding**: Check CloudWatch logs for Lambda functions
4. **Knowledge Base Issues**: Ensure S3 bucket permissions are correct

### Monitoring:
- Use CloudWatch for Lambda function logs
- Monitor API Gateway metrics
- Check Bedrock Agent invocation logs