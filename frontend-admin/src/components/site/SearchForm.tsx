"use client";

import { escapeCPF } from "@/utils/escapeCPF";
import { useState } from "react";

type Props = {
    onSearchButton: (cpf: string) => void;
    loading: boolean;
}

export const SearchForm = ({ onSearchButton, loading }: Props) => {
    const [cpfInput, setCpfInput] = useState('');

    return (
        <div className="p-3">
            <p className="mb-5 text-xl ">Qual o seu CPF?</p>
            <input 
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CPF"
                className=" w-full p-3 bg-white text-black text-center text-4xl rounded-lg disabled:opacity-20 caret-transparent focus:border-4 border-yellow-500 focus:outline-none"
                autoFocus
                value={cpfInput}
                onChange={(e) => setCpfInput(escapeCPF(e.target.value))}
                disabled={loading}
            />
            <button 
                className="w-full p-3 mt-3 rounded-lg bg-yellow-500 text-white text-4xl disabled:opacity-20 hover:bg-yellow-600 cursor-pointer"
                onClick={() => onSearchButton(cpfInput)}
                disabled={loading}
            >{loading ? 'Buscando...' : 'Entrar'}</button>
        </div>
    );
}