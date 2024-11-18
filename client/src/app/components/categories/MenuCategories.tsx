"use client"

import { useState, useEffect } from "react";
import { getCategories } from "@/app/utils/getCategories";
import { Category } from "../types/categoryType";
import { useRouter } from "next/navigation";
import stylesModal from "@/app/styles/Modal.module.css";
import styles from "@/app/styles/MenuCategory.module.css"
import ButtonDeleteCategory from "./ButtonDeleteCategory";
import ButtonEditCategory from "./ButtonEditCategory";
import ButtonCreateCategory from "./ButtonCreateCategory";

interface MenuCategoriesProps {
    access_token: string;
}

const MenuCategories = ({ access_token }: MenuCategoriesProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch('/api/decode-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access_token: access_token }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.role !== "ADMIN") {
                    console.log('Área restrita a ADMIN.')
                    router.push('/')
                }
            } else {
                console.error('Erro ao decodificar o token:', response.statusText)
            }
        };

        fetchUserInfo();
    }, [access_token, router])

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data || []);
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h2 className={stylesModal.title_header}>Área de Categorias</h2>
            <ul className={styles.list_categories}>
                {categories.map((category) => (
                    <div key={category.id} className={styles.area_all_categories}>
                        <li key={category.id}>
                            {category.category}
                        </li>
                        <div className={styles.area_button}>
                            <ButtonEditCategory id={category.id} category_actual={category.category}/>
                            <ButtonDeleteCategory id={category.id}/>
                        </div>
                    </div>
                ))}
            </ul>
            <ButtonCreateCategory/>
        </div>
    )
}

export default MenuCategories;