import { connectToDatabase } from '../../../backend/config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password, name, favoriteFood, location } = await request.json();

        if (!email || !password || !name || !favoriteFood || !location) {
            return new Response(JSON.stringify({ message: 'Todos los campos son requeridos' }), { status: 400 });
        }

        const db = await connectToDatabase();
        const existingUser = await db.collection('Users').findOne({ email });

        if (existingUser) {
            return new Response(JSON.stringify({ message: 'El usuario ya existe' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword, name, favoriteFood, location };

        await db.collection('Users').insertOne(newUser);

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return new Response(JSON.stringify({ token, user: { name, email } }), { status: 201 });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return new Response(JSON.stringify({ message: 'Error en el servidor', error: error.message }), { status: 500 });
    }
}
