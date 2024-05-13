import Utente from "@/models/Utente";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {

    console.log("sono nell'api ");

    const {
        email,
          firstName,
          lastName,
          password,
          username,
          date_of_birth,
          user_weight,
          user_height,
          thighs,
          shoulders,
          waist,
          biceps,
          initials,
          goal,
    } = await request.json();
    
    await connect();
/*     try{

    }catch(error: any){
        return new NextResponse(error, {
            status: 217, 
        });
    } */
    

    const existingUser = await Utente.findOne({email});

    if(existingUser){
        return new NextResponse("email già registrata", {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUtente = new Utente({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        username,
        date_of_birth,
        user_weight,
        user_height,
        thighs,
        shoulders,
        waist,
        biceps,
        initials,
        goal,
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