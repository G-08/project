import  connect  from "@/utils/db";
import { validateJWT } from "@/helpers/validateJWT";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Utente";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json({
      data: user,
    },
    {
      status: 200,
    }
  );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}