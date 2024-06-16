import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json({ message: "Logout successful"}, { status: 200 });
        // Remove the cookie
        response.cookies.delete("token");
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Logout failed" }, { status: 500 });
    }
}