import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../db/ddbDocClient';

export class WordsRepository {
  public async getAll(): Promise<any> {
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
        ':english': 'test22',
      },
      // Filter that returns only episodes that meet previous criteria and have the subtitle 'The Return'
      FilterExpression: 'english = :english',
    };
    try {
      const data = await ddbDocClient.send(new ScanCommand(params));
      console.log('Success. Item details: ', data);
      // console.log("Success. Item details: ", data.Items);
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  }
}
