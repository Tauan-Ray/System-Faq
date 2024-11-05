import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const res = NextResponse.json({ message: 'Logout realizado com sucesso' })

    res.cookies.delete('access_token');
    res.cookies.delete('refresh_token');

    return res
}