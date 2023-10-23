export default function MessageContent(props) {
  const { name, time, message } = props.content;

  return (
    <div className="item my-2">
      <img
        src="https://ui-avatars.com/api/?name=Van+Tran"
        alt="user avatar"
        className="avatar"
      />
      <div>
        <strong className="senderName">{name}</strong>
        <span className="time pl-4">{time}</span>
        <div className="message">{message}</div>
      </div>
    </div>
  );
}
