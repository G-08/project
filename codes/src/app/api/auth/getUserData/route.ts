import connect from '@/utils/db';
import User from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse){
  // console.log("AAAAAAAAAAAAAAAA sono in getUserData");
  try {
    await connect();
    const userId = await validateJWT(request);
    if (!userId) {
      return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401});
    }
    // console.log("AAAAAAAAAAAAAAAA userId=" + userId);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404});
    }
    
    // console.log("AAAAAAAAAAAAAAAA userId=" + user);

    return NextResponse.json({ data: user}, { status: 200 });
  } catch (error: any) {
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