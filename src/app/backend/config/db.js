import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb && cachedClient) {
        return cachedDb;
    }

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    try {
        console.log('Connecting to MongoDB...');
        const client = new MongoClient(uri);

        await client.connect();
        console.log('Connected to MongoDB successfully');

        const db = client.db(dbName);

        cachedClient = client;
        cachedDb = db;

        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw new Error('Error connecting to the database');
    }
}
