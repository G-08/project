import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import Scheda from '@/models/Scheda';
import Workout from '@/models/Allenamento'
import CustomExercise from '@/models/EserciziPersonal';
import { validateJWT } from '@/helpers/validateJWT';

export async function DELETE(request: NextRequest) {
    try {
        await connect();
        console.log("!!sono nella delete: ");
        const userId = await validateJWT(request);
        if (!userId) {
            return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
        }
        //console.log("!!user id: ", userId);
        const user = await Utente.findById(userId);
        //console.log("!!user: ", user);
        if (!user) {
            return NextResponse.json({ message: 'Utente non trovato' }, { status: 404 });
        }

        const email = user.email;
        //console.log("!!email: ", email);

        const scheda = await Scheda.findOne({ userEmail: email });
        if (!scheda) {
            return NextResponse.json({ message: 'Scheda non trovata' }, { status: 403 });
        }

        // Recupera tutti gli allenamenti associati alla scheda
        const workoutIds = [
            scheda.gambe,
            scheda.schiena,
            scheda.petto,
            scheda.braccia,
            scheda.addome,
        ].filter(id => id != null); // Filtra gli ID nulli

        // Per ogni allenamento, elimina gli esercizi personalizzati associati
        for (const workoutId of workoutIds) {
            const workout = await Workout.findById(workoutId).populate('exercises');
            if (workout) {
                // Elimina gli esercizi personalizzati associati all'allenamento
                await CustomExercise.deleteMany({ _id: { $in: workout.exercises } });
                // Elimina l'allenamento
                await Workout.findByIdAndDelete(workoutId);
            }
        }

        // Elimina la scheda
        await Scheda.findOneAndDelete({ userEmail: email });

        return NextResponse.json({ message: 'Scheda e allenamenti eliminati correttamente' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
