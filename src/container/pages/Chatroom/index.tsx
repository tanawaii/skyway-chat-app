import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Peer, { RoomData } from "skyway-js";
import ChatInput from "../../../component/ChatInput";
import ChatViewer from "../../../component/ChatViewer";
import dayjs from "dayjs";

function Chatroom(): JSX.Element {
  const peer = useRef<any>();
  const room = useRef<any>();

  const peerRef = new Peer({ key: "7f6811d4-2b08-4bd7-8be8-cd036923e473" });
  peer.current = peerRef;
  const history = useHistory();
  const location = useLocation<{ roomName: string }>();

  const roomName = location.state.roomName;
  const userName = /*location.state.userName;*/ "testUser";

  const [sendMessage, setSendMessage] = useState("");
  const [chatMessage, setChatMessage] = useState<
    {
      user: string;
      text: string;
      meta: { type: "system" | "sendMessage" | "receiveMessage" };
      date: string;
    }[]
  >([]);

  useEffect(() => {
    console.log("test");
    peer.current.on("open", () => {
      if (!roomName) {
        history.push("/");
      }
      room.current = peer.current.joinRoom("roomName", { mode: "mesh" });
      console.log(roomName);

      room.current.on("open", () => {
        setChatMessage((prev) => [
          ...prev,
          {
            user: "system",
            text: `${roomName}へ${userName}として入室しました。`,
            meta: { type: "system" },
            date: dayjs().format(),
          },
        ]);
      });

      // data受信イベント
      room.current.on("data", ({ data, src }: RoomData) => {
        // console.log("受信完了", data);
        setChatMessage((prev) => [
          ...prev,
          {
            user: data.user,
            text: data.text,
            meta: { userId: src, type: "receiveMessage" },
            date: data.date,
          },
        ]);
      });

      // 他ユーザ入室イベント
      room.current.on("peerJoin", (peerId: string) => {
        setChatMessage((prev) => [
          ...prev,
          {
            user: "system",
            text: `${peerId}が入室しました。`,
            meta: { type: "system" },
            date: `${dayjs()}`,
          },
        ]);
      });
      // 他ユーザ退室イベント
      room.current.on("peerLeave", (peerId: string) => {
        setChatMessage((prev) => [
          ...prev,
          {
            user: "sytem",
            text: `${peerId}が退室しました。`,
            meta: { type: "system" },
            date: `${dayjs()}`,
          },
        ]);
      });
      // 自分の退室イベント
      room.current.on("close", () => {
        setChatMessage((prev) => [
          ...prev,
          {
            user: "system",
            text: `${roomName}から退室しました。`,
            meta: { type: "system" },
            date: `${dayjs()}`,
          },
        ]);
      });
    });
  }, []);

  const hundleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendMessage(event.target.value);
  };

  const onClickSend = () => {
    if (room.current.send || room.current.send !== "") {
      const currentTime = dayjs().format();
      setChatMessage((prev) => [
        ...prev,
        {
          user: userName ? userName : "unkown",
          text: sendMessage,
          meta: { type: "sendMessage" },
          date: currentTime,
        },
      ]);

      room.current.send({ text: sendMessage, user: "user", date: currentTime });
      setSendMessage("");
    }
  };

  return (
    <div>
      chatroom
      <ChatInput
        handleChatInput={hundleChatInput}
        onClickSend={onClickSend}
        currentInput={sendMessage}
      />
      {sendMessage}
      <ChatViewer chatMessage={chatMessage} />
    </div>
  );
}

export default Chatroom;
