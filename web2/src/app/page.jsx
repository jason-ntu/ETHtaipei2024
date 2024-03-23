import Card from "./component/Card";
import Header from "./component/Header";

export default function page(second) {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl">
        <Header homepage={true} />
        
        <h2 className="mx-auto max-w-screen-2xl text-2xl font-bold">
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
      </div>
    </>
  );
}
