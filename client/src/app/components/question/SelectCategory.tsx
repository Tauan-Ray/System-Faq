"use client"

import styles from "@/app/styles/Question.module.css"
import { useState, useEffect } from "react";
import { getCategories } from "@/app/utils/getCategories";
import { Category } from "../types/categoryType";

const SelectCategory = ({ onCategoryChange }: { onCategoryChange: (categoryId: number) => void }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data || []);
        };

        fetchCategories();
    }, []);


    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category_id = Number(e.target.value)
        onCategoryChange(category_id);
    }

    return (
        <select
        name="category"
        className={styles.select_category}
        onChange={(e) => handleChangeCategory(e)}>
            <option value="0">Todas</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.category}</option>
            ))}
        </select>
    )
}


export default SelectCategory;