import json
import boto3
import logging
from datetime import datetime

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize AWS clients
bedrock_agent = boto3.client('bedrock-agent-runtime')

def lambda_handler(event, context):
    """
    Lambda function to process user queries and interact with Bedrock Agent
    """
    try:
        # Parse the incoming request
        body = json.loads(event.get('body', '{}'))
        user_query = body.get('query', '')
        session_id = body.get('sessionId', f"session-{datetime.now().timestamp()}")
        
        if not user_query:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Query is required'
                })
            }
        
        # Call Bedrock Agent
        agent_id = 'YOUR_AGENT_ID'  # Replace with your actual agent ID
        agent_alias_id = 'TSTALIASID'  # Test alias ID
        
        response = bedrock_agent.invoke_agent(
            agentId=agent_id,
            agentAliasId=agent_alias_id,
            sessionId=session_id,
            inputText=user_query
        )
        
        # Process the response
        agent_response = ""
        for event in response['completion']:
            if 'chunk' in event:
                chunk = event['chunk']
                if 'bytes' in chunk:
                    agent_response += chunk['bytes'].decode('utf-8')
        
        # Log the interaction
        logger.info(f"User query: {user_query}")
        logger.info(f"Agent response: {agent_response}")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'response': agent_response,
                'sessionId': session_id,
                'timestamp': datetime.now().isoformat()
            })
        }
        
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        
        # Fallback response
        fallback_response = (
            "I'm sorry, I couldn't process your query at the moment. "
            "Please contact our support team:\n\n"
            "📞 Company Helpline: 8500\n"
            "📧 Email: company.ac.in.com"
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'response': fallback_response,
                'sessionId': session_id,
                'timestamp': datetime.now().isoformat()
            })
        }