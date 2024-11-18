export async function getCategories() {
    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            next: { revalidate: 3 }
        });

        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            alert('Erro ao buscar categorias');
            return
        }
    } catch (error) {
        console.error('Erro ao se comunicar com a API', error);
    }
}