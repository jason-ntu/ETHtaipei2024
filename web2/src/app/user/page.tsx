"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace('/user/info');
    })
    return (
        <></>
    )
}

export default UserPage;