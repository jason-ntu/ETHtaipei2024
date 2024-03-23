import Card from "../component/Card";

export default function page(second) {
  return (
    <div className="className="mx-auto max-w-screen-2xl bg-myFifthColor>
      <Card
        room_name={"SINGLE"}
        price={599}
        image={"./cat.jpg"}
        rating={4.8}
        description={"hello world"}
      />
      <Card
        price={599}
        image={"./cat.jpg"}
        rating={4.8}
        description={"hello world"}
      />
    </div>
  );
}
