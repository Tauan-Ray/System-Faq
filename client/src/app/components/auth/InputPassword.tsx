import styles from "@/app/styles/Login.module.css"
import { useState } from "react"

interface InputPasswordProps {
    isConfirmPassword?: boolean;
    password: string;
    confirmPassword?: string
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({
      isConfirmPassword,
      password,
      confirmPassword,
      handlePasswordChange,
    }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleTogglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }


    return (
        <div className={styles.input_password}>
          <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={isConfirmPassword ? "Confirme sua senha" : "Senha"}
          name={isConfirmPassword ? 'confirm-password' : 'password'}
          className={styles.input_form}
          aria-label='Senha'
          value={isConfirmPassword ? confirmPassword : password}
          onChange={handlePasswordChange}
          required
          style={{
            width: "85%",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderRight: "0px",
            border: "none"
          }}
          />

          <button
            type="button"
            className={styles.button_eye}
            onClick={handleTogglePassword}>
              <i className={isPasswordVisible ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                style={{
                  fontSize: "20px",
                  position: "relative",
                  top: "1.5px",
                }}/>
          </button>
        </div>
    )
}

export default InputPassword;