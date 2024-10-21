"use client"

import { useState } from 'react';
import styles from '../auth/signin/Login.module.css'
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router  = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/users/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();

            Cookies.set('access_token', data.access_token);
            Cookies.set('refresh_token', data.refresh_token);
            router.push('/');
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Falha no Cadastro.')
        }
    } catch (error) {
        console.error('Erro ao fazer login', error);
    }
}

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  return (
    <form onSubmit={handleRegister} className={styles.form_login}>
        <div className={styles.div_input}>
        <label htmlFor="username" className={styles.label_input}>Nome de usuário</label>
        <input
        type="text"
        placeholder='Nome de usuário'
        name='username'
        className={styles.input_form}
        aria-label='Nome de usuário'
        value={name}
        onChange={handleNameChange}
        required/>
        </div>

        <div className={styles.div_input}>
        <label htmlFor="email" className={styles.label_input}>E-mail</label>
        <input
        type="text"
        placeholder='E-mail'
        name='email'
        className={styles.input_form}
        aria-label='Email'
        value={email}
        onChange={handleEmailChange}
        required/>
        </div>

        <div className={styles.div_input}>
        <label htmlFor="password" className={styles.label_input}>Senha</label>
        <input
        type="password"
        placeholder='Senha'
        name='password'
        className={styles.input_form}
        aria-label='Senha'
        value={password}
        onChange={handlePasswordChange}
        required/>
        </div>

        <div className={styles.div_input}>
        <label htmlFor="confirm-password" className={styles.label_input}>Confirme sua senha</label>
        <input
        type="password"
        placeholder='Confirme sua senha'
        name='password'
        className={styles.input_form}
        aria-label='Confirma senha'
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required/>
        </div>

        <p className={styles.text_to_sign}>Ja possui uma conta?
        <Link href="/auth/signin" className={styles.link_to_sign}>
            Entre Agora!
        </Link>
        </p>

        {errorMessage && <p className={styles.error_message}> {errorMessage} </p>}

        <button type="submit" className={styles.button_login} aria-label='Fazer Cadastro'>Cadastrar</button>
    </form>
  );
}

export default RegisterForm;
