type HandleJoinRoomProps = {
  handleRoomName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickJoin: () => void;
};

function JoinRoom(props: HandleJoinRoomProps) {
  return (
    <div>
      test
      <input
        onChange={(e) => {
          props.handleRoomName(e);
        }}
      />
      <button
        onClick={() => {
          props.onClickJoin();
        }}
      >
        join
      </button>
    </div>
  );
}

export default JoinRoom;
