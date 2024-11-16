"use client"

import styles from "@/app/styles/Home.module.css";
import { useRouter } from "next/navigation";
import CreateQuestionButton from "./CreateQuestionButton";

const MenuHome = () => {
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
                <CreateQuestionButton/>
        </div>
    )
}

export default MenuHome;