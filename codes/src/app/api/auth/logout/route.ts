import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        message: "Logout effettuato",
    });

    response.cookies.delete("token");
    return response;
}