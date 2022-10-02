import { ScanCommand ,QueryCommand} from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../db/ddbDocClient';
import { WordModel } from './words.interface';

export class WordsRepository {
  public async findAll(inputWord: string): Promise<WordModel[]> {
    let words: WordModel[];
    const params = {
      TableName: 'Words',
      /*
      Convert the JavaScript object defining the objects to the required
      Amazon DynamoDB record. The format of values specifies the datatype. The
      following list demonstrates different datatype formatting requirements:
      String: "String",
      NumAttribute: 1,
      BoolAttribute: true,
      ListAttribute: [1, "two", false],
      MapAttribute: { foo: "bar" },
      NullAttribute: null
       */
      //KeyConditionExpression: 'id = :s',
      ExpressionAttributeValues: {
        //':s': '222',
        ':english': inputWord,
      },
      // Filter that returns only episodes that meet previous criteria and have the subtitle 'The Return'
      FilterExpression: 'english = :english',
    };
    try {
      const data = await ddbDocClient.send(new ScanCommand(params));
      console.log('Success. Item details: ', data);
      // console.log("Success. Item details: ", data.Items);
      words = JSON.parse(JSON.stringify(data.Items));
      return words;
    } catch (err) {
      console.log('Error', err);
    }
  }

  public async findItem(id: number): Promise<WordModel> {
    let word: WordModel;
    const params = {
      TableName: 'Words',
      KeyConditionExpression: 'id = :s',
      ExpressionAttributeValues: {
        ':s': id,
      },
      // Filter that returns only episodes that meet previous criteria and have the subtitle 'The Return'
      //FilterExpression: 'english = :english',
    };
    try {
      const data = await ddbDocClient.send(new QueryCommand(params));
      console.log('Success. Item details: ', data);
      // console.log("Success. Item details: ", data.Items);
      word = JSON.parse(JSON.stringify(data.Items));
      return word;
    } catch (err) {
      console.log('Error', err);
    }
  }
}
