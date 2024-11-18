"use client"

import styles from "@/app/styles/Profile.module.css"
import { useRouter } from "next/navigation"


const ButtonAreaCategory = () => {
    const router = useRouter();

    const handleAreaCategories = () => {
        router.push('/categories')
    }

    return  (
        <div>
            <button
            type="button"
            className={styles.button_create_category}
            onClick={handleAreaCategories}>
                Área Categorias
            </button>
        </div>
    )
}

export default ButtonAreaCategory;