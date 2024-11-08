"use client"

import { useEffect, useState } from "react";
import OneQuestion from "./OneQuestion";

interface infosQuestions {
    id: number;
    question: string;
    category: string;
    description: string;
    creation_date: string;
    name: string;
}

const AllQuestions = () => {
    const [infosQuestion, setInfosQuestion] = useState<infosQuestions[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getInfosQuestion = async () => {
        try {
            const response = await fetch('/api/getQuestions/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
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