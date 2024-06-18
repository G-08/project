import connect from '@/utils/db';
import User from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/auth/updateUser:
 *   put:
 *     summary: Update user information
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

export async function PUT(request: NextRequest) {
    try {
        await connect();

        const userId = await validateJWT(request);
        if (!userId) {
            return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
        }

        const data = await request.json();

        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');
        
        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ data: updatedUser }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
