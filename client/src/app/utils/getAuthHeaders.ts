import { cookies } from "next/headers";

export function getAuthHeaders() {
    const access_token = cookies().get('access_token')?.value;

    if (!access_token) {
        throw new Error('Token de acesso não encontrado')
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }
}