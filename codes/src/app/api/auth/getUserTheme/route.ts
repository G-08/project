import connect from '@/utils/db';
import User from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/auth/getUserData:
 *   get:
 *     summary: Get user data
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     theme:
 *                       type: string
 *                       description: The theme selected by the user
 *                       example: dark
 *       401:
 *         description: Invalid or missing token
 *       500:
 *         description: Server error
 */

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

    console.log("AAAAAAAAAAAAAAAA", user.data.theme)
    
    // console.log("AAAAAAAAAAAAAAAA userId=" + user);

    return NextResponse.json({ data: user.data.theme}, { status: 200 });
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