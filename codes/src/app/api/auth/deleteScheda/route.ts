import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import Scheda from '@/models/Scheda';
import Workout from '@/models/Allenamento';
import CustomExercise from '@/models/EserciziPersonal';
import { validateJWT } from '@/helpers/validateJWT';

/**
 * @swagger
 * /api/auth/deleteAccount:
 *   delete:
 *     summary: Delete user account and associated data
 *     description: Deletes a user account along with their scheda, workouts, and custom exercises.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Scheda e allenamenti eliminati correttamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Scheda e allenamenti eliminati correttamente
 *       401:
 *         description: Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or missing token
 *       404:
 *         description: Utente or Scheda not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     Utente non trovato:
 *                       value: Utente non trovato
 *                     Scheda non trovata:
 *                       value: Scheda non trovata
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
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
