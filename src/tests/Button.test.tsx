import Button from '@/components/Button';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

describe('Button component', () => {
  it('renders button with label', async () => {
    render(<Button label="Test Button" />);
    await waitFor(() => expect(screen.getByTestId('button')).toHaveTextContent('Test Button'));
  });

  it('renders Loading text', async () => {
    render(<Button label="Test Button" loading />);
    await waitFor(() => expect(screen.getByTestId('button')).toHaveTextContent('loading...'));
  });

  it('disables button when loading', async () => {
    render(<Button label="Test Button" loading />);
    await waitFor(() => expect(screen.getByTestId('button')).toBeDisabled());
  });

  it('calls onClick event when button is clicked', async () => {
    const onClick = vitest.fn();
    render(<Button label="Test Button" onClick={onClick} />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
  });
});