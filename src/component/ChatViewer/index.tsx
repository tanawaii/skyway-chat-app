import dayjs from "dayjs";

type ChatViewerProps = {
  chatMessage: {
    user: string;
    text: string;
    meta: { type: "system" | "sendMessage" | "receiveMessage" };
    date: string;
  }[];
};

function ChatViewer(props: ChatViewerProps) {
  return (
    <div>
      {props.chatMessage.map((line) => {
        return (
          <p key={line.text + line.date}>
            {line.text}:{dayjs(line.date).format("HH:mm:ss")}
          </p>
        );
      })}
    </div>
  );
}
export default ChatViewer;
