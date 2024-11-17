import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || ''

    try {
        const response = await fetch(`http://localhost:3000/questions/suggestions?q=${query}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            next: { revalidate: 3 },
        })

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data)
        } else {
            return NextResponse.json([])
        }
    } catch (error) {
        console.error('Erro ao buscar dados na API: ', error);
        return NextResponse.json([])
    }
}