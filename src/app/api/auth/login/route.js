import { connectToDatabase } from '../../../backend/config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        // Lee los datos del cuerpo de la solicitud
        const { email, password } = await request.json();

        // Verifica que el email y la contraseña estén presentes
        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Email y contraseña son requeridos' }), { status: 400 });
        }

        const db = await connectToDatabase();
        const user = await db.collection('Users').findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), { status: 401 });
        }

        // Verifica si la contraseña coincide
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Contraseña incorrecta' }), { status: 401 });
        }

        // Genera un token JWT para el usuario
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return new Response(JSON.stringify({ token, user: { name: user.name, email: user.email } }), { status: 200 });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return new Response(JSON.stringify({ message: 'Error en el servidor', error: error.message }), { status: 500 });
    }
}
