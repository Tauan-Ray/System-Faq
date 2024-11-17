import styles from "@/app/styles/QuestionProfile.module.css"
import { infosQuestions } from "../../types/infosQuestionsTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditQuestion from "./EditQuestion";

const OnequestionUser = ({
    id,
    name,
    question,
    category,
    description,
    creation_date,
    category_id,
    onDeleteSuccess
}: infosQuestions & { onDeleteSuccess: (id: number) => void }) => {
    const router = useRouter();
    const [editQuestion, setEditQuestion] = useState(false);

    const handleEnterQuestion = () => {
        router.push(`/questions/${id}`)
    }

    const handleEditQuestion = () => {
        setEditQuestion(!editQuestion)
    }

    const handleDeleteQuestion = async () => {
        const confirmDelete = confirm('Tem certeza que deseja deletar a pergunta?')

        if (!confirmDelete) {
            return
        }

        try {
            const response = await fetch(`api/questions/delete-question/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                },
            });

            if (response.ok) {
                const messageSuccess = await response.json();
                alert(messageSuccess.message.message);
                onDeleteSuccess(id);
            } else {
                const erro = await response.json();
                alert(`Erro ao deletar pergunta: ${erro.error}`);
            }
        } catch (error) {
            alert("Ocorreu um erro ao tentar deletar a pergunta.");
            console.error('Erro', error);
        }
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
                    <div className={styles.area_buttons}>
                        <button onClick={handleEnterQuestion} className={styles.button_view_questions} type="button">Ver</button>
                        <button onClick={handleEditQuestion} className={styles.button_update_questions} type="button">Editar</button>
                        <button onClick={handleDeleteQuestion} className={styles.button_delete_questions} type="button">Deletar</button>
                    </div>
                </div>

            { editQuestion ?
                <EditQuestion
                    isOpen={editQuestion}
                    onClose={() => setEditQuestion(false)}
                    id={id}
                    question={question}
                    description={description}
                    category_id={category_id}
                /> : null}
            </div>
        </div>
    )
}

export default OnequestionUser;