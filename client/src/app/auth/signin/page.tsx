import styles from './Login.module.css'
import Image from 'next/image';
import Head from 'next/head';
import LoginForm from '@/app/components/LoginForm';

const LoginPage = () => {
    return (
      <>
        <Head>
          <title>Login</title>
          <meta name="description" content="Página de login do site" />
        </Head>

        <div className={styles.container}>
          <div className={styles.area_login}>
            <div className={styles.image_div}>
            <Image
                src={"/Imagem_Login.png"}
                alt="Logo Site"
                priority
                width={455}
                height={440}
                className={styles.image_login}
            />
            </div>

              <section className={styles.area_form}>
                <h2>Entrar</h2>

                <LoginForm />

              </section>
          </div>
        </div>
      </>
    );
};

export default LoginPage
