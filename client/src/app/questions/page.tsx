"use client"

import styles from "@/app/styles/Question.module.css"
import AllQuestions from "../components/question/AllQuestions";
import SelectCategory from "../components/question/SelectCategory";
import { useState } from 'react'


const AllQuestionsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className={styles.area_questions}>
            <div className={styles.area_category}>
                <p>Classificar por: </p>
                <SelectCategory onCategoryChange={handleCategoryChange}/>
            </div>

            <AllQuestions selectedCategory={selectedCategory}/>
        </div>

    )
}

export default AllQuestionsPage;