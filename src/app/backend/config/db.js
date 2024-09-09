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
        const client = new MongoClient(uri, {useUnifiedTopology: true});

        await client.connect();

        const db = client.db(dbName);

        cachedClient = client;
        cachedDb = db;

        return db;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        throw new Error('Error al conectar con la base de datos');
    }
}
