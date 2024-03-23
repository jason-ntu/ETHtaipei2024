"use client"

import { createContext, useState } from "react"

export interface IAuth {
    token: string
    loggedIn: boolean
}

export const authInitalVal:IAuth = {
    token: '',
    loggedIn: false
}

const AuthContext = createContext<{state: IAuth, setState: (_:IAuth) => void}|null>(null);

const AuthProvider = (props:any) => {
    const [auth, setAuth] = useState<IAuth>(authInitalVal);
    return (
        <AuthContext.Provider value={{
            state: auth,
            setState: setAuth
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}