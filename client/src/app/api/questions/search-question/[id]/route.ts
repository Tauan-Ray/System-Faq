import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const response = await fetch(`http://localhost:3000/questions?id=${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        if (response.ok) {
            const question  = await response.json()
            return NextResponse.json({
                message: 'Pergunta encontrada com sucesso.',
                question: question,
            })
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