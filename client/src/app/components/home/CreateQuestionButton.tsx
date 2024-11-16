"use client"

import styles from "@/app/styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateQuestionModal from "./CreateQuestionModal";

const CreateQuestionButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            const response = await fetch('/api/check-auth', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const authenticated = await response.json()
                console.log(authenticated.message)
                setIsAuthenticated(authenticated.state);
            } else {
                console.error('Erro ao verificar login')
            }
        }
        checkAuthentication();
    }, [])


    const handleOpenModal = () => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            router.push('/auth/signin');
        }

        setIsOpen(true);
    }
    return (
        <div>
            <button
                className={styles.bnt_options}
                type="button"
                onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus" style={{backgroundColor: "transparent"}}></i> Criar
                    <span className={styles.text_button}>pergunta</span>
            </button>
            {isOpen && <CreateQuestionModal onClose={() => setIsOpen(false)}  isOpen={isOpen}/>}
        </div>
    )
}

export default CreateQuestionButton;