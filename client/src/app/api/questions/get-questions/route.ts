import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response =  await fetch('http://localhost:3000/questions/all', {
            method: 'GET',
            headers: {
            'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const questions = await response.json();
            return NextResponse.json({
                message: 'Perguntas retornadas com sucesso.',
                questions: questions,
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