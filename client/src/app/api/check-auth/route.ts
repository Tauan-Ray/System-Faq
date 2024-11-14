import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function GET() {
    const cookiesStore = cookies();
    const access_token = cookiesStore.get('access_token');
    const refresh_token = cookiesStore.get('refresh_token');
    const secretKey = process.env.JWT_SECRET_KEY

    if (!secretKey) {
        return NextResponse.json(
            { state: false, message: 'Chave secreta não definida' }
        );
    }

    if (!access_token) {
        if (!refresh_token) {
            return NextResponse.json(
                { state: false, message: 'Erro de token' }
            );
        } else {
            try  {
                const response  = await fetch('http://localhost:3000/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh_token: refresh_token.value }),
                });

                if (response.ok) {
                    const data = await response.json();

                    const accessTokenCookie = serialize('access_token', data.access_token, {
                        httpOnly: true,
                        maxAge: 60 * 15,
                        path: '/',
                        sameSite: 'strict',
                    });

                    const responseHeaders = new Headers();
                    responseHeaders.append('Set-Cookie', accessTokenCookie);

                    return NextResponse.json(
                        { state: true, message: 'Acesso permitido' },
                        { headers: responseHeaders },
                    );

                } else {
                    const errorMessage = await response.json();
                    console.error(errorMessage.message)
                    return NextResponse.json(
                        { state: false, message: 'Erro de token' }
                    );

                }

            } catch (error) {
                console.error('Erro ai se comunicar com a API: ', error);
            }
        }

    } else {
        try {
            const decoded = jwt.verify(access_token.value, secretKey);
            return NextResponse.json(
                { state: true, message: 'Acesso permitido' }
            );
        } catch {
            return NextResponse.json(
                { state: false }
            );
        }
    }
}
