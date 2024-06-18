import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import Scheda from '@/models/Scheda';
import Workout from '@/models/Allenamento';
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
    const user = await Utente.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'Utente non trovato' }, { status: 404 });
    }

    const email = user.email;
    const scheda = await Scheda.findOne({ userEmail: email });
    if (!scheda) {
      return NextResponse.json({ message: 'Scheda non trovata' }, { status: 404 });
    }

    const workoutIds = [
      scheda.gambe,
      scheda.schiena,
      scheda.petto,
      scheda.braccia,
      scheda.addome,
    ].filter(id => id != null);

    for (const workoutId of workoutIds) {
      const workout = await Workout.findById(workoutId).populate('exercises');
      if (workout) {
        await CustomExercise.deleteMany({ _id: { $in: workout.exercises } });
        await Workout.findByIdAndDelete(workoutId);
      }
    }

    await Scheda.findOneAndDelete({ userEmail: email });

    return NextResponse.json({ message: 'Scheda e allenamenti eliminati correttamente' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
