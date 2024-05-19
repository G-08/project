import { NextResponse } from "next/server";
import Exercise from "@/models/Esercizio";
import connect from "@/utils/db";
import { validateJWT } from "@/helpers/validateJWT";

connect();

export async function GET() {
  try {
    console.log("!! sto in getExercise");
    //await validateJWT(request);
    const exercises = await Exercise.find({});
    return NextResponse.json(exercises);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}