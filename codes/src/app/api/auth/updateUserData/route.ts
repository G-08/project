import connect from '@/utils/db';
import User from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    try {
        await connect();

        const userId = await validateJWT(request);
        if (!userId) {
            return NextResponse.json({ message: 'Invalid or missing token' }, { status: 401 });
        }

        const data = await request.json();


        if (!containsOnlyCharacters(data.firstName, data.lastName)) {
            return NextResponse.json(
                { message: 'nome e cognome non possono contenere caratteri diversi dalle lettere dell alfabeto' },
                { status: 400 }
            );
        }

        if (!correctFormat(data.date_of_birth)) {
            return NextResponse.json(
                { message: 'Date of birth is bad formed' },
                { status: 400 }
            );
        }


        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ data: updatedUser }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

    function isValidEmail(email: string): boolean {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return regex.test(email);
    }
    
    function containsOnlyCharacters(str1: string, str2: string): boolean {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(str1) && regex.test(str2);
    }
    
    function containsUpperCase(password: string): boolean {
        return /[A-Z]/.test(password);
    }
    
    function containsLowerCase(password: string): boolean {
        return /[a-z]/.test(password);
    }
    
    function containsNumber(password: string): boolean {
        return /\d/.test(password);
    }
    
    function correctFormat(date: string): boolean {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
        // Verifica se la stringa soddisfa il formato della data
        if (!regex.test(date)) {
        return false;
        }
    
        // Splitta la stringa in giorno, mese e anno
        const [giorno, mese, anno] = date.split('/').map(Number);
        
        // Controlla se il mese è valido (da 1 a 12)
        if (mese < 1 || mese > 12) {
        return false;
        }
    
        // Controlla i giorni in base al mese
        const giorniPerMese = [31, anno % 4 === 0 && (anno % 100 !== 0 || anno % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (giorno < 1 || giorno > giorniPerMese[mese - 1]) {
        return false;
        }
    
        return true;
    }
