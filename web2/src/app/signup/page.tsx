"use client";

import { Button, Card, TextField } from "@mui/material";
import Header from "../component/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVER } from "../constant";

const SignupPage = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [name, setName] = useState('');

    const router = useRouter();

    const handleSignup = () => {
        (async function() {
            try{
                const res = await fetch(`${SERVER}/api/user/register`, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        password: password,
                        email: email
                    })
                })
                const json = await res.json();
                if (json.status === 200) {
                    alert('success');
                    router.push('/');
                } else {
                    alert('sign up failed')
                }
            } catch (err) {
                console.error(err)
            }
        })();
    }

    return (
        <div id="signup-page">
            <Header/>
            <Card sx={{margin: '1rem auto', width: '400px' ,padding: '1rem'}}>
                <h2 style={{fontSize: '1.2rem', fontWeight:'500', marginBottom:'1rem'}}>Sign up</h2>
                <TextField sx={{display: 'block', mb: '1rem'}} fullWidth value={name} onChange={(e) => setName(e.target.value)} label="Name"/>
                <TextField sx={{display: 'block', mb: '1rem'}} fullWidth value={email} onChange={(e) => setEmail(e.target.value)} label="Email"/>
                <TextField sx={{display: 'block', mb: '1rem'}} fullWidth value={password} onChange={(e) => setPassword(e.target.value)} label="Password"/>
                <Button sx={{display: 'block',}} onClick={handleSignup}>Sign up</Button>
            </Card>  
        </div>
    )
}

export default SignupPage;