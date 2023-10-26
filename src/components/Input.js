import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Input(props) {
  const [isDisabled, disableSend] = useState(true);
  const [message, updateMessage] = useState('');

  const validateMsg = (e) => {
    const msg = e.target.value;
    updateMessage(msg);
    if (!msg) {
      disableSend(true);
    }
    disableSend(false);
  };

  const getTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours > 12 ? hours - 12 : hours;
    const formattedMinutes = String(today.getMinutes()).padStart(2, '0');
    return `${hours12}:${formattedMinutes}${ampm}`;
  };

  function sendMsg(e) {
    e.preventDefault();

    const data = {
      id: props.index,
      time: getTime(),
      message: message,
    };

    props.handleSend(data, props.threadId);
    updateMessage('');
  }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="message">
        <Row>
          <Col className="col-md">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a message"
              onChange={(e) => {
                validateMsg(e);
              }}
              value={message}
              data-testid="textarea-element"
            />
          </Col>
          <Col md="auto">
            <Button
              type="submit"
              onClick={(e) => {
                sendMsg(e);
              }}
              disabled={isDisabled}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}
