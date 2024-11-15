import { getAuthHeaders } from "@/app/utils/getAuthHeaders";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const header = getAuthHeaders(true);
    const { question, description, category_id } = await req.json();

    try {
        const response = await fetch('http://localhost:3000/questions/create-question', {
            method: "POST",
            headers: header,
            body: JSON.stringify({ question, description, category_id }),
        })

        if (response.ok) {
            return NextResponse.json(
                { message: 'Pergunta registrada com sucesso' },
            )
        } else {
            const errorData = await response.json()
            return NextResponse.json(
              { message: errorData.message || 'Erro ao cadastrar pergunta' },
              { status: response.status },
            );
        }
    } catch (error) {
        console.error('Erro na requisição: ', error)

        return NextResponse.json(
            { message: 'Ocorreu um erro ao processar sua solicitação.' },
            { status: 500 },
        )
    }
}