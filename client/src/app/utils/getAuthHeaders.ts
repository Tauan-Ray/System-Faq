import { cookies } from "next/headers";

export function getAuthHeaders(sendBody: boolean) {
    const access_token = cookies().get('access_token')?.value;
    let HeaderPair

    if (sendBody) {
        HeaderPair = {'Content-Type': 'application/json'};
    } else {
        HeaderPair = {'Accept': 'application/json'};
    }

    if (!access_token) {
        throw new Error('Token de acesso não encontrado')
    }

    return {
        ...HeaderPair,
        'Authorization': `Bearer ${access_token}`
    }
}