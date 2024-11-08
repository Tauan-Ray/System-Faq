
import styles from "@/app/styles/Question.module.css"
import AllQuestions from "../components/question/AllQuestions";

const AllQuestionsPage = () => {
    return (
        <div className={styles.area_questions}>
            <div className={styles.area_category}>
                <p>Classificar por: </p>
                <select name="category" className={styles.select_category}>
                    <option className={styles.option_category} value="nenhuma">Nenhuma</option>
                    <option className={styles.option_category} value="prazo de entrega">Prazo de entrega</option>
                    <option className={styles.option_category} value="duvidas sobre pedidos">Dúvidas sobre pedidos</option>
                    <option className={styles.option_category} value="metodos de pagamento">Metódos de pagamento</option>
                    <option className={styles.option_category} value="problemas tecnicos">Problemas técnicos</option>
                </select>
            </div>

            <AllQuestions/>
        </div>

    )
}

export default AllQuestionsPage;