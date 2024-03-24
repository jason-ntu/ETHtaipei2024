"use client";
import Card from "./component/Card";
import Header from "./component/Header";
import HotelModal, { IHotelInfo } from "./component/HotelModal";


import axios from "axios";
import { useEffect, useState } from "react";

export default function page() {
  const [data, setData] = useState<{
    message: any[]
  }|null>(null);

  useEffect(() => {
    const getData = async () => {
      axios
        .get(`https://dac6-219-87-81-162.ngrok-free.app/api/hotel`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((res) => {
          setData(res.data)
          console.log(res.data)
        });
      ;
    };
    getData();
  }, []);

  const [open, setOpen] = useState(false);
  const [hotelObj, setHotelObj] = useState<IHotelInfo|null>(null);

  return (
    <>
      <HotelModal open={open} setOpen={setOpen} hotelObj={hotelObj}/>
      <div className="mx-auto max-w-screen-2xl">
        <Header homepage={true} />
        <img className="block mx-auto" src="./banner.jpg" alt="banner" />
        <h2 className="mx-auto mb-2 mt-6 max-w-screen-2xl text-2xl font-bold">
          人氣民宿、公寓類型住宿
        </h2>
        <ul className="mx-auto flex max-w-screen-2xl flex-wrap ">
          {data === null? null:
          data.message.map((mes) => 
            <Card
              key={mes._id}
              room_name={mes.name}
              price={mes.price}
              image={mes.imageLink}
              rating={mes.rating}
              description={mes.description}
              onClick={() => {
                setOpen(true);
                setHotelObj(mes);
              }}
            />
          )}
        </ul>
        <div style={{ background: "#E1E6E0" }}>
          <p
            style={{
              height: "400px",
              textAlign: "center",
              paddingTop: "60px",
              fontSize: "30px",
            }}
          >
            今天開始訂閱加入，開啟一趟旅行！
          </p>
        </div>
      </div>
    </>
  );
}
