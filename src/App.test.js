import { render, screen } from '@testing-library/react';
import App from './App';

test('renders channels panel', () => {
  render(<App />);
  const channelsPanel = screen.getByText(/channels/i);
  expect(channelsPanel).toBeInTheDocument();
});
