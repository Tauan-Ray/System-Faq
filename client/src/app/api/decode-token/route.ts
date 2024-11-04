import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { access_token } = await req.json();
    const secretKey = process.env.JWT_SECRET_KEY

    if (!access_token) {
        return NextResponse.json(
            { message: 'Token não fornecido' },
            { status: 400 },
          );
    }

    if (!secretKey) {
        return NextResponse.json(
            { message: 'Chave secreta não definida' },
            { status: 500 }
        )
    }

    try {
        const decoded = jwt.verify(access_token, secretKey);

        return NextResponse.json(decoded, { status: 200 })
    } catch (error) {
        console.error("Token inválido", error);
        return NextResponse.json(
            { message: 'Token inválido' },
            { status: 401 }
        )
    }
}