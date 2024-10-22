import styles from '@/app/styles/Login.module.css'
import Image from 'next/image';
import Head from 'next/head';
import RegisterForm from '@/app/components/auth/SignUpForm';

const RegisterPage = () => {
    return (
      <>
        <Head>
          <title>Cadastro</title>
          <meta name="description" content="Página de Cadastro do site" />
        </Head>

        <div className={styles.container}>
          <div className={styles.area_login}>
            <div className={styles.image_div}>
            <Image
                src={"/Imagem_Login.png"}
                alt="Logo Site"
                priority
                width={455}
                height={612}
                className={styles.image_login}
            />
            </div>

              <section className={styles.area_form}>
                <h2>Cadastre-se</h2>

                <RegisterForm />

              </section>
          </div>
        </div>
      </>
    );
};

export default RegisterPage
