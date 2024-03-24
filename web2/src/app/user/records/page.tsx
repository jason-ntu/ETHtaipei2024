"use client";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { IRecord } from "./[id]/page";
import { SERVER } from "../../constant";
import { Card, Divider } from "@mui/material";
import Link from 'next/link'

const UserRecordsPage = () => {

    const auth = useAuth();

    const [bookings, setBookings] = useState<IRecord[]>([]);

    useEffect(() => {
        (async function(){
            try{
                const res = await fetch(`${SERVER}/api/payment/booking/byuser?id=${auth.token}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    }
                })
                const json = await res.json();
                if (json.status === 200) {
                    setBookings(json.message);
                } else {
                    console.log('i hate myself.');
                }
            } catch (err) {
                console.log('this world sucks.');
            }
        })()
    },[auth.token])

    return (
        <div style={{width: '800px', display: 'flex', gap:'1rem'}}>
        {bookings.map((booking, idx) => {
            return <Link href={`/user/records/${booking.bookingId}`}><Card sx={{width: '250px', padding:'.5rem'}} key={idx+booking.hotel.name}>
                <b>{booking.hotel.name}</b>
                <img src={booking.hotel.imageLink[0]} width="200" height="200" alt="" srcset="" />
                <Divider/>
                <span>{booking.user.name}</span><br/>

            </Card></Link>
        })}
        </div>
    )
}


export default UserRecordsPage;