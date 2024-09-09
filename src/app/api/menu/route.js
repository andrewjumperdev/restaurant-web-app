import MenuService from '../../backend/services/MenuServices';
import { connectToDatabase } from '../../backend/config/db';

export async function GET(request) {
    await connectToDatabase();

    const menuService = new MenuService();

    const menuItems = await menuService.getAllMenuItems();

    return new Response(JSON.stringify(menuItems), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
