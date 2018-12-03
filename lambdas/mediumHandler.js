"use strict";

const axios = require("axios");

var MongoClient = require("mongodb").MongoClient;

let atlas_connection_uri;
let cachedDb = null;

const DB_NAME = "jbm-data";
const COLLECTION_NAME = "records";
const SOURCE_NAME = "medium";
const LAST_DAYS = 10;

module.exports.saveMediumFollowersToMongoDB = async (event, context) => {
  var uri = process.env.MONGODB_ATLAS_CLUSTER_URI;

  let callback = context.done;
  if (atlas_connection_uri != null) {
    return await processEvent(event, context, callback);
  } else {
    atlas_connection_uri = uri;
    console.log("the Atlas connection string is " + atlas_connection_uri);
    return await processEvent(event, context, callback);
  }
};

async function processEvent(event, context, callback) {
  const res = await axios.get("https://medium.com/@jetbootsmaker/followers");
  const matched = /"usersFollowedByCount":(\d+),/.exec(res.data);
  const followersCount = parseInt(matched[1]);
  console.log("Followers:", followersCount);

  context.callbackWaitsForEmptyEventLoop = false;

  const doc = {
    date: Date.now(),
    source: SOURCE_NAME,
    followersCount
  };

  try {
    if (cachedDb == null) {
      console.log("=> connecting to database");
      const client = await MongoClient.connect(
        atlas_connection_uri,
        { useNewUrlParser: true }
      );
      cachedDb = client.db(DB_NAME);
      return await createDoc(cachedDb, doc, callback);
    } else {
      return await createDoc(cachedDb, doc, callback);
    }
  } catch (err) {
    console.error("an error occurred", err);
  }
}

async function createDoc(db, doc, callback) {
  const result = await db.collection(COLLECTION_NAME).insertOne(doc);
  console.log("Result:", result);
  return "SUCCESS";
}

module.exports.getMediumFollowersCount = async (event, context) => {
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
      return await queryMediumRecords(cachedDb, callback);
    } else {
      return await queryMediumRecords(cachedDb, callback);
    }
  } catch (err) {
    console.error("an error occurred", err);
  }
};

const queryMediumRecords = async (db, callback) => {
  const result = await db
    .collection(COLLECTION_NAME)
    .aggregate([
      { $match: { source: SOURCE_NAME } },
      {
        $project: {
          year: { $year: { $toDate: { $toLong: "$date" } } },
          month: { $month: { $toDate: { $toLong: "$date" } } },
          dayOfMonth: { $dayOfMonth: { $toDate: { $toLong: "$date" } } },
          // hour: { $hour: { $toDate: { $toLong: "$date" } } },
          followersCount: "$followersCount"
        }
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
            dayOfMonth: "$dayOfMonth"
            // hour: "$hour"
          },
          followersCount: { $max: "$followersCount" }
        }
      }
    ])
    .sort({ _id: 1 })
    .limit(LAST_DAYS)
    .toArray();
  return result;
};
