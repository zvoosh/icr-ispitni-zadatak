import React, { createContext, useState } from 'react'
import { IClient } from '../types';

type ContextType = {
    client: IClient | null;
    setClient: React.Dispatch<React.SetStateAction<IClient | null>>
}

type ContextProviderProps = {
    children: React.ReactNode;
}

export const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [client, setClient] = useState<IClient | null>(null);

    return (
        <Context.Provider value={{
            client,
            setClient
        }}>
            {children}
        </Context.Provider>
    )
}