'use client';

import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { SERVER } from "../constant";

const useAuth = () => {
    const auth = useContext(AuthContext);
    
    const login = async (email: string, password: string) => {
        try{
            const res = await fetch(`${SERVER}/api/user/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const json = await res.json();
            if (json.status === 200){
                auth?.setAuth({
                    token: json.message.userId,
                    loggedIn: true
                })
            } else {
                alert('log in failed.')
            }
        } catch(err) {
            console.error('error occured while loggin in', err);
        }
    }

    const logout = () => {
        if (auth === null) return;
        auth.setAuth({
            token: '',
            loggedIn: false
        })
    }

    return {
        token: auth === null? '' : auth.auth.token,
        loggedIn: auth === null? false : auth.auth.loggedIn,
        login: login,
        logout: logout
    }
}

export default useAuth;