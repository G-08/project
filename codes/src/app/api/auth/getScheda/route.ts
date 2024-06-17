import connect from '@/utils/db';
import User from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';
import Scheda from '@/models/Scheda';
import Workout from '@/models/Allenamento';
import CustomExercise from '@/models/EserciziPersonal';
import mongoose from 'mongoose';

/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     summary: Retrieve user workout schedule
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully retrieved workout schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userEmail:
 *                       type: string
 *                     gambe:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                     schiena:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                     petto:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                     braccia:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                     addome:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User or schedule not found
 *       500:
 *         description: Internal server error
 */

export async function GET(request: NextRequest) {
  try {
    await connect();
    const userId = await validateJWT(request);
    if (!userId) {
      return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
    }

    const email = await User.findById(userId).select("email");

    if (!email) {
      return NextResponse.json({ message: 'Utente non trovato' }, { status: 404 });
    }

    mongoose.model('Workout', Workout.schema);
    mongoose.model('CustomExercise', CustomExercise.schema);

    const scheda_allenamento = await Scheda.findOne({ userEmail: email.email })
      .populate({
        path: 'gambe schiena petto braccia addome',
        populate: {
          path: 'exercises',
          model: 'CustomExercise'
        }
      })
      .exec();

    if (!scheda_allenamento) {
      return NextResponse.json({ message: 'Scheda non trovata' }, { status: 404 });
    }

    return NextResponse.json({ data: scheda_allenamento }, { status: 200 });
  } catch (error: any) {
    console.error("errore 500: ", error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
