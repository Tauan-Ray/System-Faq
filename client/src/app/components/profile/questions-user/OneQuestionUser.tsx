import styles from "@/app/styles/QuestionProfile.module.css"
import { infosQuestions } from "../../types/infosQuestionsTypes";
import { useRouter } from "next/navigation";

const OnequestionUser = ({
    id,
    name,
    question,
    category,
    description,
    creation_date
}: infosQuestions) => {
    const router = useRouter();

    const handleEnterQuestion = () => {
        router.push(`/questions/${id}`)
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
                    <p className={styles.description_question}>{description}</p>
                    <div className={styles.area_buttons}>
                        <button onClick={handleEnterQuestion} className={styles.button_view_questions} type="button">Ver</button>
                        <button className={styles.button_update_questions} type="button">Editar</button>
                        <button className={styles.button_delete_questions} type="button">Deletar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnequestionUser;