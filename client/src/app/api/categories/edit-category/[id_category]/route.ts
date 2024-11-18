import { getAuthHeaders } from "@/app/utils/getAuthHeaders";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function PATCH(req: Request, { params }: { params: { id_category: string } }) {
    const { id_category } = params;
    const { category } = await req.json()
    const header = getAuthHeaders(true);

    try {
        const response = await fetch(`http://localhost:3000/categories/update-category/${id_category}`, {
            method: 'PATCH',
            headers: header,
            body: JSON.stringify({category})
        });

        if (response.ok) {
            return NextResponse.json({
                message: "Categoria editada com sucesso!",
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