"use client"

import styles from "@/app/styles/Profile.module.css"
import InputPassword from "../auth/InputPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setErrorMessage('As senhas não coincidem.');
            return false;
        }
        return true;
    };

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validatePasswords()) return;

        setLoading(true)
        setErrorMessage('')

        try {
            const response = await fetch('/api/user/change-password', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password: password, currentPassword: currentPassword}),
            });

            if (response.ok){
                window.location.href = 'auth/signin';

            } else {
                const errorData = await response.json();
                console.log(errorData)
                setErrorMessage(errorData.error || 'Falha ao alterar a senha.');
            }
        } catch (error) {
            console.error('Erro na requisição: ', error);
            setErrorMessage('Erro ao atualizar o usuário. Tente novamente.');
        } finally {
            setLoading(false)
        }
    }


    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            if (errorMessage) setErrorMessage('');
    };


    const handleCancelChanges = () => {
    router.push('/profile')
    }

    return (
            <form method="POST" onSubmit={handleChangePassword}>
                <div style={{display: "flex"}}>
                    <div className={styles.div_infos}>
                        <label htmlFor="currentPassword" className={styles.label_input}>Senha Atual</label>
                        <InputPassword
                        password={currentPassword}
                        confirmPassword={confirmPassword}
                        handlePasswordChange={handleInputChange(setCurrentPassword)}
                        isConfirmPassword = {false}
                        />
                    </div>

                </div>

                <div className={styles.div_bottom}>
                    <div className={styles.div_infos}>
                        <label htmlFor="password" className={styles.label_input}>Nova Senha</label>
                        <InputPassword
                        password={password}
                        confirmPassword={confirmPassword}
                        handlePasswordChange={handleInputChange(setPassword)}
                        />
                    </div>


                    <div className={styles.div_infos}>
                        <label htmlFor="confirmPassword" className={styles.label_input}>Confirme sua senha</label>
                        <InputPassword
                        password={password}
                        confirmPassword={confirmPassword}
                        handlePasswordChange={handleInputChange(setConfirmPassword)}
                        isConfirmPassword = {true}
                        />
                    </div>
                </div>
                <div style={{width: '99%' ,display: "flex", alignItems: "end", gap: "15px"}}>
                    {errorMessage && (
                        <p style={{ color: 'red', marginLeft: '1px', marginTop: '8px' }}>{errorMessage}</p>
                    )}

                    <button
                        type="button"
                        onClick={handleCancelChanges}
                        className={styles.button_cancel}
                        disabled={loading}
                        >
                            Cancelar
                    </button>

                    <button
                        type="submit"
                        style={{marginLeft: "0px"}}
                        className={styles.button_save}
                        >
                            {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
    )
}

export default ChangePassword;