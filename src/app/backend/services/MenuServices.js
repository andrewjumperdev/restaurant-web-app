import { connectToDatabase } from '../config/db.js';
import { ObjectId } from 'mongodb';
import MenuItem from '../models/MenuItem';

class MenuService {
    async addMenuItem(itemData) {
        const db = await connectToDatabase();
        const collection = db.collection('menuItems');

        const menuItem = new MenuItem(
            itemData.title,
            itemData.price,
            itemData.description,
            itemData.imageUrl,
            itemData.category
        );

        await collection.insertOne(menuItem.toJSON());
    }

    async getAllMenuItems() {
        const db = await connectToDatabase();
        const collection = db.collection('menuItems');
        const items = await collection.find({}).toArray();
        return items;
    }

    async getMenuItemById(id) {
        const db = await connectToDatabase();
        const collection = db.collection('menuItems');

        try {
            // Convertir el ID de cadena a ObjectId para que MongoDB lo entienda
            const menuItem = await collection.findOne({ _id: new ObjectId(id) });

            if (!menuItem) {
                throw new Error('Item not found');
            }

            return menuItem;
        } catch (error) {
            console.error('Error fetching menu item by ID:', error);
            throw error;  // Propagar el error para manejarlo a nivel de la API
        }
    }
}

export default MenuService;
