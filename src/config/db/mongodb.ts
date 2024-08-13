import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import 'dotenv/config';

const uri = process.env.DB_URI!;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDb() {
  try {
    await mongoose.connect(uri, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log('connected to db');
  } catch (error) {
    console.log('error db', error);
    process.exit(1);
  }
}
mongoose.connection.on('error', async (error) => {
  console.error('MongoDB connection error:', error);
  await mongoose.connection.close();
});
