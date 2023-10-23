import { useState } from 'react';
import MessageContent from './MessageContent';
import Input from './Input';

export default function ListItem(props) {
  const [showThreadPanel, toggleThreadPanel] = useState(false);
  const [showReplyBtn, setIsShown] = useState(false);
  const [threadReplies, updateReplyList] = useState([]);

  const onSend = (reply) => {
    updateReplyList((threadReplies) => [...threadReplies, reply]);
    toggleThreadPanel(false);
  };

  const ReplyButton = () => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          props.handleOpenThread(props.content.id);
        }}
        className="textBtn replyBtn"
      >
        Reply
      </button>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <MessageContent content={props.content}></MessageContent>

      <div>
        {threadReplies.map((reply, y) => {
          return <MessageContent content={reply} key={y} />;
        })}
        {showReplyBtn && <ReplyButton content={props.content} />}
        {showThreadPanel && (
          <Input handleSend={onSend} threadId={props.content.id} />
        )}
      </div>
    </div>
  );
}
