import { getAuthHeaders } from "@/app/utils/getAuthHeaders";
import { NextResponse } from "next/server";

export async function PATCH (req: Request) {
    try {
        const headers = getAuthHeaders();
        const { password, currentPassword } = await req.json();

        const response  = await fetch('http://localhost:3000/users/update-user/change-password', {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({ password, currentPassword }),
        });

        if (response.ok) {
            const res = NextResponse.json({ message: 'Usuário atualizado com sucesso.' })

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