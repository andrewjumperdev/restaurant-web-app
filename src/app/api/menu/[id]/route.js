import MenuService from '../../../backend/services/MenuServices';
import { connectToDatabase } from '../../../backend/config/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    await connectToDatabase(); // Asegúrate de que estás conectado a la base de datos

    const menuService = new MenuService();
    const { id } = params; // Obtener el id de los parámetros de la ruta

    try {
        // Verifica que el ID tenga un formato válido de ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }

        const menuItem = await menuService.getMenuItemById(id); // Buscar ítem por id

        if (!menuItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(menuItem, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
