"use client"

import styles from "@/app/styles/BoxResponse.module.css"
import { useState, useEffect } from "react"
import QuillEditor from "./QuillEditor"
import { useRouter } from "next/navigation"

interface BoxResponseProps {
  id_question: number
}

const BoxResponse = ({ id_question }: BoxResponseProps) => {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  const checkAuthentication = async () => {
      const response = await fetch('/api/check-auth', {
          method: 'GET',
          credentials: 'include',
      });

      if (response.ok) {
          const authenticated = (await response.json()).state
          setIsAuthenticated(authenticated);
      } else {
          console.error('Erro ao verificar login')
      }
  }

  useEffect(() => {
      checkAuthentication();
  }, [])

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth/signin')
    }
  }, [isAuthenticated, router])

  const handleSendResponse = async () => {
    setIsSending(true)
    try {
      const response = await fetch(`/api/answers/send-response`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question_id: id_question, response: content }),
      });

      if (response.ok) {
        const message = (await response.json()).message
        alert(message)
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Erro ao enviar a resposta: ${errorData.message || 'Desconhecido' }`)
      }
    } catch (error) {
      console.error("Erro na requisição: ", error)
      alert('Ocorreu um erro ao tentar enviar a resposta.')
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
    <div className={styles.area_box_response}>
      <p>Responda</p>
      <QuillEditor value={content} onChange={handleContentChange} />
      <button
        onClick={handleSendResponse}
        className={styles.button_send}
        type="button"
        disabled={isSending}
      >
        {isSending ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  )
}

export default BoxResponse;
