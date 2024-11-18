import { getAuthHeaders } from "@/app/utils/getAuthHeaders";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id_category: string } }) {
    const { id_category } = params;
    const header = getAuthHeaders(false);

    try {
        const response = await fetch(`http://localhost:3000/categories/delete-category/${id_category}`, {
            method: 'DELETE',
            headers: header,
        });

        if (response.ok) {
            const confirmDeleteMessage  = await response.json()
            return NextResponse.json({
                message: confirmDeleteMessage,
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