import ChangePassword from "@/app/components/profile/ChangePassword";
import styles from "@/app/styles/Profile.module.css"


const ChangePasswordPage = () => {
    return (
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
                    <ChangePassword/>
                </div>

            </div> {/* area_user */}
        </div>
    )
}


export default ChangePasswordPage;