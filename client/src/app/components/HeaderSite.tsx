"use client"

import { useRouter } from "next/navigation"

const HeaderSite = () => {
    const router = useRouter()

    const handleLogin = () => {
        router.push('/auth/signin')
    }

    const handleRegister = () => {
        router.push('/auth/signup')
    }

    const handleProfile = () => {
        router.push('/profile')
    }
    return (
        <nav>
            <button type="button" className="button-enter" onClick={handleLogin}>Login</button>
            <button type="button" className="button-enter" onClick={handleRegister}>Cadastro</button>
            <button type="button" className="button-profile" onClick={handleProfile}>
                <i className="fa-solid fa-user"></i>
            </button>
        </nav>
    );
}

export default HeaderSite;