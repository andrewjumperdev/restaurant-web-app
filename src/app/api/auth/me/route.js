import { connectToDatabase } from '../../../backend/config/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    // Check if the request is a GET request
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Retrieve the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect to the database and find the user by ID
    const db = await connectToDatabase();
    const user = await db.collection('Users').findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data back as a response
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favoriteFood: user.favoriteFood,
        location: user.location,
      },
    });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
