import Utente from "@/models/Utente";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const {username, email, password} = await request.json();

    await connect();

    const existingUser = await Utente.findOne({email});

    if(existingUser){
        return new NextResponse("email già esistente", {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUtente = new Utente

    try {
        
    } catch (error: any) {
        return new NextResponse(error, {
            status: 500, 
        });
    }
}