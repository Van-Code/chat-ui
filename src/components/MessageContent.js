export default function MessageContent(props) {
  const { time, message } = props.content;
  const { full_name, preferred_name, pronouns, show_pronouns } = props.user;
  const encodedName = full_name.replaceAll(' ', '+') || 'User';
  const display_name = preferred_name || full_name;
  const pronouns_text = show_pronouns ? `(${pronouns})` : '';

  return (
    <div className="item my-2">
      <img
        src={`https://ui-avatars.com/api/?name=${encodedName}`}
        alt={`${display_name} avatar`}
        className="avatar"
      />
      <div>
        <strong className="senderName">
          {display_name} {pronouns_text}
        </strong>
        <span className="time pl-4">{time}</span>
        <div className="message">{message}</div>
      </div>
    </div>
  );
}
