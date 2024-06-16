import { NextResponse } from "next/server";
import Exercise from "@/models/Esercizio";
import connect from "@/utils/db";
import { validateJWT } from "@/helpers/validateJWT";

connect();

export async function GET() {
  try {
    const exercises = await Exercise.find({});
    return NextResponse.json({ message: "exercise find", exercises }, { status: 200 });  
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
