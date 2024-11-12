import { NextResponse } from "next/server";
import { getAuthHeaders } from "@/app/utils/getAuthHeaders";

export async function PATCH (req: Request) {
    try {
        const headers = getAuthHeaders(true);
        const user = await req.json()

        if (!user || !user.id || !user.name) {
            return NextResponse.json(
                { error: 'Dados do usuário ausentes ou inválidos.' },
                { status: 400 }
            );
        }

        const userData = {
            id: user.id,
            name: user.name,
            ...(user.email ? { email: user.email } : {}),
        };

        const response = await fetch('http://localhost:3000/users/update-user/', {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const res = NextResponse.json({ message: 'Cookies deletados!' })

            res.cookies.delete('access_token')
            res.cookies.delete('refresh_token')

            return res
        } else {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message },
                { status: 400 }
            );

        }
    } catch (error) {
        console.error('Erro na requisição', error);
        return NextResponse.json(
            { message: 'Erro ao processas a requisição.' },
            { status: 500 }
        )
    }
}