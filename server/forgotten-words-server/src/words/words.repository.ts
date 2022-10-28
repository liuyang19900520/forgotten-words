import { ScanCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../db/ddbDocClient";
import { WordModel } from "./words.interface";
import { isNil, isEmpty } from "lodash";

export class WordsRepository {
  public async findAll(inputWord: string): Promise<WordModel[]> {
    let words: WordModel[];
    let params = {
      TableName: "Words",
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
        ":inputWord": inputWord
      },
      // Filter that returns only episodes that meet previous criteria and have the subtitle 'The Return'
      FilterExpression: "begins_with(english,:inputWord) or begins_with(japanese,:inputWord) or begins_with(chinese,:inputWord)"
    };

    if (isNil(inputWord) || isEmpty(inputWord)) {
      params.ExpressionAttributeValues = undefined;
      params.FilterExpression = undefined;
    }
    try {
      const data = await ddbDocClient.send(new ScanCommand(params));
      words = JSON.parse(JSON.stringify(data.Items));
      return words;
    } catch (err) {
      console.log("Error", err);
    }
  }

  public async findItem(id: string): Promise<WordModel> {
    let word: WordModel;
    const params = {
      TableName: "Words",
      KeyConditionExpression: "id = :s",
      ExpressionAttributeValues: {
        ":s": id
      }
    };
    try {
      const data = await ddbDocClient.send(new QueryCommand(params));
      word = JSON.parse(JSON.stringify(data.Items));
      return word;
    } catch (err) {
      console.log("Error", err);
    }
  }

  public async deleteItem(id: string): Promise<void> {
    console.error("delete id ", id);
    const params = {
      TableName: "Words",
      Key: {
        id: id
      }
    };
    try {
      await ddbDocClient.send(new DeleteCommand(params));
      console.log("Success - item deleted");
    } catch (err) {
      console.log("Error", err);
    }
  }

  public async insertItem(word: WordModel): Promise<void> {
    const params = {
      TableName: "Words",
      Key: {
        id: word.id
      }
    };
    try {
      await ddbDocClient.send(new DeleteCommand(params));
      console.log("Success - item deleted");
    } catch (err) {
      console.log("Error", err);
    }
  }
}
