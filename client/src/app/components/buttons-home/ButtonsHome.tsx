"use client"

import styles from "@/app/styles/Home.module.css";
import stylesModal from "@/app/styles/Modal.module.css"
import QuillEditor from "../box-response/QuillEditor";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { getCategories } from "@/app/utils/getCategories";
import { Category } from "../types/categoryType";


const ButtonsHome = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [title, setTitle] = useState('');
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



    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data || []);
        };

        fetchCategories();
    }, []);

    const handleSendQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch('/api/questions/create-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: title, description: content, category_id: Number(selectedCategory) })
            })

            if (response.ok) {
                const message = await response.json();
                alert(message.message);
                setIsOpen(false)
                router.push('/');
            } else {
                const data = await response.json();
                alert(`Erro ao criar pergunta: ${data.message}`);
            }

        } catch (error) {
            alert('Erro! Pergunta não enviada, tente novamente mais tarde');
            console.error('Erro ao enviar pergunta: ', error);
        } finally {
            setIsSending(false)
        }
    }

    const handleNavigateQuestions = () => {
        router.push('/questions');
    }

    const handleContentChange = (value: string) => {
        const sanitizedContent = value.replace(
          /href="(www\.[^\s"]+)"/g,
          'href="https://$1"'
        );
        setContent(sanitizedContent);
    };


    const handleOpenModal = () => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            router.push('/auth/signin');
        }

        setIsOpen(true);
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
                type="button"
                onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus" style={{backgroundColor: "transparent"}}></i> Criar
                    <span className={styles.text_button}>pergunta</span>
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false) } className={stylesModal.modal}>
                <div className={stylesModal.overlay} aria-hidden="true" />
                <DialogPanel className={stylesModal.content}>
                    <h2 className={stylesModal.title_header}>Qual sua dúvida?</h2>
                    <form method="POST" onSubmit={handleSendQuestion}>
                        <div className={stylesModal.area_inputs}>
                            <label htmlFor="title" className={stylesModal.label_form}>Título</label>
                            <input
                            type="text"
                            name="title"
                            placeholder="Insira o título"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className={stylesModal.input_form}/>
                        </div>

                        <div className={stylesModal.area_category}>
                            <p className={stylesModal.text_category}>Categoria: </p>
                            <select
                            name="category"
                            className={stylesModal.select_category}
                            value={selectedCategory}
                            required
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="" disabled></option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.category}</option>
                                ))}
                            </select>
                        </div>

                        <div className={stylesModal.area_box_response}>
                            <p className={stylesModal.text_description}>Descrição</p>
                            <QuillEditor value={content} onChange={handleContentChange} />

                            <div className={stylesModal.area_button_send}>
                                <button
                                    className={stylesModal.button_send}
                                    type="submit"
                                    disabled={isSending}
                                >
                                    {isSending ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>

                        </div>
                    </form>
                </DialogPanel>
            </Dialog>
        </div>
    )
}

export default ButtonsHome;