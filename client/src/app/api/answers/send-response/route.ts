import { getAuthHeaders } from "@/app/utils/getAuthHeaders";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const header = getAuthHeaders(true);
    const { question_id, response } = await req.json();

    try {
        const responseReq = await fetch('http://localhost:3000/answers/create-response', {
            method: "POST",
            headers: header,
            body: JSON.stringify({ response, question_id }),
        })

        if (responseReq.ok) {
            return NextResponse.json(
                { message: 'Resposta registrada com sucesso' },
            )
        } else {
            const errorData = await responseReq.json()
            return NextResponse.json(
              { message: errorData.message || 'Erro ao cadastrar resposta' },
              { status: responseReq.status },
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