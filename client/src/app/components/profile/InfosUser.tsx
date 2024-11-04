"use client"

import styles from "@/app/styles/Profile.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

interface InfosUserProps {
    access_token: string;
}

interface UserInfo {
    sub: number;
    email: string;
    username: string;
    iat: number;
    exp: number;
}

const InfosUser = ({ access_token } : InfosUserProps) => {
    const [userInfos, setUserInfo] = useState<UserInfo | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!access_token) {
            router.push('/auth/signin');
            return
        }

        const fetchUserInfo = async () => {
            const response = await fetch('/api/decode-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access_token: access_token }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
            } else {
                console.error('Erro ao decodificar o token:', response.statusText)
            }
        };

        fetchUserInfo();
    }, [access_token, router])

    return (
            <form>
                <div style={{display: "flex"}}>
                    <div className={styles.div_infos}>
                        <label htmlFor="username" className={styles.label_input}>Nome de usuário</label>
                        <input
                        type="text"
                        className={styles.input_info}
                        name="username"
                        disabled
                        value={userInfos ? userInfos.username : ''}/>
                    </div>

                    <div className={styles.div_infos}>
                        <label className={styles.label_input}>Senha</label>
                        <button type="button" className={styles.button_change_password}>Alterar senha</button>
                    </div>
                </div> { /* div_top */ }

                <div className={styles.div_bottom}>
                    <div className={styles.div_infos}>
                        <label htmlFor="email" className={styles.label_input}>E-mail</label>
                        <input
                        type="text"
                        className={styles.input_info}
                        name="email"
                        disabled
                        value={userInfos ? userInfos.email : ''}/>
                    </div>

                    <button type="button" className={styles.button_edit_infos}>Editar</button>
                </div>
            </form>
    )
}

export default InfosUser;