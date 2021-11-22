type ChatInputProps = {
  handleChatInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSend: () => void;
  currentInput: string;
};

function ChatInput(props: ChatInputProps) {
  return (
    <div>
      <input
        value={props.currentInput}
        onChange={(e) => {
          props.handleChatInput(e);
        }}
      />
      <button
        onClick={() => {
          props.onClickSend();
        }}
      >
        send
      </button>
    </div>
  );
}

export default ChatInput;
