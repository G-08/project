import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Utente from "@/models/Utente";
import axios from "axios";

export async function POST (request: NextRequest)  {
    await connect();

    try{
        
        const reqBody = await request.json();
        console.log("!! sto in creaScheda");
        const exercises = await axios.get("api/creaScheda/getExercises");

        console.log("!!!!!", exercises.data);

        const initial =  reqBody.initial;
        const goal = reqBody.goal;


        return NextResponse.json({
            message: "scheda creata correttamente",
            //data: newUtente,
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