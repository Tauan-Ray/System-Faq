"use client"

import styles from "@/app/styles/Question.module.css"
import { useEffect, useState } from "react";
import OneQuestion from "./OneQuestion";
import { infosQuestions } from "../types/infosQuestionsTypes";

const AllQuestions = ({ selectedCategory }: { selectedCategory: number }) => {
    const [infosQuestion, setInfosQuestion] = useState<infosQuestions[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [quantityQuestions, setQuantityQuestions] = useState(10);

    const getInfosQuestion = async () => {
        try {
            const response = await fetch('/api/questions/get-questions/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                next: { revalidate: 10 }
            });

            if (response.ok) {
                const data = await response.json();
                setInfosQuestion(data.questions || [])
            } else {
                setErrorMessage("Erro ao buscar as perguntas. Tente novamente mais tarde.");
                console.error('Erro ao buscar as perguntas:', response.statusText);
                return null
            }
        } catch (error) {
            setErrorMessage("Erro de rede. Verifique sua conexão e tente novamente.");
            console.error("Erro na requisição:", error);
        }
    }

    useEffect(() => {
        getInfosQuestion();
    }, []);

    const filteredQuestions = selectedCategory === 0
        ? infosQuestion?.slice(0, quantityQuestions)
        : infosQuestion?.filter(question => question.category_id === selectedCategory)

    return (
        <div className={styles.container}>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                filteredQuestions ? (
                    filteredQuestions.map((question) => (
                        <OneQuestion
                            key={question.id}
                            {...question}
                            see={true}
                        />
                    ))
                ) : (
                    <p>Carregando perguntas...</p>
                )
            )}

            {infosQuestion && infosQuestion.length > quantityQuestions ? (
                <button
                type="button"
                className={styles.bnt_more_questions}
                onClick={() => setQuantityQuestions((prev) => prev + 10)}>
                    Carregar mais perguntas
                </button>
            ): (
                <p className={styles.text_end_questions}>Você chegou ao fim das perguntas</p>
            )}
        </div>
    )
}

export default AllQuestions;