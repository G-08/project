import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';

export async function PUT(request: NextRequest) {
  console.log("Received a PUT request to /api/auth/changePassword");
  try {
    console.log("Connecting to the database...");
    await connect();
    console.log("Database connected successfully");

    const userId = await validateJWT(request);
    if (!userId) {
      console.log("Invalid or missing token");
      return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
    }
    console.log("Token validated, userId:", userId);

    // Find the user by ID
    const user = await Utente.findById(userId);
    if (!user) {
      console.log("User not found with userId:", userId);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    console.log("User found:", user);

    const requestBody = await request.json();
    const { oldPassword, newPassword } = requestBody;
    console.log("Request body parsed:", requestBody);

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      console.log("Old password is incorrect");
      return NextResponse.json({ message: 'Old password is incorrect' }, { status: 400 });
    }
    console.log("Old password matches");

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log("New password hashed");

    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    console.log("User password updated successfully");

    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
