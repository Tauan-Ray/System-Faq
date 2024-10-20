import styles from './Login.module.css'
import Image from 'next/image';
import Head from 'next/head';

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

                <form action="" method="post" className={styles.form_login}>
                  <div className={styles.div_input}>
                    <label htmlFor="email" className={styles.label_input}>E-mail</label>
                    <input type="text" placeholder='E-mail' name='email' id='email' className={styles.input_form} aria-label='Email' required/>
                  </div>

                  <div className={styles.div_input}>
                    <label htmlFor="password" className={styles.label_input}>Senha</label>
                    <input type="password" placeholder='Senha' name='password' id='password' className={styles.input_form} aria-label='Senha' required/>
                  </div>

                  <p className={styles.text_to_sign}>Não tem uma conta? 
                    <a href="" className={styles.link_to_sign}>Crie agora!</a>
                  </p>

                  <button type="submit" className={styles.button_login} aria-label='Fazer Login'>Login</button>
                </form>
              </section>
          </div>
        </div>
      </>
    );
};

export default LoginPage
