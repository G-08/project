import Utente from "@/models/Utente";
import connect from  "@/utils/db"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request: NextRequest)  {
    await connect();

    try{
        const reqBody = await request.json();

        if (!isValidEmail(reqBody.email)) {
            return NextResponse.json(
                { message: 'email inserita non corretta' }, 
                { status: 400 }
            );
        }

        if (!containsOnlyCharacters(reqBody.firstName, reqBody.lastName)) {
            return NextResponse.json(
                { message: 'nome e cognome non possono contenere caratteri diversi dalle lettere dell alfabeto' },
                { status: 400 }
            );
        }

        if (!containsUpperCase(reqBody.password)){
            return NextResponse.json(
                { message: 'password must contain uppercase characters' },
                { status: 400 }
            );
        }
        if (!containsLowerCase(reqBody.password)){
            return NextResponse.json(
                { message: 'password must contain lowercase characters' },
                { status: 400 }
            );
        }

        if (!containsNumber(reqBody.password)) {
            return NextResponse.json(
                { message: 'password must contain a number' },
                { status: 400 }
            );
        }

        if (!correctFormat(reqBody.date_of_birth)) {
            return NextResponse.json(
                { message: 'Date of birth is bad formed' },
                { status: 400 }
            );
        }

        if (reqBody.user_height <= 0 || reqBody.user_weight <= 0 || reqBody.thighs <= 0 || reqBody.shoulders <= 0 || reqBody.waist <= 0 || reqBody.biceps <= 0) {
            return NextResponse.json(
                { message: 'Misure non valide' },
                { status: 400 }
            );
        }

        if (!reqBody.password || reqBody.password.length < 8) {
            return NextResponse.json(
                { message: 'password non valida' },
                { status: 400 }
            );
        }
    
        if (reqBody.initial < 1 || reqBody.initial > 3){
            return NextResponse.json(
                { message: 'condizione iniziale deve essere compresa tra 1 e 3' },
                { status: 400 }
            );
        }
    
        if (reqBody.goal < 1 || reqBody.goal > 3){
            return NextResponse.json(
                { message: 'obiettivo deve essere compresa tra 1 e 3' },
                { status: 400 }
            );
        }
        


        const existingUser = await Utente.findOne({email: reqBody.email})

        if(existingUser){
            return NextResponse.json(
                { message: 'Utente già registrato con questa email' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;

        const newUtente = new Utente(reqBody);

        newUtente.save();

        return NextResponse.json({
            message: "utente creato correttamente",
        },
        {
            status: 201
        })

    }catch(error: any){
        return NextResponse.json({
            message: error.message,
        },
        {
            status: 500
        }
        );
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