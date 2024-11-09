export interface InputPasswordProps {
    isConfirmPassword?: boolean;
    password: string;
    confirmPassword?: string
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}