"use client"

import stylesModal from "@/app/styles/Modal.module.css";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Category } from "../types/categoryType";
import { useState, useEffect } from "react";
import { getCategories } from "@/app/utils/getCategories";
import QuillEditor from "../box-response/QuillEditor";

interface CreateQuestionModalProps {
    onClose: () => void;
    isOpen: boolean;
}

const CreateQuestionModal = ({ onClose, isOpen }: CreateQuestionModalProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [title, setTitle] = useState('');

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
                window.location.href='/'
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

    const handleContentChange = (value: string) => {
        const sanitizedContent = value.replace(
          /href="(www\.[^\s"]+)"/g,
          'href="https://$1"'
        );
        setContent(sanitizedContent);
    };


    return (
        <div>
            <Dialog open={isOpen} onClose={ onClose } className={stylesModal.modal}>
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

export default CreateQuestionModal;