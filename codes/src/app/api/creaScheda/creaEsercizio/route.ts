import Esercizio from "@/models/Esercizio";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/exercise:
 *   get:
 *     summary: Get exercises
 *     tags:
 *       - Exercises
 *     responses:
 *       '200':
 *         description: A list of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Unique identifier for the exercise
 *                   name:
 *                     type: string
 *                     description: Name of the exercise
 *                   muscular_group:
 *                     type: string
 *                     description: Muscular group targeted by the exercise
 *                   exercise_description:
 *                     type: string
 *                     description: Description of how to perform the exercise
 *                   reps_number:
 *                     type: number
 *                     description: Number of repetitions recommended for the exercise
 *                   sets_number:
 *                     type: number
 *                     description: Number of sets recommended for the exercise
 *       '500':
 *         description: Server error
 */

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