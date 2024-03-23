'use client';

import { useContext } from "react"
import {AuthContext} from "../context/authContext"

const useAuth = () => {
    const auth = useContext(AuthContext);
    
    const login = async (email: string, password: string) => {
        try{
            const res = await fetch('/api/user/login',{
                method: "POST",
                body: {
                    email: email,
                    password: password
                }
            })
            const json = await res.json();
            if (json.status === 200){
                auth?.setState({
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
        auth.setState({
            token: '',
            loggedIn: false
        })
    }

    return {
        token: auth === null? '' : auth.state.token,
        loggedIn: auth === null? false : auth.state.loggedIn,
        login: login,
        logout: logout
    }
}

export default useAuth;