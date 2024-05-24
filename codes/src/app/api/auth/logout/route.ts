import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Clear the cookies or invalidate the session token here
        const response = NextResponse.json({ message: 'Logged out successfully' });
        
        // Assuming you have a cookie named 'authToken' for authentication
        response.cookies.set('authToken', '', { expires: new Date(0) }); // Clear the authToken cookie

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
    }
}
