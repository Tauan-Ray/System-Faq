"use client"

import { useState } from "react";
import styles from "@/app/styles/MenuCategory.module.css"
import ModalCategory from "./ModalCategory";


const ButtonCreateCategory =  () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.area_create_category}>
            <button
                onClick={() => setIsOpen(true)}
                className={styles.button_create_category}
                type="button"
            >
                Nova Categoria
            </button>

            {isOpen && (
                <ModalCategory
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    mode="create"
                />
            )}
        </div>
    )
}


export default ButtonCreateCategory;