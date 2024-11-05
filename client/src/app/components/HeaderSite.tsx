"use client"

import { useRouter } from "next/navigation"

interface HeaderSiteProps {
    access_token: string;
}

const HeaderSite = ({ access_token }: HeaderSiteProps) => {
    const router = useRouter()
    const token = access_token;

    const handleLogin = () => {
        router.push('/auth/signin')
    }

    const handleRegister = () => {
        router.push('/auth/signup')
    }

    const handleProfile = () => {
        router.push('/profile')
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('api/logout', {
                method: "POST",
                credentials: 'include',
            });

            if (response.ok) {
                window.location.href = '/auth/signin';
            } else {
                console.error('Erro ao realizar o logout');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição: ', error)
        }
    }

    return (
        <nav>

            {!token ? (
                <button type="button" className="button-enter" onClick={handleLogin}>Login</button>
            ) : (
                <button type="button" className="button-enter" onClick={handleLogout}>Logout</button>
            )}

            <button type="button" className="button-enter" onClick={handleRegister}>Cadastro</button>
            <button type="button" className="button-profile" onClick={handleProfile}>
                <i className="fa-solid fa-user"></i>
            </button>
        </nav>
    );
}

export default HeaderSite;