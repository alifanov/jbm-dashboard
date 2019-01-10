"use strict";

const axios = require("axios");

var MongoClient = require("mongodb").MongoClient;

let atlas_connection_uri;
let cachedDb = null;

const DB_NAME = "jbm-data";
const COLLECTION_NAME = "tasks";
const SOURCE_NAME = "asana";
const LAST_TASKS = 10;

module.exports.addAsanaTask = async (event, context) => {
  let result = '';
  let uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
  let callback = context.done;
  const data = JSON.parse(event.body);
  if (atlas_connection_uri != null) {
    result = await processEvent(data, context, callback);
  } else {
    atlas_connection_uri = uri;
    console.log("the Atlas connection string is " + atlas_connection_uri);
    result = await processEvent(data, context, callback);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
    }),
  };
};

const processEvent = async (event, context, callback) => {
  const doc = {
    date: Date.now(),
    source: SOURCE_NAME,
    name: event.name,
    completed: event.completed.toLowerCase() === 'true',
    taskId: event.taskId,
    dueAt: event.dueAt && new Date(event.dueAt)
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

const createDoc = async (db, doc, callback) => {
  const result = await db.collection(COLLECTION_NAME).update({taskId: doc.taskId}, doc, {upsert: true});
  return "SUCCESS";
}


module.exports.getAsanaTasks = async (event, context) => {
  let result;
  let uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
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
      return await query(cachedDb, callback);
    } else {
      return await query(cachedDb, callback);
    }
  } catch (err) {
    console.error("an error occurred", err);
  }
};

const query = async (db, callback) => {
  const result = await db
    .collection(COLLECTION_NAME)
    .find()
    .sort({ _id: -1 })
    .limit(LAST_TASKS)
    .toArray();
  return result;
};
