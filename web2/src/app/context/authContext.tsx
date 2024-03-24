"use client"

import { createContext, useState, useEffect } from "react"

export interface IAuth {
    token: string
    loggedIn: boolean
}

export const authInitalVal:IAuth = {
    token: '',
    loggedIn: false
}

const AuthContext = createContext<{auth: IAuth, setAuth: (_:IAuth) => void}>({
    auth: {token: '', loggedIn: false}, setAuth: (_) => {return;}
});

const AuthProvider = (props:any) => {
    const [auth, setAuth] = useState<IAuth>(authInitalVal);

    useEffect(() => {
        console.log('aaa',auth)
    },[auth])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}