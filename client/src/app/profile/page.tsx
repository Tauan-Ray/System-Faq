import styles from "@/app/styles/Profile.module.css"
import InfosUser from "../components/profile/InfosUser";
import { cookies } from "next/headers";
import AllQuestionsUser from "../components/profile/questions-user/AllQuestionsUser";

const ProfilePage = () => {
    const cookiesList = cookies();
    const access_token = cookiesList.get('access_token')?.value || '';


    return (
        <div>
            <div className={styles.container}>
                <div className={styles.area_user}>
                    <div className={styles.header_user}>
                        <i className="fa-regular fa-user" style={{
                            fontSize: "45px",
                            padding: "15px",
                            marginLeft: "10px"
                        }}></i>
                        <p>Tauan</p>
                    </div> {/* header_user */}

                    <div style={{
                        padding: "15px",
                        marginLeft: "10px",
                    }}>
                        <InfosUser
                            access_token={access_token}
                        />
                    </div>
                </div> {/* area_user */}
            </div>
            <p className={styles.text_questions}>Suas Perguntas</p>

            <AllQuestionsUser
                access_token={access_token}
            />
        </div>
    )
}

export default ProfilePage;