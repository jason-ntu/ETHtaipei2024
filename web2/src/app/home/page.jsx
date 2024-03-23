import Card from "../component/Card";
import Button from "../component/Button";

export default function page(second) {
  return (
    <div className="className=" mx-auto max-w-screen-2xl>
      <Button 
      style={"rounded-full bg-green-600 px-5 py-3 text-center text-md font-medium text-white hover:bg-myyFirstColorHover hover:text-white; w-28 h-16 font-medium"}
      text={"TEST"}
      />
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
  );
}
