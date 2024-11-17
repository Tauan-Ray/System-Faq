import { NextResponse } from "next/server";
import { getAuthHeaders } from "@/app/utils/getAuthHeaders";

export async function PATCH(req: Request, { params }: { params: {id: string} }) {
    const { id } = params;
    const { question, description, category_id } = await req.json();
    const headers = getAuthHeaders(true);

    try {
        const response = await fetch(`http://localhost:3000/questions/update-question/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({ question, description, category_id }),
        });

        if (response.ok) {
            return NextResponse.json(
                {message: 'Pergunta atualizada com sucesso'},
            );
        } else {
            const errorData = await response.json();
            return NextResponse.json(
                { message: errorData.message || 'Erro ao atualizar pergunta' },
                { status: response.status },
            );
        }
    } catch (error) {
        console.error('Erro na requisição: ', error);

        return NextResponse.json(
            { message: "Ocorreu um erro ao processar sua solicitação." },
            { status: 500 },
        )
    }
}
