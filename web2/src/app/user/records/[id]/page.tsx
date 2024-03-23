'use client';

import { useEffect, useState } from "react";
import { SERVER } from "../../../constant";
import { IHotelInfo } from "../../../component/HotelModal";
import { IUserInfo } from "../../info/page";
import { CircularProgress, Divider, Grid } from "@mui/material";
import Image from "next/image";

export interface IRecord{
    hotel: IHotelInfo
    user: IUserInfo
    transactions: {
        CCM_txHash: string
        CCR_txHash: string
    }
}

const SingleRecordPage = ({params}) => {

    const [recordObj, setRecordObj] = useState<IRecord|null>(null);

    useEffect(() => {
        (async function(){
            try{

                const res = await fetch(`${SERVER}/api/payment/booking?id=${params.id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    }
                });
                const json = await res.json();
                if (json.status === 200) {
                    setRecordObj(json.message);
                } else {
                    alert('fml');
                }
            } catch (err) {
                console.error('error while fetching record information', err)
            }
            
        })();
    }, [])
    return (
        <>
            {recordObj === null? <CircularProgress/>:
            <>
                <h3>{recordObj.hotel.name}</h3>
                <img src={recordObj.hotel.imageLink[0]} alt="" width={200} height={200}/>
                <Divider/>
                <Grid container>
                    <Grid xs={4}>User</Grid>
                    <Grid xs={8}>{recordObj.user.name}</Grid>
                    <Grid xs={4}>CCM_txHash</Grid>
                    <Grid xs={8}>{recordObj.transactions.CCM_txHash}</Grid>
                    <Grid xs={4}>CCR_txHash</Grid>
                    <Grid xs={8}>{recordObj.transactions.CCR_txHash}</Grid>
                </Grid>
            </>
            }
        </>
    )
}

export default SingleRecordPage;