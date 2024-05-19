import Esercizio from "@/models/Esercizio";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

interface Esercizio{
    id: number
    nome: string
    gruppo_muscolare: string
    exercise_description: string
}

export async function POST  ()  {
    await connect();

    try{
        const newExercise = new Esercizio({
            id: 1,
            nome: "Panca Piana",
            gruppo_muscolare: "Petto",
            exercise_description: "Esercizio per sviluppare i muscoli pettorali. Si esegue sdraiati su una panca con i piedi ben piantati a terra, sollevando un bilanciere verso l'alto."
        });
        

        newExercise.save();

        return NextResponse.json({
            message: "esercizio creato correttamente",
            data: newExercise,
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