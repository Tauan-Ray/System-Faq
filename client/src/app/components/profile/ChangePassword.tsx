"use client"

import styles from "@/app/styles/Profile.module.css"
import InputPassword from "../auth/InputPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(['']);
    const router = useRouter();

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage(['As senhas não coincidem.']);
            return;
        }

        try {
            const response = await fetch('/api/change-password', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password: password, currentPassword: currentPassword}),
            });

            if (response.ok){
                router.push('auth/signin')
            } else {
                const errorData = await response.json();

                const errorMessages = Array.isArray(errorData.message) ? errorData.error : [errorData.error];
                setErrorMessage(errorMessages || ['Falha ao alterar a senha.']);
            }
        } catch (error) {
            console.error('Erro na requisição: ', error);
            setErrorMessage(['Erro a atualizar o usuário. Tente novamente.']);
        }
    }


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errorMessage) setErrorMessage(['']);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errorMessage) setErrorMessage(['']);
    };

    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
    if (errorMessage) setErrorMessage(['']);
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
                        handlePasswordChange={handleCurrentPasswordChange}
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
                        handlePasswordChange={handlePasswordChange}
                        isConfirmPassword = {false}
                        />
                    </div>


                    <div className={styles.div_infos}>
                        <label htmlFor="confirmPassword" className={styles.label_input}>Confirme sua senha</label>
                        <InputPassword
                        password={password}
                        confirmPassword={confirmPassword}
                        handlePasswordChange={handleConfirmPasswordChange}
                        isConfirmPassword = {true}
                        />
                    </div>
                </div>
                <div style={{width: '99%' ,display: "flex", alignItems: "end", gap: "15px"}}>
                    {errorMessage && errorMessage.map((error, index) => (
                        <p style={{color: 'red', marginLeft: '1px', marginTop: '8px'}} key={index}>{error}</p>
                    ))}
                    <button type="button" onClick={handleCancelChanges} className={styles.button_cancel} >Cancelar</button>
                    <button type="submit" style={{marginLeft: "0px"}} className={styles.button_save}>Salvar</button>
                </div>
            </form>
    )
}

export default ChangePassword;