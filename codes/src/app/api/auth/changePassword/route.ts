import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';

/**
 * @swagger
 * /api/auth/changePassword:
 *   put:
 *     summary: Change user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password cambiata correttamente
 *       400:
 *         description: Old password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: password vecchia non corretta
 *       401:
 *         description: Token expired or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token scaduto o non presente
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
