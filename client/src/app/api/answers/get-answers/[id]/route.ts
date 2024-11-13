import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const questionId = parseInt(id);

    try {
        const response = await fetch(`http://localhost:3000/answers/${questionId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            next: { revalidate: 10 }
        });

        if (response.ok) {
            const answers  = await response.json()
            return NextResponse.json({
                message: 'Repostas encontrada com sucesso.',
                answers: answers,
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