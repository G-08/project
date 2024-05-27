import Utente from "@/models/Utente";
import connect from  "@/utils/db"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST  (request: NextRequest)  {
    await connect();

    try{
        const reqBody = await request.json();
        
        const existingUser = await Utente.findOne({email: reqBody.email})

        if(existingUser){
            throw new Error("Utente già registrato con questa email");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;

        const newUtente = new Utente(reqBody);

        newUtente.save();

        return NextResponse.json({
            message: "utente creato correttamente",
            data: newUtente,
        },
        {
            status: 200
        })

    }catch(error: any){
        return NextResponse.json({
            message: error.message,
        },
        {
            status: 500
        }
        );
    }
}