import { connectToDatabase } from '../../../backend/config/db';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];

        if (!token) {
            return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const db = await connectToDatabase();
        const user = await db.collection('Users').findOne({ _id: decoded.userId });

        if (!user) {
            return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), { status: 404 });
        }

        return new Response(JSON.stringify({ user: { name: user.name, email: user.email } }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error en el servidor', error: error.message }), { status: 500 });
    }
}
