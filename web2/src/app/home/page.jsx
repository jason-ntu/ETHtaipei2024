import Card from "../component/Card";

export default function page(second) {
  return (
    <div className="className=" mx-auto max-w-screen-2xl>
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
  );
}
