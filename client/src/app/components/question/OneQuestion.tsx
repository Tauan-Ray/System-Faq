"use client"

import styles from "@/app/styles/Question.module.css"
import { useRouter } from "next/navigation";
import { infosQuestions } from "../types/infosQuestionsTypes";


const OneQuestion = ({
    id,
    name,
    creation_date,
    question,
    category,
    canClick,
    description }: infosQuestions) => {

    const router = useRouter();

    const handleEnterQuestion = (id: number) => {
        const url = `questions/${id}`;
        router.push(url);
    };

    return (
        <div>
            <div key={id} className={styles.area_question} onClick={(event) => {
                if (canClick) {
                    handleEnterQuestion(id)
                }
            }}>
                <div className={styles.header_question}>
                    <p>{name}</p>
                    <p>Pergunta feita em: {new Date(creation_date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className={styles.content_question}>
                    <h2 className={styles.title_question}>{question}</h2>
                    <p className={styles.category_question}>Categoria: {category}</p>
                    <p className={styles.description_question}>{description}</p>
                    <button className={styles.button_respond_questions} type="button">Responder</button>
                </div>
            </div>
        </div>
    )
}

export default OneQuestion;