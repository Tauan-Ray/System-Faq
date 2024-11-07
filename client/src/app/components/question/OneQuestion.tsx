import styles from "@/app/styles/Question.module.css"


const OneQuestion = () => {
    return (
        <div className={styles.area_question}>
            <div className={styles.header_question}>
                <p>Tauan</p>
                <p>Pergunta feita em: 22/05/2022</p>
            </div>

            <div className={styles.content_question}>
                <h2 className={styles.title_question}>O prazo de entrega foi excedido. O que devo fazer?</h2>
                <p className={styles.category_question}>Categoria: Prazo de entrega</p>
                <p className={styles.description_question}>
                    O produto que eu comprei ja passou bastante do prazo de entrega previsto.
                    O que eu devo fazer para obter novas informações dessa minha compra?
                </p>

                <button className={styles.button_respond_questions} type="button">Responder</button>
            </div>
        </div>
    )
}

export default OneQuestion;