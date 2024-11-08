"use client"

import styles from "@/app/styles/Question.module.css"
import { useEffect, useState } from "react";

interface infosQuestions {
    id: number;
    question: string;
    category: string;
    description: string;
    creation_date: string;
    name: string;
}

const OneQuestion = () => {
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
                        <div key={question.id} className={styles.area_question}>
                            <div className={styles.header_question}>
                                <p>{question.name}</p>
                                <p>Pergunta feita em: {new Date(question.creation_date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div className={styles.content_question}>
                                <h2 className={styles.title_question}>{question.question}</h2>
                                <p className={styles.category_question}>Categoria: {question.category}</p>
                                <p className={styles.description_question}>{question.description}</p>
                                <button className={styles.button_respond_questions} type="button">Responder</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Carregando perguntas...</p>
                )
            )}
        </div>
    )
}

export default OneQuestion;