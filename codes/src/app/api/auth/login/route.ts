import Utente from "@/models/Utente";
import connect from '@/utils/db';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Accesso corretto
 *       400:
 *         description: Password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password is incorrect
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

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await connect();

        const reqBody = await request.json();

        // Check if user exists in the DB or not 
        const user = await Utente.findOne({ email: reqBody.email });
        if (!user) { 
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
        if (!passwordMatch) { 
            return NextResponse.json({ message: 'Password is incorrect' }, { status: 400 });
        }
        
        // Create token
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret!, { expiresIn: "2h"}); 
        const response = NextResponse.json({ message: "Accesso corretto" }, { status: 200 }); 
        response.cookies.set("token", token, { httpOnly: true, path: "/" });

        return response;
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        }, { status: 500 });
    }
}
