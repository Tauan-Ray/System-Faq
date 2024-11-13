"use client"

import { infosAnswers } from "../types/infosAnswersTypes";
import { useState, useEffect } from "react";
import OneResponse from "./OneResponse";

interface AllAnswersProps {
    id_question: number;
}

const AllAnswers = ({ id_question }: AllAnswersProps) => {
    const [infosAnswers, setInfosAnswers] = useState<infosAnswers[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getAnswers = async () => {
            try {
                const response = await fetch(`/api/answers/get-answers/${id_question}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    next: { revalidate: 10 }
                });

                if (response.ok) {
                    const data = await response.json();
                    setInfosAnswers(data.answers || [])
                } else {
                    setErrorMessage("Erro ao buscar as respostas. Tente novamente mais tarde.");
                    console.error('Erro ao buscar as respostas:', response.statusText);
                    return null
                }
            } catch (error) {
                setErrorMessage("Erro de rede. Verifique sua conexão e tente novamente.");
                console.error("Erro na requisição:", error);
            }
        }

        getAnswers()
    },[id_question])

    return (
        <div>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                infosAnswers ? (
                    infosAnswers.map((response) => (
                        <OneResponse
                            key={response.id}
                            {...response}
                        />
                    ))
                ) : (
                    <p>Carregando respostas...</p>
                )
            )}
        </div>
    )
}


export default AllAnswers;