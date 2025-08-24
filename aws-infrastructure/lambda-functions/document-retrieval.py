import json
import boto3
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize AWS clients
s3_client = boto3.client('s3')

def lambda_handler(event, context):
    """
    Lambda function for document retrieval action group
    """
    try:
        # Parse the action group input
        action_group = event.get('actionGroup', '')
        function_name = event.get('function', '')
        parameters = event.get('parameters', [])
        
        logger.info(f"Action Group: {action_group}, Function: {function_name}")
        
        if function_name == 'get_policy_document':
            return get_policy_document(parameters)
        elif function_name == 'search_policies':
            return search_policies(parameters)
        else:
            return {
                'response': {
                    'actionGroup': action_group,
                    'function': function_name,
                    'functionResponse': {
                        'responseBody': {
                            'TEXT': {
                                'body': 'Function not found'
                            }
                        }
                    }
                }
            }
            
    except Exception as e:
        logger.error(f"Error in document retrieval: {str(e)}")
        return {
            'response': {
                'actionGroup': event.get('actionGroup', ''),
                'function': event.get('function', ''),
                'functionResponse': {
                    'responseBody': {
                        'TEXT': {
                            'body': f'Error retrieving document: {str(e)}'
                        }
                    }
                }
            }
        }

def get_policy_document(parameters):
    """
    Retrieve specific policy document from S3
    """
    try:
        bucket_name = 'internal-docs-qa-bucket'  # Replace with your bucket name
        
        # Extract policy type from parameters
        policy_type = None
        for param in parameters:
            if param.get('name') == 'policy_type':
                policy_type = param.get('value')
                break
        
        if not policy_type:
            return create_response('Please specify the policy type (HR, IT, Marketing, Finance, Engineering)')
        
        # Map policy types to S3 objects
        policy_files = {
            'hr': 'HR_Policies_Notion.md',
            'it': 'IT_Policies_Confluence.html',
            'marketing': 'Marketing_Policies_Notion.md',
            'finance': 'Finance_Policies.docx',
            'engineering': 'Engineering_Policies.docx'
        }
        
        file_key = policy_files.get(policy_type.lower())
        if not file_key:
            return create_response('Policy type not found. Available types: HR, IT, Marketing, Finance, Engineering')
        
        # Retrieve document from S3
        response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
        content = response['Body'].read().decode('utf-8')
        
        return create_response(f"Retrieved {policy_type} policy document:\n\n{content}")
        
    except Exception as e:
        logger.error(f"Error retrieving policy document: {str(e)}")
        return create_response(f"Error retrieving policy document: {str(e)}")

def search_policies(parameters):
    """
    Search across all policy documents
    """
    try:
        # Extract search query from parameters
        search_query = None
        for param in parameters:
            if param.get('name') == 'query':
                search_query = param.get('value')
                break
        
        if not search_query:
            return create_response('Please provide a search query')
        
        # This is a simplified search - in production, you'd use more sophisticated search
        bucket_name = 'internal-docs-qa-bucket'
        policy_files = [
            'HR_Policies_Notion.md',
            'IT_Policies_Confluence.html',
            'Marketing_Policies_Notion.md'
        ]
        
        search_results = []
        for file_key in policy_files:
            try:
                response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
                content = response['Body'].read().decode('utf-8')
                
                if search_query.lower() in content.lower():
                    search_results.append(f"Found in {file_key}:\n{content[:500]}...")
                    
            except Exception as e:
                logger.warning(f"Could not search in {file_key}: {str(e)}")
        
        if search_results:
            return create_response(f"Search results for '{search_query}':\n\n" + "\n\n".join(search_results))
        else:
            return create_response(f"No results found for '{search_query}'. Please contact support at 8500 or company.ac.in.com")
            
    except Exception as e:
        logger.error(f"Error searching policies: {str(e)}")
        return create_response(f"Error searching policies: {str(e)}")

def create_response(body_text):
    """
    Create standardized response format for Bedrock Agent
    """
    return {
        'response': {
            'actionGroup': 'DocumentRetrieval',
            'function': 'get_policy_document',
            'functionResponse': {
                'responseBody': {
                    'TEXT': {
                        'body': body_text
                    }
                }
            }
        }
    }