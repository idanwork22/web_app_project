import { MongoClient } from 'mongodb';
import config from './config/config';

const uri = config.mongo.uri;
const dbName = config.mongo.dbName;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
  await client.connect();
  return client.db(dbName);
}

module.exports = { connect };
