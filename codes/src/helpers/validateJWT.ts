import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) =>{
    try{
        const token = request.cookies.get("token")?.value || "";

        if(!token){
            throw new Error("Non è presente il token");
        }

        const decryptedToken:any = jwt.verify(token, process.env.jwt_secret!);
        console.log("!!! id: ", decryptedToken.id);
        return decryptedToken.id;
    }catch(error: any){
        throw new Error(error.message);
    }
}