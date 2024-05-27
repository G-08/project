
import Utente from "@/models/Utente";
import connect from '@/utils/db';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST( request: NextRequest) {
    try{
        const reqBody = await request.json();
         // check if user exists in the DB or not 
        const user = await Utente.findOne({ email: reqBody.email });
        if (!user) { 
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        // password match
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        console.log(hashedPassword ,"     ", user.password);
        
        const passwordMatch = await bcrypt.compare(reqBody.password, user.password);

        //console.log("!!!!! pw match: ", passwordMatch);

        if (!passwordMatch) { 
            return NextResponse.json({ message: 'Old password is incorrect' }, { status: 400 });
        }
        
        // create token
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret!, { expiresIn: "2h"}); 
        const response = NextResponse.json({ message: "Accesso corretto", }) 
        response.cookies.set("token", token, { httpOnly: true, path: "/", });
        return NextResponse.json({ message: 'User successfully logged in' }, { status: 200 });
    }
    catch (error: any) {
        return NextResponse.json({
            message: error.message, 
        },
        { status: 500 } );
    }
}
