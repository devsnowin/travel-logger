import { MongoClient } from 'mongodb';

const URL = process.env.DATABASE_URL;
const NAME = process.env.DB_NAME;

if (!URL || !NAME) throw new Error('DB_URL or DN_NAME is required!');

const client = new MongoClient(URL);
try {
  client.connect();
} catch (e) {
  console.log('Error in connect to db: ', e);
}

export default client.db(NAME);
