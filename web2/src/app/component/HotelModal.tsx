"use client"

import { Grid, Modal, Box, ImageList, ImageListItem, Stack, Chip, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";

export interface IHotelInfo {
    _id: string
    name: string
    description: string
    address: string
    price: number
    imageLinks: string[]
    tags: string[]
    score: number
}

const HotelModal = (props: {
    open: boolean
    setOpen: (val:boolean) => void
    hotelID: string
}) => {

    const [hotelObj, setHotelObj] = useState<IHotelInfo|null>(null);

    useEffect(() => {
        //TODO
        setHotelObj({
            _id: "65fe8bf90b890de531b18a53",
            name: "hotel2",
            address: "No. 1001, St. Whatever, Daan District, Taipei",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus ornare neque eget pellentesque. Maecenas iaculis ante in odio cursus ultrices. Quisque posuere interdum aliquet. Donec laoreet fermentum diam porttitor malesuada. Cras placerat lectus non ullamcorper imperdiet. Mauris in pulvinar est. ",
            price: 20,
            imageLinks: ["http://placekitten.com/200/300","http://placekitten.com/200/300","http://placekitten.com/200/300","http://placekitten.com/200/300"],
            tags:["big room", "pet allowed", "for hackathon candidate"],
            score: 3.5
        })
    }, [props.hotelID])

    const book = () => {

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
                                hotelObj.imageLinks.map((imagelink, idx) => (
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