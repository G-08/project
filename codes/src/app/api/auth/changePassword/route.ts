import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';

export async function PUT(request: NextRequest) {
  
  try {
    await connect();

    const userId = await validateJWT(request);
    if (!userId) {
      return NextResponse.json({ 
        message: 'Token scaduto o non presente' 
      }, { 
        status: 401 
      });
    }

    const user = await Utente.findById(userId);

    const requestBody = await request.json();
    const { oldPassword, newPassword } = requestBody;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ 
        message: 'password vecchia non corretta' 
      }, { 
        status: 400 
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ 
      message: 'Password cambiata correttamente' 
    }, {
       status: 200 
      });
  } catch (error: any) {
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { 
      status: 500 
    });
  }
}
