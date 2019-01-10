"use strict";

var MongoClient = require("mongodb").MongoClient;

let atlas_connection_uri;
let cachedDb = null;

const DB_NAME = "jbm-data";
const COLLECTION_NAME = "records";
const SOURCE_NAME = "apple-health";
const LAST_DAYS = 10;

module.exports.getWeight = async (event, context) => {
  let result;
  var uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
  let callback = context.done;
  if (atlas_connection_uri != null) {
    result = await getData(event, context, callback);
  } else {
    atlas_connection_uri = uri;
    console.log("the Atlas connection string is " + atlas_connection_uri);
    result = await getData(event, context, callback);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    })
  };
};

const getData = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    if (cachedDb == null) {
      console.log("=> connecting to database");
      const client = await MongoClient.connect(
        atlas_connection_uri,
        { useNewUrlParser: true }
      );
      cachedDb = client.db(DB_NAME);
      return await queryWeightRecords(cachedDb, callback);
    } else {
      return await queryWeightRecords(cachedDb, callback);
    }
  } catch (err) {
    console.error("an error occurred", err);
  }
};

const queryWeightRecords = async (db, callback) => {
  const result = await db
    .collection(COLLECTION_NAME)
    .aggregate([
      { $match: { source: SOURCE_NAME } },
      {
        $project: {
          year: { $year: { $toDate: { $toLong: "$date" } } },
          month: { $month: { $toDate: { $toLong: "$date" } } },
          dayOfMonth: { $dayOfMonth: { $toDate: { $toLong: "$date" } } },
          weight: "$weight"
        }
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
            dayOfMonth: "$dayOfMonth"
          },
          weight: { $max: "$weight" }
        }
      }
    ])
    .sort({ _id: -1 })
    .limit(LAST_DAYS)
    .sort({_id: 1})
    .toArray();
  return result;
};
