import { client } from './clients';
import { ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';

export const getAllWords = async (inputKeyWords: string) => {
  const getWordsParams: ScanCommandInput = {
    TableName: 'Words',
  };
  const command = new ScanCommand(getWordsParams);

  const results = await client.send(command);
  return results;
};
