import { MongoClient } from "mongodb";
const mongodbConnect = async (
  connectionString = "mongodb://127.0.0.1:27017/"
) => {
  try {
    const client = await MongoClient.connect(connectionString);
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
const mongodbConnectThenInsert = async (
  dataAddress = {
    connectionString: "mongodb://127.0.0.1:27017/",
    databaseName: "database_test",
    collectionName: "collection_test",
  },
  data = { test_data: "this is test" }
) => {
  try {
    const { connectionString, databaseName, collectionName } = dataAddress;
    const client = await mongodbConnect(connectionString);
    const collection = client.db(databaseName).collection(collectionName);
    const result = await collection.insertOne(data);
    await client.close();
    return result;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
const mongodbConnectThenAggregate = async (
  dataAddress = {
    connectionString: "mongodb://127.0.0.1:27017/",
    databaseName: "database_test",
    collectionName: "collection_test",
  },
  aggregation = [{ $match: {} }]
) => {
  try {
    const { connectionString, databaseName, collectionName } = dataAddress;
    const client = await mongodbConnect(connectionString);
    const collection = client.db(databaseName).collection(collectionName);
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
};

// const dataAddress = {
//   connectionString: "mongodb://127.0.0.1:27017/",
//   databaseName: "caplink",
//   collectionName: "map",
// };

// // เรียกใช้งาน mongodbConnectThenAggregate ในรูปแบบ async เนื่องจากมีการใช้ await ในฟังก์ชัน
// mongodbConnectThenAggregate(dataAddress)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
