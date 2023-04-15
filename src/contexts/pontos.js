import React, { createContext } from 'react';

export const PontosContext = createContext()

export default function PontosProvider({children}){

    const valores = {
        pontos: 0
    }

    return (
        <PontosContext.Provider value={valores}>
            {children}
        </PontosContext.Provider>
    )

}