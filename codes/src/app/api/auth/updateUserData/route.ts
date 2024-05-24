import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import clientPromise from '@/utils/db'; // Adjust the import path based on your project structure

/* export async function PUT(request: NextRequest) {
    try {
        // Parse the request body
        const newData = await request.json();
        const { email, ...updateFields } = newData;

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Connect to the database
        const client = await clientPromise;
        const db = client.db('your-database-name'); // Replace with your database name
        const usersCollection = db.collection('users');

        // Update the user data in the database
        const result = await usersCollection.updateOne(
            { email },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User data updated successfully' });
    } catch (error) {
        console.error('Error updating user data:', error);
        return NextResponse.json({ message: 'Failed to update user data' }, { status: 500 });
    }
} */
