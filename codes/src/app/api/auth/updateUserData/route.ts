import connect from '@/utils/db';
import User from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    try {
        await connect();

        const userId = await validateJWT(request);
        if (!userId) {
            return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
        }

        const data = await request.json();

        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ data: updatedUser }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
