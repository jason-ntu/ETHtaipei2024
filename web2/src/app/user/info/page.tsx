"use client";

import {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';

export interface IUserInfo{
    name: string
    tokenLeft: number
    walletAddress: string
    email: string 
}

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
    
    if (userInfoObj !== null){
        return (
            <>
                <h2>{userInfoObj.name}</h2>
                <span>email: {userInfoObj.email}</span>
                <span>wallet addr: {userInfoObj.walletAddress}</span>
                <span>current token: {userInfoObj.tokenLeft}</span>
                
            </>
        )
    } else {
        return null;
    }
}

export default UserInfoPage;