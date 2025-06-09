import json
import boto3
from decimal import Decimal
import os

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE', 'visitor-counter')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    AWS Lambda function to get and increment visitor count
    """
    try:
        # Get the current count
        response = table.get_item(
            Key={
                'id': 'visitors'
            }
        )
        
        # If the item exists, increment it; otherwise create it
        if 'Item' in response:
            current_count = response['Item']['count']
            updated_count = current_count + 1
            
            # Update the count in DynamoDB
            table.update_item(
                Key={
                    'id': 'visitors'
                },
                UpdateExpression='SET #count = :count',
                ExpressionAttributeNames={
                    '#count': 'count'
                },
                ExpressionAttributeValues={
                    ':count': updated_count
                }
            )
        else:
            # If the item doesn't exist, create it with count = 1
            updated_count = 1
            table.put_item(
                Item={
                    'id': 'visitors',
                    'count': updated_count
                }
            )
        
        # Return the updated count
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # Required for CORS
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            'body': json.dumps({
                'count': updated_count
            })
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            'body': json.dumps({
                'error': str(e)
            })
        }
