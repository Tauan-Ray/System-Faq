"use client"

import styles from "@/app/styles/Question.module.css"

interface infosQuestions {
    id: number;
    name: string;
    question: string;
    category: string;
    description: string;
    creation_date: string;
}


const OneQuestion = ({
    id,
    name,
    creation_date,
    question,
    category,
    description }: infosQuestions) => {
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
                    <p className={styles.description_question}>{description}</p>
                    <button className={styles.button_respond_questions} type="button">Responder</button>
                </div>
            </div>
        </div>
    )
}

export default OneQuestion;