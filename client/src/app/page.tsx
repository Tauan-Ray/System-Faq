import styles from "@/app/styles/Home.module.css"
import AllRecentQuestions from "./components/recents-questions/AllRecentQuestions";
import MenuHome from "./components/home/MenuHome";


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.area_home}>
        <h1 className={styles.title_select}>Selecione a tarefa que deseja realizar</h1>
        <div>
          <MenuHome/>
        </div>

        <div className={styles.area_recent_questions}>
            <h1 className={styles.title_area_questions}>Perguntas recentes</h1>

            <div className={styles.area_questions}>
              <AllRecentQuestions/>
            </div>
        </div>
      </div>
    </div>
  );
}
