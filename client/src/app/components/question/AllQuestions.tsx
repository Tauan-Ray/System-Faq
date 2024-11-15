"use client"

import { useEffect, useState } from "react";
import OneQuestion from "./OneQuestion";
import { infosQuestions } from "../types/infosQuestionsTypes";

const AllQuestions = ({ selectedCategory }: { selectedCategory: number }) => {
    const [infosQuestion, setInfosQuestion] = useState<infosQuestions[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');

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
    },[]);

    const filteredQuestions = selectedCategory === 0
        ? infosQuestion
        : infosQuestion?.filter(question => question.category_id === selectedCategory)

    return (
        <div>
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
        </div>
    )
}

export default AllQuestions;