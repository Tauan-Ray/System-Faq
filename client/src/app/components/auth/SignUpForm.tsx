"use client"

import { useState } from 'react';
import styles from '@/app/styles/Login.module.css'
import Link from 'next/link';
import InputPassword from './InputPassword';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(['']);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isNumeric = /^\d+$/.test(name);
    if (isNumeric) {
      setErrorMessage(['O nome de usuário não deve ser composto apenas de número.']);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(['As senhas não coincidem.']);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        const errorData = await response.json();

        const errorMessages = Array.isArray(errorData.message) ? errorData.message : [errorData.message];
        setErrorMessage(errorMessages || ['Falha no Cadastro.']);
      }
    } catch {
      console.error('Erro ao fazer cadastro.');
    }
}

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errorMessage) setErrorMessage(['']);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage(['']);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage(['']);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errorMessage) setErrorMessage(['']);
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

        <InputPassword
          password={password}
          confirmPassword={confirmPassword}
          handlePasswordChange={handlePasswordChange}
          isConfirmPassword = {false}
        />

        </div>

        <div className={styles.div_input}>
          <label htmlFor="confirm-password" className={styles.label_input}>Confirme sua senha</label>
          <InputPassword
            password={password}
            confirmPassword={confirmPassword}
            handlePasswordChange={handleConfirmPasswordChange}
            isConfirmPassword = {true}
          />
        </div>

        <p className={styles.text_to_sign}>Ja possui uma conta?
          <Link href="/auth/signin" className={styles.link_to_sign}>
              Entre Agora!
          </Link>
        </p>

        {errorMessage && errorMessage.map((error, index) => (
          <p className={styles.error_message} key={index}>{error}</p>
        ))}


        <button type="submit" className={styles.button_login} aria-label='Fazer Cadastro'>Cadastrar</button>
    </form>
  );
}

export default RegisterForm;
