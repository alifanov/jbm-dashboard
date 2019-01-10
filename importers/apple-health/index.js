let moment = require('moment');
let MongoClient = require("mongodb").MongoClient;

const csv = require('csvtojson')
const csvFilePath = 'health-data.csv'

let dbUri = process.env.MONGODB_ATLAS_CLUSTER_URI;

const client = new MongoClient(dbUri, {useNewUrlParser: true});

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {

    client.connect(function (err) {

      const db = client.db('jbm-data');
      saveWeight(db, jsonObj);
      client.close();
    });
  });

function saveWeight(db, records) {
  let preparedRecords = records.map(rec => ({
    date: moment(rec['Start'], 'D-MMM-YYYY HH:mm').toDate().getTime(),
    source: 'apple-health',
    weight: parseFloat(rec['Weight (kg)'])
  }));

  db.collection('records').insertMany(preparedRecords);
}



