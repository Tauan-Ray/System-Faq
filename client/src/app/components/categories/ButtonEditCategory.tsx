"use client"

import styles from "@/app/styles/MenuCategory.module.css"
import { useState } from "react";
import ModalCategory from "./ModalCategory";


interface ButtonEditCategoryProps {
    id: number;
    category_actual: string;
}

const ButtonEditCategory = ({ id, category_actual }: ButtonEditCategoryProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className={styles.button_update_category}
                type="button"
            >
                Editar
            </button>

            {isOpen && (
                <ModalCategory
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    mode="edit"
                    id={id}
                    category_actual={category_actual}
                />
            )}
        </div>
    )
}

export default ButtonEditCategory;