import stylesModal from "@/app/styles/Modal.module.css";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";

interface ModalCategoryProps {
    onClose: () => void;
    isOpen: boolean;
    category_actual?: string;
    mode: "create" | "edit";
    id?: number;
}

const ModalCategory = ({ isOpen, onClose, category_actual = "", mode, id }: ModalCategoryProps) => {
    const [isSending, setIsSending] = useState(false);
    const [category, setCategory] = useState('');

    useEffect(() => {
        setCategory(category_actual || '');
    }, [category_actual])


    const handleSendCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSending(true);

        const url = mode === 'create'
        ? '/api/categories/create-category'
        : `/api/categories/edit-category/${id}`;

        try {
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ category: category }),
            });

            if (response.ok) {
                const message = await response.json();
                alert(message.message);
                window.location.reload();
            } else {
                const data = await response.json();
                console.log(data)
                alert(`Erro: ${data.error}`);
            }
        } catch (error) {
            alert('Erro! Tente novamente mais tarde.');
            console.error('Erro ao enviar categoria: ', error);
        } finally {
            setIsSending(false);
        }
    }


    return (
        <div>
            <Dialog open={isOpen} onClose={ onClose } className={stylesModal.modal}>
                <div className={stylesModal.overlay} aria-hidden="true" />
                <DialogPanel className={stylesModal.content}>
                    <h2 className={stylesModal.title_header}>
                        {mode === "create" ? "Criar Nova Categoria" : "Editar Categoria"}
                    </h2>
                    <form method="POST" onSubmit={handleSendCategory}>
                        <div className={stylesModal.area_inputs}>
                            <label htmlFor="title" className={stylesModal.label_form}>Categoria</label>
                            <input
                            type="text"
                            name="category"
                            placeholder="Insira a categoria"
                            value={category}
                            required
                            onChange={(e) => setCategory(e.target.value)}
                            className={stylesModal.input_form}
                            />
                        </div>

                            <div className={stylesModal.area_button_send}>
                                <button
                                    className={stylesModal.button_send}
                                    type="submit"
                                    disabled={isSending}
                                >
                                    {isSending ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>
                    </form>
                </DialogPanel>
            </Dialog>
        </div>
    )
}

export default ModalCategory;