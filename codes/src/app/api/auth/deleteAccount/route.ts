import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';

export async function DELETE(request: NextRequest) {
    try {
        await connect();

        // Validate JWT and get the user ID
        const userId = await validateJWT(request);
        if (!userId) {
            return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
        }

        // Find and delete the user by ID
        const user = await Utente.findByIdAndDelete(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
