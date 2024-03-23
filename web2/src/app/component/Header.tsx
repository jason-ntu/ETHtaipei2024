"use client";

import Link from "next/link";
import CottageIcon from '@mui/icons-material/Cottage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Header = (props: {
    homepage: boolean
}) => {

    const auth = useAuth();

    const [opacity, setOpacity] = useState(1);
    const OPACITY_COEFFIECIENT = 0.0005;

    useEffect(() => {
        if (!props.homepage) return;
        window.addEventListener('scroll', () => {
            setOpacity(window.scrollY * OPACITY_COEFFIECIENT);
        })
    }, [])

    return (
        <header style={{position: props.homepage?'fixed':undefined,  backgroundColor: `rgba(255,255,255,${opacity})`}}>
            <div style={{display: 'flex', width: '900px', margin: '0 auto', padding: '.5rem 0'}}>
                <div style={{flex: 1}}>
                    <Link href='/' style={{display:'flex', alignItems:'center'}}>
                        <CottageIcon/><span style={{padding: '.2rem', fontWeight:'bold', fontSize: '1.2rem'}}>Circoda</span>
                    </Link>
                </div>
                {
                    auth.loggedIn?
                        <div>
                            <Link href="/user/info"><AccountCircleIcon/></Link>
                        </div> :
                        <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                            <Link href="/login">
                                <span style={{padding: '.3rem .7rem'}}>LOGIN</span>
                            </Link>
                            <Link href="/signup">
                                <span style={{padding: '.3rem .7rem', border: 'white 2px solid'}}>SIGN UP</span>
                            </Link>
                        </div>
                }
            </div>
        </header>
    )
}

export default Header;