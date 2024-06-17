import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import Utente from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';

/**
 * @swagger
 * /api/auth/deleteAccount:
 *   delete:
 *     summary: Delete user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or missing token
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
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

export async function DELETE(request: NextRequest) {
    try {
        await connect();

        // Validate JWT and get the user ID
        const userId = await validateJWT(request);
        if (!userId) {
            return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
        }

        // Find and delete the user by ID
        const user = await Utente.findByIdAndDelete(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
