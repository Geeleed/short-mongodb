import {
  mongodbConnect,
  mongodbConnectThenInsert,
  mongodbConnectThenAggregate,
} from "./index.js";
const dataAddress = {
  connectionString: "mongodb://127.0.0.1:27017/",
  databaseName: "test_db",
  collectionName: "test_coll",
};
const data = {
  username: "geeleed",
  password: "1234",
};
// เรียกใช้งาน mongodbConnectThenAggregate ในรูปแบบ async เนื่องจากมีการใช้ await ในฟังก์ชัน
mongodbConnectThenInsert(dataAddress, data).catch((error) =>
  console.log(error)
);
mongodbConnectThenAggregate(dataAddress)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
