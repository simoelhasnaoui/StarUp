import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Starup Coffee heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /starup coffee/i })).toBeInTheDocument();
});
