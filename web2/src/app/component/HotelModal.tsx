"use client"

import { Grid, Modal, Box, ImageList, ImageListItem, Stack, Chip, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { SERVER } from "../constant";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export interface IHotelInfo {
    _id: string
    name: string
    description: string
    address: string
    price: number
    imageLink: string[]
    tags: string[]
    score: number
}

const HotelModal = (props: {
    open: boolean
    setOpen: (val:boolean) => void
    hotelObj: IHotelInfo | null
}) => {

    const {hotelObj} = props;
    const router = useRouter();
    const auth = useAuth();

    const book = async () => {
        try {
            const res = await fetch(`${SERVER}/api/payment/booking`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: auth.token,
                    hotelId: hotelObj?._id,
                })
            });
            const json = await res.json();
            if (json.status === 200) {
                alert('successfully booked!');
                router.push(`/user/records/${json.message.bookingId}`)
            } else {
                console.log('fml');
            }
        } catch (err) {
        }
    }


    return (
        <Modal open={props.open} onClose={() => props.setOpen(false)} keepMounted>
            <Grid container style={{
                width: '90vw', 
                height: '90vh', 
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgb(var(--background-rgb))',
                overflow: 'hidden',
                borderRadius: '.2rem'
                }}>
                <Grid xs={4} style={{height: "100%", padding: '.4rem'}}>
                    <ImageList cols={1} rowHeight={400} style={{height: "100%"}}>
                        {
                            hotelObj === null?
                                null:
                                hotelObj.imageLink.map((imagelink, idx) => (
                                    <ImageListItem key={idx+imagelink}>
                                        <img src={imagelink} alt="" style={{width: '100%'}}/>
                                    </ImageListItem>
                                ))
                        }
                    </ImageList>
                </Grid>
                <Grid xs={8} style={{height: "100%", padding: '.4rem'}}>
                    {
                        hotelObj === null?
                            null:
                            <>
                                <div className="group-border" style={{height: 'calc(100% - 4rem)'}}>
                                    <h2 style={{fontSize: '2rem', fontWeight: 'bold'}}>{hotelObj.name}</h2>
                                    <span style={{fontWeight: '500'}}>{hotelObj.address}</span>
                                    <Divider style={{margin: '.5rem 0'}}/>
                                    <Stack direction="row" spacing={1} style={{marginBottom:'.5rem'}}>
                                        {
                                            hotelObj.tags.map((tag, idx) => (
                                                <Chip label={tag} key={tag+idx} />
                                            ))
                                        }
                                    </Stack>
                                    <p style={{opacity: 0.8}}>{hotelObj.description}</p>                   
                                </div>
                                <div className="group-border" style={{height: '3rem', marginTop: '.5rem', display: 'flex', alignItems:'center'}}>
                                    <div style={{flex: '1'}}><b>{hotelObj.price}</b></div>
                                    <div><Button onClick={book}>Book</Button></div>
                                </div>
                            </>
                    }
                </Grid>
            </Grid>
        </Modal>
    )
}

export default HotelModal;