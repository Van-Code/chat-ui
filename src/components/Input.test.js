import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Input from './Input';

test('renders input field with placeholder value', () => {
  render(<Input />);
  const buttonElement = screen.getByPlaceholderText('Write a message');
  expect(buttonElement).toBeInTheDocument();
});

test('renders disabled send button', () => {
  render(<Input />);
  const buttonElement = screen.getByText(/send/i);
  expect(buttonElement).toHaveProperty('disabled');
});

test('entering message enables send button', () => {
  render(<Input />);
  const input = screen.getByTestId('textarea-element');
  const value = 'Hello, this is my first message';

  fireEvent.change(input, {
    target: { value: value },
  });
  const buttonElement = screen.getByText(/send/i);
  expect(buttonElement).toHaveProperty('disabled', false);
});
