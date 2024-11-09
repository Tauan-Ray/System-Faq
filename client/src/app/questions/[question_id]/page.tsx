"use client"

import styles from "@/app/styles/Response.module.css";
import OneQuestion from "@/app/components/question/OneQuestion";
import { useParams } from "next/navigation";
import { infosQuestions } from "@/app/components/types/infosQuestionsTypes";
import { useEffect, useState } from "react";
import AllAnswers from "@/app/components/response/AllAnswers";


const InsideQuestionPage = () => {
    const [infosQuestion, setInfosQuestion] = useState<infosQuestions | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { question_id } = useParams();
    const id = parseInt(question_id[0])

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const response = await fetch(`/api/search-question/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setInfosQuestion(data.question);
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'Erro desconhecido');
                }
            } catch (error) {
                console.log('Erro: ', error)
            }
        }

        getQuestion();
    }, [id])

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            {infosQuestion && (
                <OneQuestion
                    id={infosQuestion.id}
                    name={infosQuestion.name}
                    question={infosQuestion.question}
                    category={infosQuestion.category}
                    description={infosQuestion.description}
                    creation_date={infosQuestion.creation_date}
                    canClick={false}
                />
            )}
            <div className={styles.area_response}>
                <p>Respostas (2)</p>
                    <AllAnswers
                        id_question={id}
                    />
            </div>
        </div>
    );
}

export default InsideQuestionPage;