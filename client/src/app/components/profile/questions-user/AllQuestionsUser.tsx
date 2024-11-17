"use client"

import { useState, useEffect, useCallback } from "react";
import { UserInfo } from "../../types/userInfoTypes";
import { infosQuestions } from "../../types/infosQuestionsTypes";
import OnequestionUser from "./OneQuestionUser";


interface InfosUserProps {
    access_token: string;
}

const AllQuestionsUser = ({ access_token }: InfosUserProps) => {
    const [userInfos, setUserInfo] = useState<UserInfo | null>(null);
    const [infosQuestion, setInfosQuestion] = useState<infosQuestions[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');

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
                setUserInfo(data);
            } else {
                console.error('Erro ao decodificar o token:', response.statusText)
            }
        };
        fetchUserInfo();
    }, [access_token]);

    const fetchQuestionsUser = useCallback(async () => {
        if (!userInfos?.sub) {
            return;
        }

        try {
            const idUser = String(userInfos?.sub);
            const response = await fetch(`/api/questions/user-questions/${idUser}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                next: { revalidate: 10 }
            });

            if (response.ok) {
                const data = await response.json();
                setInfosQuestion(data.question || [])
            } else {
                setErrorMessage("Erro ao buscar as perguntas. Tente novamente mais tarde.");
                console.error('Erro ao buscar as perguntas:', response.statusText);
                return null
            }
        } catch (error) {
            setErrorMessage("Erro de rede. Verifique sua conexão e tente novamente.");
            console.error("Erro na requisição:", error);
        }
    }, [userInfos]);

    useEffect(() => {
        fetchQuestionsUser();
    }, [userInfos, fetchQuestionsUser]);


    const handleDeleteSuccess = (deletedQuestionId: number) => {
        setInfosQuestion((prevQuestions) =>
            prevQuestions ? prevQuestions.filter(question => question.id !== deletedQuestionId) : []
        );
    }


    return (
        <div>
            <div>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                infosQuestion ? (
                    infosQuestion.map((question) => (
                        <OnequestionUser
                            key={question.id}
                            {...question}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    ))
                ) : (
                    <p>Carregando perguntas...</p>
                )
            )}
        </div>
        </div>
    )
}

export default AllQuestionsUser;