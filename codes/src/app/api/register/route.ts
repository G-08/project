import Utente from "@/models/Utente";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const {
        email,
        username,
        password,
        initial,
        goal,
        updateFields,
        firstName,
        lastName,
        age,
        user_height,
        user_weight,
        thighs,
        shoulders,
        waist,
        biceps,
    } = await request.json();

    await connect();

    const existingUser = await Utente.findOne({email});

    if(existingUser){
        return new NextResponse("email già registrata", {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUtente = new Utente({
        email,
        username,
        password: hashedPassword,
        initial,
        goal,
        updateFields,
        firstName,
        lastName,
        age,
        user_height,
        user_weight,
        thighs,
        shoulders,
        waist,
        biceps,
    })

    try {
        await newUtente.save();
        return new NextResponse("utente registrato", {status: 200
            
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: 500, 
        });
    }
}