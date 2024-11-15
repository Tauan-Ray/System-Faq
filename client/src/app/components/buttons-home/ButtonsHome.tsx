"use client"

import styles from "@/app/styles/Home.module.css";
import { useRouter } from "next/navigation";


const ButtonsHome = () => {
    const router = useRouter();

    const handleNavigateQuestions = () => {
        router.push('/questions');
    }

    return (
        <div className={styles.area_buttons}>
            <button
                className={styles.bnt_options}
                type="button"
                onClick={handleNavigateQuestions}>
                    <i className="fa-solid fa-globe" style={{
                    backgroundColor: "transparent", marginRight: '5px'
                    }}></i>Navegar em
                    <span className={styles.text_button}>perguntas</span>
                </button>
                <p>ou</p>
                <button
                className={styles.bnt_options}
                type="button">
                    <i className="fa-solid fa-plus" style={{backgroundColor: "transparent"}}></i> Criar
                    <span className={styles.text_button}>pergunta</span>
            </button>
        </div>
    )
}

export default ButtonsHome;