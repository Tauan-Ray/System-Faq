"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Suggestion {
    id: number,
    question: string;
    description: string;
    creation_date: string;
}

const FormSearchQuestion = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!query.trim()) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(`/api/questions/search-suggestions?q=${query}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    next: { revalidate: 3 },
                });

                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Erro ao buscar sugestões: ', error);
            }
        };

        const debounceTimeout = setTimeout(fetchSuggestions, 300)

        return () => clearTimeout(debounceTimeout);

    }, [query]);

    const handleEnterQuestion = (id: number) => {
        const url = `/questions/${id}`
        setQuery('')
        setSuggestions([]);
        router.push(url)
    }

    return (
        <div>
            <div className="form-header">
                <div className="search-bar">
                    <input
                    type="text"
                    className="input-search"
                    placeholder="Pesquise sua dúvida"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="button" className="button-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => (
                        <li
                        onClick={() => handleEnterQuestion(suggestion.id)}
                        key={suggestion.id}
                        >{suggestion.question}
                        </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    )
}

export default FormSearchQuestion;