"use client"
import styles from "@/app/styles/MenuCategory.module.css"

interface ButtonDeleteCategoryProps {
    id: number;
}

const ButtonDeleteCategory = ({ id }: ButtonDeleteCategoryProps) => {

    const handleDeleteCategory = async () => {
        const confirmDelete = confirm('Tem certeza que deseja deletar a categoria?')

        if (!confirmDelete) {
            return
        }

        try {
            const response = await fetch(`api/categories/delete-category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                },
            });

            if (response.ok) {
                const messageSuccess = await response.json();
                alert(messageSuccess.message.message);
                window.location.reload();
            } else {
                const erro = await response.json();
                alert(`Erro ao deletar categoria: ${erro.error}`);
            }
        } catch (error) {
            alert("Ocorreu um erro ao tentar deletar a categoria.");
            console.error('Erro', error);
        }
    }

    return (
        <button onClick={handleDeleteCategory} className={styles.button_delete_category} type="button">Deletar</button>
    )
}

export default ButtonDeleteCategory;