'use client';

import { useEffect, useState } from "react";
import Header from "../component/Header";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Card, TextField, Button } from "@mui/material";

const LoginPage = () => {

    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log(auth)
        if (auth.loggedIn) {
            router.push('/');
        }
    }, [auth.loggedIn])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth.login(email, password);
    }

    return (
        <div id="login-page">
            <Header/>
            <Card sx={{margin: '1rem auto', width: '400px' ,padding: '1rem'}}>
                <h2 style={{fontSize: '1.2rem', fontWeight:'500', marginBottom:'1rem'}}>Login</h2>
                <TextField sx={{display: 'block', mb: '1rem'}} fullWidth value={email} onChange={(e) => setEmail(e.target.value)} label="Email"/>
                <TextField sx={{display: 'block', mb: '1rem'}} fullWidth value={password} onChange={(e) => setPassword(e.target.value)} label="Password"/>
                <Button sx={{display: 'block',}} onClick={handleLogin}>Log in</Button>
            </Card>        
        </div>
    )
}

export default LoginPage;