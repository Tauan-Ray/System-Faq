import styles from "@/app/styles/Response.module.css"
import { infosAnswers } from "../types/infosAnswersTypes";

const OneResponse = ({
    id,
    response,
    response_date,
    name,
}: infosAnswers) => {
    return (
        <div className={styles.individual_response} key={id}>
            <div className={styles.header_response}>
                <p>{name}</p>
                <p>Respondida em: {new Date(response_date).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className={styles.content_response}>
            <p className={styles.response} dangerouslySetInnerHTML={{ __html: response }} />
            </div>
        </div>
    )
}

export default OneResponse;