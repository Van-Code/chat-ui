import { useState } from 'react';
import MessageContent from './MessageContent';

export default function ListItem(props) {
  const [showReplyBtn, setIsShown] = useState(false);

  const ReplyButton = () => {
    const replies = props.content.replies || [];
    const replyCount = replies.length;

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          props.handleOpenThread(props.content.id);
        }}
        className="textBtn replyBtn"
      >
        {replyCount > 0 ? `${replyCount}  Replies` : 'Reply'}
      </button>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <MessageContent
        content={props.content}
        user={props.user}
      ></MessageContent>

      <div>{showReplyBtn && <ReplyButton content={props.content} />}</div>
    </div>
  );
}
