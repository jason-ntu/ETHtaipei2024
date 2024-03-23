"use client";

import {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import { Card, TextField, styled } from '@mui/material';

export interface IUserInfo{
    name: string
    tokenLeft: number
    walletAddress: string
    email: string 
}

const Label = styled('span')({
    display: 'inline-block',
    width: '30%'
});

const Row = styled('div')({
    width: '100%',
    padding: '.5rem .2rem',
    display: 'flex',
    alignItems: 'center'
})

const UserInfoPage = () => {

    const auth = useAuth();
    const [userInfoObj, setUserInfoObj] = useState<IUserInfo|null>(null);

    useEffect(() => {
        setUserInfoObj({
            name: 'Johnson Chen',
            email: 'johnson@gmail.com',
            walletAddress: '0x123412341234',
            tokenLeft: 90
        })
    },[auth.token])
    
    return (
        userInfoObj !== null?
        <div style={{padding: '.5rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{userInfoObj.name}</h2>
            
            <Row><Label>Email:</Label><TextField value={userInfoObj.email} disabled/></Row>
            <Row><Label>Wallet Address:</Label> <TextField value={userInfoObj.walletAddress} disabled/></Row>
            <Row><Label>#Token:</Label> <b>{userInfoObj.tokenLeft}</b></Row>

            <Card>
                
            </Card>
        </div> :
        null
    )
}

export default UserInfoPage;