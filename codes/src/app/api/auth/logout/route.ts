import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json({
            message: "Logout successful",
        });
        // Remove the cookie
        response.cookies.delete("token");
        return NextResponse.json({ message: 'User successfully logged out' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Logout failed" }, { status: 500 });
    }
}