import { useContext } from "react"
import {AuthContext} from "../context/authContext"

const useAuth = () => {
    const auth = useContext(AuthContext);
    
    const login = async (email: string, password: string) => {
        const res = await fetch('/api/user/login',{
            method: "POST",
            body: {
                email: email,
                password: password
            }
        })
        const json = await res.json();
        auth?.setState({
            token: json.message.userId,
            loggedIn: true
        })
    }

    const logout = () => {
        if (auth === null) return;
        auth.setState({
            token: '',
            loggedIn: false
        })
    }

    return {
        auth.state.token, auth.state.loggedIn, login, logout
    }
}

export default useAuth;