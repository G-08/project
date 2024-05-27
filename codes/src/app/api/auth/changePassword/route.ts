import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';

export async function PUT(request: NextRequest, response: NextResponse) {

  const requestBody = await request.json();
  const { oldPassword, newPassword } = requestBody;

  try {
    // Connect to the database
    await connect();

    const userId = await validateJWT(request);
    if (!userId) {
        return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
    }

    // Find the user by ID
    const user = await Utente.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Old password is incorrect' }, { status: 400 });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error changing password:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
