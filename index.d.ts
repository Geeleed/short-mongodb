import { MongoClient, Db } from "mongodb";

interface DataAddress {
  connectionString: string;
  databaseName: string;
  collectionName: string;
}

const mongodbConnect = async (
  connectionString: string = "mongodb://127.0.0.1:27017/"
): Promise<MongoClient> => {
  try {
    const client: MongoClient = await MongoClient.connect(connectionString);
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const mongodbConnectThenInsert = async (
  dataAddress: DataAddress = {
    connectionString: "mongodb://127.0.0.1:27017/",
    databaseName: "database-test",
    collectionName: "collection-test",
  },
  data: Record<string, any> = { test_data: "this is test" }
): Promise<any> => {
  try {
    const { connectionString, databaseName, collectionName } = dataAddress;
    const client: MongoClient = await mongodbConnect(connectionString);
    const collection: Db = client.db(databaseName).collection(collectionName);
    const result = await collection.insertOne(data);
    await client.close();
    return result;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const mongodbConnectThenAggregate = async (
  dataAddress: DataAddress = {
    connectionString: "mongodb://127.0.0.1:27017/",
    databaseName: "database-test",
    collectionName: "collection-test",
  },
  aggregation: any[] = [{ $match: {} }]
): Promise<any[]> => {
  try {
    const { connectionString, databaseName, collectionName } = dataAddress;
    const client: MongoClient = await mongodbConnect(connectionString);
    const collection: Db = client.db(databaseName).collection(collectionName);
    const result = await collection.aggregate(aggregation).toArray();
    await client.close();
    return result;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export {
  mongodbConnect,
  mongodbConnectThenInsert,
  mongodbConnectThenAggregate,
  DataAddress,
};
