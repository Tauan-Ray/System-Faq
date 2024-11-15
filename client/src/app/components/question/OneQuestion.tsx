"use client"

import styles from "@/app/styles/Question.module.css"
import { useRouter } from "next/navigation";
import { infosQuestions } from "../types/infosQuestionsTypes";
import { useState } from "react";
import BoxResponse from "../box-response/BoxResponse";


const OneQuestion = ({
    id,
    name,
    creation_date,
    question,
    category,
    see,
    description }: infosQuestions) => {

    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const router = useRouter();

    const handleEnterQuestion = (id: number) => {
        const url = `questions/${id}`;
        router.push(url);
    };

    const handleRespondQuestion = () => {
        setIsResponseVisible(!isResponseVisible);
    }

    return (
        <div>
            <div key={id} className={styles.area_question}>
                <div className={styles.header_question}>
                    <p>{name}</p>
                    <p>Pergunta feita em: {new Date(creation_date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className={styles.content_question}>
                    <h2 className={styles.title_question}>{question}</h2>
                    <p className={styles.category_question}>Categoria: {category}</p>
                    <p className={styles.description_question} dangerouslySetInnerHTML={{ __html: description }} />
                    <button
                    className={styles.button_respond_questions}
                    type="button" onClick={(event) => {
                        if (see) {
                            handleEnterQuestion(id)
                        } else {
                            handleRespondQuestion()
                        }
                    }}>
                        {see ? 'Ver' : isResponseVisible ? 'Fechar' : 'Responder'}
                    </button>
                </div>
            </div>
            {isResponseVisible && <BoxResponse id_question={id}/>}
        </div>
    )
}

export default OneQuestion;