import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("AAAAAAAAAAAAAAAAAAAAA sono dentro logout");
    try {
        const response = NextResponse.json({ message: "Logout successful" });
        console.log("AAAAAAAAAAAAAAAA ", response);
        // Clear the token cookie by setting its expiration date in the past
        response.cookies.set("token", "", { expires: new Date(0), path: "/" });
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Logout failed" }, { status: 500 });
    }
}