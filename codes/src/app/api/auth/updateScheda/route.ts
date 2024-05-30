import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Utente from "@/models/Utente";
import Exercise from "@/models/Esercizio";
import CustomExercise from "@/models/EserciziPersonal"
import Workout from "@/models/Allenamento"
import Scheda from "@/models/Scheda"
import { validateJWT } from "@/helpers/validateJWT";
//import axios from "axios";

export async function POST (request: NextRequest)  {
    
    try{
        console.log("\nYOOOOOO STO IN UPDATE SCHEDA\n");
        await connect();

        // Validate JWT and get the user ID
        const userId = await validateJWT(request);
        if (!userId) {
            return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
        }

        // Find the user by ID
        const user = await Utente.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        interface Esercizio{
            id: number
            name: string
            muscular_group: string
            exercise_description: string
            reps_number: number
            sets_number: number
        }

        console.log("\n\nuser: ", user);
        console.log("\n!! aggiorno la scheda di : ", user.username, ", ",user.email);
        //console.log(reqBody.initial);

        const all_exercises = await Exercise.find({});

        const initial = user.initial;
        const goal = user.goal;

        const moltiplicatore1 = 4-initial;
        const moltiplicatore2 = goal;
        
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
      
        //funzione per ottenere 'count' esercizi casuali da 'array'
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
        
        //creazione e popolamento degli array con gli esercizi per ogni gruppo muscolare
        //console.log('Selected Gambe:', selectedGambe);
        const exercises_gambe: Esercizio[] = [];
        selectedGambe.forEach(selectedID => {
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            //console.log("!!! es preso: ", exerciseToAdd);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                //exerciseToAdd.muscular_group= "gambe";
                exercises_gambe.push(exerciseToAdd);
            }
        });
        //console.log("esercizi: ", exercises_gambe);

        //console.log('Selected Schiena:', selectedSchiena);
        const exercises_schiena: Esercizio[] = [];
        selectedSchiena.forEach(selectedID => {
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            //console.log("!!! es preso: ", exerciseToAdd);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                //exerciseToAdd.muscular_group= "schiena";
                exercises_schiena.push(exerciseToAdd);
            }
        });
        //console.log("esercizi: ", exercises_schiena);

        //console.log('Selected Petto:', selectedPetto);
        const exercises_petto: Esercizio[] = [];
        selectedPetto.forEach(selectedID => {    
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                //exerciseToAdd.muscular_group= "petto";
                exercises_petto.push(exerciseToAdd);
            }
        });
        //console.log("esercizi: ", exercises_petto);

        //console.log('Selected Braccia:', selectedBraccia);
        const exercises_braccia: Esercizio[] = [];
        selectedBraccia.forEach(selectedID => {    
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                //exerciseToAdd.muscular_group= "braccia";
                exercises_braccia.push(exerciseToAdd);
            }
        });
        //console.log("esercizi: ", exercises_braccia);

        //console.log('Selected Addome:', selectedAddome);
        const exercises_addome: Esercizio[] = [];
        selectedAddome.forEach(selectedID => {
            const exerciseToAdd = all_exercises.find(exercise => exercise.id === selectedID);
            if (exerciseToAdd) {
                exerciseToAdd.reps_number = exerciseToAdd.reps_number*moltiplicatore1*moltiplicatore2;
                exerciseToAdd.sets_number = exerciseToAdd.sets_number*moltiplicatore1*moltiplicatore2;
                exercises_addome.push(exerciseToAdd);
            }
        });
        //console.log("esercizi: ", exercises_addome);


        // Funzione per salvare una lista di esercizi personalizzati e restituire gli ObjectId
        const saveCustomExercises = async (exercises: any[], m_group: String) => {
            try {
                const exercisesToSave = exercises.map(ex => {
                    const customEx = new CustomExercise();
                    customEx.name= ex.name;
                    customEx.muscular_group= m_group;
                    customEx.exercise_description= ex.exercise_description;
                    customEx.reps_number= ex.reps_number;
                    customEx.sets_number= ex.sets_number;
                    return customEx;
                });
        
                const savedExercises = await CustomExercise.insertMany(exercisesToSave);
                return savedExercises.map(ex => ex._id);
            } catch (error) {
                console.error('Error saving custom exercises:', error);
                throw error;
            }
        };

        // Salvataggio degli esercizi personalizzati nel database
        const exercisesGambeIds = await saveCustomExercises(exercises_gambe, "gambe");
        const exercisesSchienaIds = await saveCustomExercises(exercises_schiena, "schiena");
        const exercisesPettoIds = await saveCustomExercises(exercises_petto, "petto");
        const exercisesBracciaIds = await saveCustomExercises(exercises_braccia, "braccia");
        const exercisesAddomeIds = await saveCustomExercises(exercises_addome, "addome");

        // Creazione dei workout per ogni gruppo muscolare
        const workoutGambe = new Workout({ muscular_group: 'Gambe', exercises: exercisesGambeIds });
        const workoutSchiena = new Workout({ muscular_group: 'Schiena', exercises: exercisesSchienaIds });
        const workoutPetto = new Workout({ muscular_group: 'Petto', exercises: exercisesPettoIds });
        const workoutBraccia = new Workout({ muscular_group: 'Braccia', exercises: exercisesBracciaIds });
        const workoutAddome = new Workout({ muscular_group: 'Addome', exercises: exercisesAddomeIds });
        
        
        // Salvataggio dei workout nel database
        const savedWorkoutGambe = await workoutGambe.save();
        const savedWorkoutSchiena = await workoutSchiena.save();
        const savedWorkoutPetto = await workoutPetto.save();
        const savedWorkoutBraccia = await workoutBraccia.save();
        const savedWorkoutAddome = await workoutAddome.save();
        console.log("\n\n workout salvati correttamente\n");

        // Creazione della scheda di allenamento
        const email = user.email;
        
        const scheda = new Scheda({
            userEmail: email,
            gambe: savedWorkoutGambe._id,
            schiena: savedWorkoutSchiena._id,
            petto: savedWorkoutPetto._id,
            braccia: savedWorkoutBraccia._id,
            addome: savedWorkoutAddome._id,
        });
    
        // Salvataggio della scheda di allenamento nel database
        const savedWorkoutPlan = await scheda.save();
      
        return NextResponse.json({
            message: "scheda creata correttamente",
            data: scheda,
        })

    }catch(error: any){
        console.log("!!!errore: ", error.message);
        return NextResponse.json({
            message: error.message,
        },
        {
            status: 500
        }
        );
    }
}