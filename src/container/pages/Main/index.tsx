import { useState } from "react";
import { useHistory } from "react-router-dom";
import JoinRoom from "../../../component/JoinRoom";

function Main() {
  const [roomName, setRoomName] = useState("");
  const history = useHistory();

  const handleRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const onClickJoin = () => {
    if (roomName === "") return;
    history.push({
      pathname: "/chatroom",
      state: { userName: "testUser", roomName: roomName },
    });
  };

  return (
    <div>
      <JoinRoom handleRoomName={handleRoomName} onClickJoin={onClickJoin} />
    </div>
  );
}

export default Main;
