import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

export const client = new DynamoDBClient({ region: 'ap-northeast-1' });
