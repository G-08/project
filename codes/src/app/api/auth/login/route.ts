import Utente from "@/models/Utente";
import connect from '@/utils/db';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await connect();

        const reqBody = await request.json();

        // Check if user exists in the DB or not 
        const user = await Utente.findOne({ email: reqBody.email });
        if (!user) { 
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
        if (!passwordMatch) { 
            return NextResponse.json({ message: 'Password is incorrect' }, { status: 400 });
        }

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "2h" }); 

        // Set the token in cookies
        const response = NextResponse.json({ message: "Accesso corretto" }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true, path: "/", });

        return response;
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        }, { status: 500 });
    }
}
