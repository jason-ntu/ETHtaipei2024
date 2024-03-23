import Card from "./component/Card";
import Header from "./component/Header";
import axios from "axios";


export default function page(second) {
  




  return (
    <>
      <div className="mx-auto max-w-screen-2xl">
        <Header homepage={true} />
        <img className="block mx-auto" src="./banner.jpg" alt="banner" />
        <h2 className="mx-auto mb-2 mt-6 max-w-screen-2xl text-2xl font-bold">
          人氣民宿、公寓類型住宿
        </h2>
        <ul className="mx-auto flex max-w-screen-2xl flex-wrap ">
          <Card
            room_name={"SINGLE"}
            price={599}
            image={"./cat.jpg"}
            rating={4.8}
            description={"hello world"}
          />
          <Card
            room_name={"SINGLE"}
            price={599}
            image={"./cat.jpg"}
            rating={4.8}
            description={"hello world"}
          />
          <Card
            room_name={"SINGLE"}
            price={599}
            image={"./cat.jpg"}
            rating={4.8}
            description={"hello world"}
          />
          <Card
            room_name={"SINGLE"}
            price={599}
            image={"./cat.jpg"}
            rating={4.8}
            description={"hello world"}
          />
          <Card
            room_name={"SINGLE"}
            price={599}
            image={"./cat.jpg"}
            rating={4.8}
            description={"hello world"}
          />
          <Card
            room_name={"SINGLE"}
            price={599}
            image={"./cat.jpg"}
            rating={4.8}
            description={"hello world"}
          />
        </ul>
        <div style={{background:"#E1E6E0"}}>
          <p style={{ height: "400px", textAlign:"center",paddingTop:"60px", fontSize:"30px" }}>今天開始訂閱加入，開啟一趟旅行！</p>
        </div>
      </div>
    </>
  );
}
