import Esercizio from "@/models/Esercizio";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

interface Esercizio{
    id: number
    name: string
    muscular_group: string
    exercise_description: string
    reps_number: number
    sets_number: number
}

export async function GET  ()  {
    
    try{
        await connect();
        const newExercise = new Esercizio({
            id: 100,
            name: "Panca Piana",
            muscular_group: "Petto",
            exercise_description: "Esercizio per sviluppare i muscoli pettorali. Si esegue sdraiati su una panca con i piedi ben piantati a terra, sollevando un bilanciere verso l'alto.",
            reps_number: 5,
            sets_number: 3
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