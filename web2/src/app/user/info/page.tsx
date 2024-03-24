"use client";

import {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import { Card, TextField, styled, Divider, Button } from '@mui/material';
import { SERVER } from '../../constant';

export interface IUserInfo{
    name: string
    CCM_amount: number
    USDC_amount: number
    walletAddress: string
    email: string
    isSubscribe: boolean
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

    const loadData = async function(){
        try {
            const res = await fetch(`${SERVER}/api/user?id=${auth.token}`,{
                headers:{
                    "ngrok-skip-browser-warning": "69420",
                }
            });
            const json = await res.json();
            if (json.status === 200) {
                setUserInfoObj(json.message);
            } else {
                throw new Error('fml');
            }
        } catch (err) {
            console.error('error while fetching user info',err);
        }
    }

    useEffect(() => {
        if (!auth.loggedIn) return;
        loadData();
    },[auth.token])

    const subscribe = async () => {
        try{
            const res = await fetch(`${SERVER}/api/payment/subscribe?id=${auth.token}`,{
                headers:{
                    "ngrok-skip-browser-warning": "69420",
                }
            })
            const json = await res.json();
            if (json.status === 200) {
                alert('CCM_txHash: '+ json.message.CCM_txHash + '; USDC_txHash: '+json.message.USDC_txHash);
            } else {
                alert('subscribe faillure')
            }
            await loadData();
        } catch (err) {
            console.error('error while subscribing: ',err)
        }

    }
    
    return (
        userInfoObj !== null?
        <div style={{padding: '.5rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{userInfoObj.name}</h2>
            
            <Row><Label>Email:</Label><TextField value={userInfoObj.email} disabled/></Row>
            <Row><Label>Wallet Address:</Label> <TextField value={userInfoObj.walletAddress} disabled/></Row>
            <Row><Label>#CCM Token:</Label> <b>{userInfoObj.CCM_amount}</b></Row>
            <Row><Label>#USDC Token:</Label> <b>{userInfoObj.USDC_amount}</b></Row>
            <Divider/>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', margin: '.8rem 0'}}>Subscription</h3>
            <Row><Label>Monthly Plan:</Label><Button disabled={userInfoObj.isSubscribe} onClick={() => subscribe()}>{userInfoObj.isSubscribe?'Subscribed':'Subscribe'}</Button></Row>
        </div> :
        JSON.stringify(auth)

    )
}

export default UserInfoPage;