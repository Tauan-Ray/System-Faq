"use client"

import { useState } from 'react';
import styles from '@/app/styles/Login.module.css'
import { useRouter } from 'next/navigation';
import InputPassword from './InputPassword';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(['']);
  const router  = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/')
      } else {
        const errorData = await response.json();

        const errorMessages = Array.isArray(errorData.message) ? errorData.message : [errorData.message];
        setErrorMessage(errorMessages || ['Falha no Login.']);
      }
    } catch {
      console.error('Erro ao fazer login');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage(['']);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage(['']);
  };

  return (
    <form method='POST' onSubmit={handleLogin} className={styles.form_login}>
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
          <InputPassword
            password={password}
            handlePasswordChange={handlePasswordChange}
          />
        </div>

        <p className={styles.text_to_sign}>Não tem uma conta?
        <a href="" className={styles.link_to_sign}>Crie agora!</a>
        </p>

        {errorMessage && errorMessage.map((error, index) => (
          <p className={styles.error_message} key={index}>{error}</p>
        ))}

        <button type="submit" className={styles.button_login} aria-label='Fazer Login'>Login</button>
    </form>
  );
};

export default LoginForm;
