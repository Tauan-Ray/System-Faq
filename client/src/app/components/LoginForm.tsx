"use client"

import { useState } from 'react';
import styles from '../auth/signin/Login.module.css'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router  = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('access_token', data.access_token);
        Cookies.set('refresh_token', data.refresh_token);
        router.push('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Falha no Login')
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  return (
    <form onSubmit={handleLogin} className={styles.form_login}>
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

        <p className={styles.text_to_sign}>Não tem uma conta?
        <a href="" className={styles.link_to_sign}>Crie agora!</a>
        </p>

        {errorMessage && <p className={styles.error_message}> {errorMessage} </p>}

        <button type="submit" className={styles.button_login} aria-label='Fazer Login'>Login</button>
    </form>
  );
};

export default LoginForm;
