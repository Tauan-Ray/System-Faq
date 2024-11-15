"use client"

import { useEffect, useState } from "react";
import { infosQuestions } from "../types/infosQuestionsTypes";
import OneQuestion from "../question/OneQuestion";


const AllRecentQuestions = () => {
    const [infosQuestion, setInfosQuestion] = useState<infosQuestions[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getRecentsQuestions = async () => {
            try {
                const response = await fetch('/api/questions/get-questions/', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    next: { revalidate: 10 },
                });

                if (response.ok) {
                    const data = await response.json();
                    setInfosQuestion(data.questions.slice(0,5) || [])
                } else {
                    setErrorMessage("Erro ao buscar as perguntas. Tente novamente mais tarde.");
                    console.error('Erro ao buscar as perguntas:', response.statusText);
                }
            } catch (error) {
                setErrorMessage("Erro de rede. Verifique sua conexão e tente novamente.");
                console.error("Erro na requisição:", error);
            }
        }

        getRecentsQuestions();
    }, [])

    return (
        <div>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                infosQuestion ? (
                    infosQuestion.map((question) => (
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

export default AllRecentQuestions;