import connect from '@/utils/db';
import User from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';
import Scheda from '@/models/Scheda';
import Workout from '@/models/Allenamento'
import CustomExercise from '@/models/EserciziPersonal'
import mongoose from 'mongoose';

export async function GET(request: NextRequest, response: NextResponse){
  try {
    await connect();
    const userId = await validateJWT(request);
    if (!userId) {
      return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401});
    }

    const email = await User.findById(userId).select("email");

    if (!email) {
      return NextResponse.json({ message: 'Utente non trovato' }, { status: 404});
    }

    //console.log("!!email: "+email.email);
    
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
      return NextResponse.json({ message: 'Scheda non trovata' }, { status: 402});
    }

    //console.log("!!sto per ritornare questa scheda: ", scheda_allenamento);

    return NextResponse.json({ data: scheda_allenamento}, { status: 200 });
  } catch (error: any) {
    console.error("!errore 500: ", error);
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