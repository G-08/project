import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Utente from "@/models/Utente";
import Exercise from "@/models/Esercizio";
import axios from "axios";
import Esercizio from "@/models/Esercizio";

export async function POST (request: NextRequest)  {
    await connect();

    try{
        
        const reqBody = await request.json();
        console.log("!! sto in creaScheda");
        console.log(reqBody.initial);

        const exercises = await Exercise.find({});

        //console.log("!!!!!", exercises);

        const initial = reqBody.initial;
        const goal = reqBody.goal;
        
        const gambe: number[] = [];
        const schiena: number[] = [];
        const petto: number[] = [];
        const braccia: number[] = [];
        const addome: number[] = [];

        exercises.forEach(exercise => {
            const ex = new Esercizio(exercise);
            const group = String(ex.muscular_group).toLowerCase();
            //console.log(String(ex.muscular_group));

            if (group.includes('gambe') || group.includes('ischiocrurali') || group.includes('polpacci') || group.includes('glutei')) {
                gambe.push(ex.id);
            } 
            if (group.includes('schiena') || group.includes('dorsali') || group.includes('trapezi')) {
                schiena.push(ex.id);
            }
            if (group.includes('petto')) {
                petto.push(ex.id);
            }
            if (group.includes('bicipiti') || group.includes('tricipiti') || group.includes('spalle')) {
                braccia.push(ex.id);
            }
            if (group.includes('addominali') || group.includes('core')|| group.includes('obliqui')) {
                addome.push(ex.id);
            }
        });

        /*
        console.log("!gambe: ", gambe);
        console.log("!schiena: ", schiena);
        console.log("!petto: ", petto);
        console.log("!braccia: ", braccia);
        console.log("!addome: ", addome);*/

        var moltiplicatore1 = 1;
        var moltiplicatore2 = 1;
        
        switch(initial){
            case 1:
                moltiplicatore1 = 3;
                break;
            case 2:
                moltiplicatore1 = 2;
                break;
            case 3:
                moltiplicatore1 = 1;
                break;
            default:
                moltiplicatore1 = 1;
        }

        switch(goal){
            case 1:
                moltiplicatore2 = 1;
                break;
            case 2:
                moltiplicatore2 = 2;
                break;
            case 3:
                moltiplicatore2 = 3;
                break;
            default:
                moltiplicatore2 = 1;
        }

        const default_reps = 5;
        const defaultd_sets = 3;

        const ex_reps = default_reps*moltiplicatore1*moltiplicatore2;
        const ex_sets = defaultd_sets*moltiplicatore1*moltiplicatore2;


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