import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Utente from "@/models/Utente";
import Exercise from "@/models/Esercizio";
import Allenamento from "@/models/Allenamento"
//import axios from "axios";

export async function POST (request: NextRequest)  {
    await connect();

    interface Esercizio{
        id: number
        name: string
        muscular_group: string
        exercise_description: string
        reps_number: number
        sets_number: number
    }

    try{
        
        const reqBody = await request.json();
        console.log("!! sto in creaScheda");
        console.log(reqBody.initial);

        const all_exercises = await Exercise.find({});

        //console.log("!!!!!", exercises);

        const initial = reqBody.initial;
        const goal = reqBody.goal;
        
        const gambe: number[] = [];
        const schiena: number[] = [];
        const petto: number[] = [];
        const braccia: number[] = [];
        const addome: number[] = [];

        all_exercises.forEach(exercise => {
            const ex = new Exercise(exercise);
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

        const moltiplicatore1 = 4-initial;
        const moltiplicatore2 = goal;
      
        const selectRandomExercises = (array: number[], count: number): number[] => {
            const selected: number[] = [];
            while (selected.length < count && array.length > 0) {
                const randomIndex = Math.floor(Math.random() * array.length);
                const [removed] = array.splice(randomIndex, 1);
                selected.push(removed);
            }
            return selected;
        };
        
        const ex_per_gruppo = 3;

        const selectedGambe = selectRandomExercises(gambe, ex_per_gruppo);
        const selectedSchiena = selectRandomExercises(schiena, ex_per_gruppo);
        const selectedPetto = selectRandomExercises(petto, ex_per_gruppo);
        const selectedBraccia = selectRandomExercises(braccia, ex_per_gruppo);
        const selectedAddome = selectRandomExercises(addome, ex_per_gruppo);
        
        console.log('Selected Gambe:', selectedGambe);
        const exercises_gambe: Esercizio[] = [];
        selectedGambe.forEach(selectedID => {
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            console.log("!!! es preso: ", exerciseToAdd);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                exercises_gambe.push(exerciseToAdd);
            }
        });
        console.log("esercizi: ", exercises_gambe);

        console.log('Selected Schiena:', selectedSchiena);
        const exercises_schiena: Esercizio[] = [];
        selectedSchiena.forEach(selectedID => {
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                exercises_gambe.push(exerciseToAdd);
            }
        });
        console.log("esercizi: ", exercises_schiena);

        console.log('Selected Petto:', selectedPetto);
        const exercises_petto: Esercizio[] = [];
        selectedPetto.forEach(selectedID => {    
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                exercises_gambe.push(exerciseToAdd);
            }
        });
        console.log("esercizi: ", exercises_petto);

        console.log('Selected Braccia:', selectedBraccia);
        const exercises_braccia: Esercizio[] = [];
        selectedBraccia.forEach(selectedID => {    
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                exercises_gambe.push(exerciseToAdd);
            }
        });
        console.log("esercizi: ", exercises_braccia);

        console.log('Selected Addome:', selectedAddome);
        const exercises_addome: Esercizio[] = [];
        selectedAddome.forEach(selectedID => {
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                exercises_gambe.push(exerciseToAdd);
            }
        });
        console.log("esercizi: ", exercises_addome);

        const allenamento_gambe = new Allenamento();
        allenamento_gambe.muscular_group="Gambe";

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