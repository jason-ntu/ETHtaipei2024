"use client"

import { Button } from '@mui/material';
import HotelModal from '../component/HotelModal'
import { useState } from 'react';

const Test = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>
            <HotelModal open={open} setOpen={setOpen} hotelID="12"/>
        </>
    )
}

export default Test;