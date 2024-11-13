import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookiesStore = cookies();
    const token = cookiesStore.get('access_token');

    if (!token) {
        return NextResponse.json(
            { state: false }
        );
    } else {
        return NextResponse.json(
            { state: true }
        );
    }
}
