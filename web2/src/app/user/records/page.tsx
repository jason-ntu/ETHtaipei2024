"use client";

import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const UserRecordsPage = () => {

    const auth = useAuth();

    useEffect(() => {
        
    },[auth.token])

    return (
        <>still under construction</>
    )
}

export default UserRecordsPage;