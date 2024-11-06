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
    const [isEditing, setIsEditing] = useState(false);
    const [originalEmail, setOriginalEmail] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState(['']);
    const router = useRouter();

    useEffect(() => {
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
                setOriginalEmail(data.email);
            } else {
                console.error('Erro ao decodificar o token:', response.statusText)
            }
        };

        fetchUserInfo();
    }, [access_token])

    const handleChange = (field: keyof UserInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prev) => ({ ...prev, [field]: e.target.value } as UserInfo));
        setErrorMessage(['']);
    };


    const handleEditToggle = () => setIsEditing(!isEditing);


    const handleSave = async () => {
        setErrorMessage([''])
        try {
            if (!userInfos) return;

            const { sub: id, username: name, email } = userInfos;
            const updatedUserData = email === originalEmail ? { id, name } : { id, name, email };

            const response = await fetch('api/update-user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData)
            });

            if (response.ok) {
                setIsEditing(false);
                window.location.href = '/auth/signin';
            } else {
                const errorData = await response.json();
                const errorMessages = Array.isArray(errorData.message) ? errorData.error : [errorData.error];
                setErrorMessage(errorMessages[0] || ['Falha na atualização.']);
            }
        } catch (error) {
            console.error('Erro na requisição: ', error);
            setErrorMessage(['Erro a atualizar o usuário. Tente novamente.']);
        }
    }

    const handleCancelChanges = () => window.location.href = '/profile';

    return (
            <form method="POST" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div style={{display: "flex"}}>
                    <div className={styles.div_infos}>
                        <label htmlFor="username" className={styles.label_input}>Nome de usuário</label>
                        <input
                        type="text"
                        className={`${styles.input_info} ${isEditing ? styles.editable : ''}`}
                        name="username"
                        disabled={!isEditing}
                        value={userInfos ? userInfos.username : ''}
                        onChange={handleChange('username')}
                        />
                    </div>

                    <div className={styles.div_infos}>
                        <label className={styles.label_input}>Senha</label>
                        <button
                        type="button"
                        disabled={isEditing}
                        className={styles.button_change_password}
                        onClick={() => router.push('profile/change-password')}>
                            Alterar senha
                        </button>
                    </div>
                </div> { /* div_top */ }

                <div className={styles.div_bottom}>
                    <div className={styles.div_infos}>
                        <label htmlFor="email" className={styles.label_input}>E-mail</label>
                        <input
                        type="text"
                        className={`${styles.input_info} ${isEditing ? styles.editable : ''}`}
                        name="email"
                        disabled={!isEditing}
                        value={userInfos ? userInfos.email : ''}
                        onChange={handleChange('email')}
                        />

                        {errorMessage && errorMessage.map((error, index) => (
                            <p style={{color: 'red', marginLeft: '1px', marginTop: '8px'}} key={index}>{error}</p>
                        ))}
                    </div>

                    {isEditing ? (
                        <div style={{width: '99%' ,display: "flex", alignItems: "end", gap: "15px"}}>
                        <button type="button" onClick={handleCancelChanges} className={styles.button_cancel} >Cancelar</button>
                        <button type="submit" style={{marginLeft: "0px"}} className={styles.button_save}>Salvar</button>
                        </div>
                    ) : (
                        <button type="button" onClick={handleEditToggle} className={styles.button_edit_infos}>Editar</button>
                    )}
                </div>
            </form>
    )
}

export default InfosUser;