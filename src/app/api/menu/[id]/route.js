import MenuService from '../../../backend/services/MenuServices';
import { connectToDatabase } from '../../../backend/config/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import UserService from '@/app/backend/services/UserService';

export async function GET(request, { params }) {
    await connectToDatabase();

    const menuService = new MenuService();
    const userService = new UserService();
    const { id } = params;

    try {
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }

        const menuItem = await menuService.getMenuItemById(id);

        if (!menuItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        const commentsWithUserDetails = menuItem.reviews.length
            ? await Promise.all(
                menuItem.reviews.map(async (review) => {
                    const user = await userService.getUserById(review.userId);
                    return {
                        ...review,
                        userName: user ? user.name : 'Unknown User',
                    };
                })
              )
            : [];

        return NextResponse.json({ ...menuItem, reviews: commentsWithUserDetails }, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    await connectToDatabase();

    const menuService = new MenuService();
    const { id } = params;
    const { rating, comment } = await request.json();

    try {
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        if (!rating || !comment) {
            return NextResponse.json({ message: 'Rating y comentario son requeridos' }, { status: 400 });
        }
        if (rating < 1 || rating > 5) {
            return NextResponse.json({ message: 'Rating debe estar entre 1 y 5' }, { status: 400 });
        }

        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ message: 'Token inválido' }, { status: 403 });
        }

        const userId = decoded.userId;

        const menuItem = await menuService.getMenuItemById(id);
        if (!menuItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        const newReview = {
            userId: new ObjectId(userId),
            rating,
            comment,
            date: new Date(),
        };

        await menuService.addReviewToMenuItem(id, newReview);

        return NextResponse.json({ message: 'Review added successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
