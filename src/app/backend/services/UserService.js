import { connectToDatabase } from '../config/db';
import { ObjectId } from 'mongodb';

class UserService {
    async getUserById(userId) {
        const db = await connectToDatabase();
        const collection = db.collection('Users');
        return collection.findOne({ _id: new ObjectId(userId) });
    }
}

export default UserService;
