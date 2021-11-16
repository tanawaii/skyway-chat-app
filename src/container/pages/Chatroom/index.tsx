import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Peer, { RoomData, SfuRoom } from "skyway-js";

function Chatroom(): JSX.Element {
  const peer = useRef<any>();

  const peerRef = new Peer({ key: "7f6811d4-2b08-4bd7-8be8-cd036923e473" });
  peer.current = peerRef;
  const history = useHistory();
  const location = useLocation<{ roomName: string }>();

  const roomName = location.state.roomName;
  // const userName = location.state.userName;

  useEffect(() => {
    peer.current.on("open", () => {
      if (!roomName) {
        history.push("/");
      }
      peer.current.joinRoom("roomName", { mode: "mesh" });
      console.log(roomName);
    });
  });

  return <div>chatroom</div>;
}

export default Chatroom;
