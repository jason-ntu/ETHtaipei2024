"use client";
import Card from "./component/Card";
import Header from "./component/Header";

import axios from "axios";
import { useEffect } from "react";

export default function page() {

  useEffect(() => {
    const getData = async () => {
      fetch(`https://dac6-219-87-81-162.ngrok-free.app/api/hotel`,{
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        })
        .then((res) => res.json())
        .then(json => console.log(json))
       
    };
    getData();
  }, []);
  const res = {
    "status": 200,
    "message": [
        {
            "_id": "65fe92ddc757f6695658d4ad",
            "name": "hotel2",
            "address": "my address",
            "description": "my description",
            "price": 150,
            "imageLink": [
                "https://imgur.com/u6ubXze"
            ],
            "tags": [
                "環境好",
                "超推"
            ],
            "rating": 4.2
        },
        {
            "_id": "65fe93edc757f6695658d4b2",
            "name": "hotel1",
            "address": "my address",
            "description": "my description",
            "price": 100,
            "imageLink": [
                "https://imgur.com/uMXMmpD"
            ],
            "tags": [
                "環境好",
                "超推"
            ],
            "rating": 4.3
        }
    ]
}
  return (
    <>
      <div className="mx-auto max-w-screen-2xl">
        <Header homepage={true} />
        <img className="block mx-auto" src="./banner.jpg" alt="banner" />
        <h2 className="mx-auto mb-2 mt-6 max-w-screen-2xl text-2xl font-bold">
          人氣民宿、公寓類型住宿
        </h2>
        <ul className="mx-auto flex max-w-screen-2xl flex-wrap ">
        {res.message.map(({_id,name, description, price, rating}) => { <Card
            id={_id}
            room_name={name}
            price={price}
            image={"./cat.jpg"}
            rating={rating}
            description={"hello world"}
          />
           })}
          <Card
            id={1}
            room_name={"SINGLE"}
            price={599}
            image={"./cat.jpg"}
            rating={4.8}
            description={"hello world"}
          />
          
          
          
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
