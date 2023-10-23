import { useState } from 'react';
import ListItem from './components/ListItem';
import Container from 'react-bootstrap/Container';
import MessageContent from './components/MessageContent';
import Input from './components/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [list, updateList] = useState([]);
  const [showThreadPanel, setIsShown] = useState(false);
  const [parentMessage, setParentMessage] = useState({
    id: 1,
    name: '',
    time: '',
    message: '',
    replies: [],
  });
  const [index, increment] = useState(1);

  function onParentSend(parentMessage) {
    parentMessage.replies = [];
    const updatedList = [...list, parentMessage];
    updateList(updatedList);

    increment(index + 1);
  }

  function onReplySend(reply) {
    const updatedParentMessage = {
      ...parentMessage,
      replies: [...parentMessage.replies, reply],
    };
    const updatedList = list.map((data) => {
      if (data.id === updatedParentMessage.id) {
        return updatedParentMessage;
      }
      return data;
    });

    setParentMessage(updatedParentMessage);

    updateList(updatedList);
    increment(index + 1);
  }
  const onOpenThreadPanel = (id) => {
    const item = list.find((data) => {
      return data.id === id;
    });
    setParentMessage(item);
    setIsShown(true);
  };
  function SidePanel() {
    return (
      <div className="sidePanel">
        Channels
        <br />
        Announcements
        <br />
        General
        <br />
        Happy Hour
      </div>
    );
  }
  const MainPanel = () => {
    return (
      <div className="mainPanel">
        {list.map((item) => {
          return (
            <ListItem
              content={item}
              key={item.id}
              handleOpenThread={onOpenThreadPanel}
            />
          );
        })}

        <Input handleSend={onParentSend} index={index} />
      </div>
    );
  };
  function ChildReplies() {
    if (!parentMessage.replies) {
      return;
    }
    return parentMessage.replies.map((child) => {
      return <MessageContent content={child} key={child.id} />;
    });
  }

  const ThreadPanel = () => {
    //TOOD: add close button
    return (
      <div className="threadPanel">
        <h1>Thread</h1>
        <MessageContent content={parentMessage} />
        <ChildReplies content={parentMessage} />
        <Input
          handleSend={onReplySend}
          index={index}
          threadId={parentMessage.id}
        />
      </div>
    );
  };
  let classNames = `App ${showThreadPanel ? 'threadView' : ''}`;

  return (
    <Container fluid className={classNames}>
      <SidePanel />
      <MainPanel />
      {showThreadPanel && <ThreadPanel />}
    </Container>
  );
}
