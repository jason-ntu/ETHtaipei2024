"use client";

import { useRouter, useSearchParams } from "next/navigation"
import Header from "../component/Header"
import { useEffect, useState } from "react";
import { IHotelInfo } from "../component/HotelModal";

export interface IRecord {
	hotelId: string,
	userId: string,
	bookingDateStart: number, //timestamp
	bookingDateEnd: number, //timestamp
	transactionAddr: string,
	timestamp: number
}

const RecordPage = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [recordObj, setRecordObj] = useState<IRecord|null>(null);
    const [hotelObj, setHotelObj] = useState<IHotelInfo|null>(null);

    useEffect(() => {
        if (id === undefined) {
            alert('please specify id');
            router.replace('/')
        } else {
            (async function() {
                try{
                    const res = await fetch(`/api/record/${id}`);
                    const json = await res.json();
                    if (json.status === 200){
                        setRecordObj(json.message);
                    } else {
                        console.log('non 200 res', json);
                    }
                } catch (err) {
                    console.error('error while fetching record data',err);
                }
            })();
        }
    },[])

    useEffect(() => {
        if (recordObj === null || !(recordObj.hotelId)) return;

        (async function() {
            try{
                const res = await fetch(`/api/hotel?id=${recordObj.hotelId}`);
                const json = await res.json();
                if (json.status === 200){
                    setHotelObj(json.message);
                } else {
                    console.log('non 200 res (fetching hotel)', json);
                }
            } catch (err) {
                console.error('error while fetching hotel data',err);
            }
        })();
    }, [recordObj?.hotelId])
    
    return (
        <div id="record-page">
            <Header/>
            {
                recordObj === null?null:
                <main style={{width: '1000px', margin: '0 auto'}}>
                    {JSON.stringify(recordObj)}
                    {JSON.stringify(hotelObj)}
                    helloworld
                </main>
            }
        </div>
    )
}

export default RecordPage;