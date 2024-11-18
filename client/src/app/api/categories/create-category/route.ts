import { getAuthHeaders } from "@/app/utils/getAuthHeaders";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const header = getAuthHeaders(true);
    const { category } = await req.json();

    console.log(category)

    try {
        const response = await fetch('http://localhost:3000/categories/create-category', {
            method: "POST",
            headers: header,
            body: JSON.stringify({ category }),
        })

        if (response.ok) {
            return NextResponse.json(
                { message: 'Categoria registrada com sucesso' },
            )
        } else {
            const errorData = await response.json()
            return NextResponse.json(
              { message: errorData.message || 'Erro ao cadastrar categoria' },
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