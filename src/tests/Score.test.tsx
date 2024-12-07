import { render, screen } from '@testing-library/react';
import Score from '@/components/Score';

describe('Score component', () => {
  it('renders correct number of full score bars', () => {
    render(<Score score={80} />);
    expect(screen.getAllByTestId('full')).toHaveLength(4);
  });

  it('renders correct number of empty score bars', () => {
    render(<Score score={80} />);
    expect(screen.getAllByTestId('empty')).toHaveLength(1);
  });

  it('renders correct number of score bars for perfect score', () => {
    render(<Score score={100} />);
    expect(screen.getAllByTestId('full')).toHaveLength(5);
    expect(screen.queryAllByTestId('empty')).toHaveLength(0);
  });

  it('renders correct number of score bars for zero score', () => {
    render(<Score score={0} />);
    expect(screen.queryAllByTestId('full')).toHaveLength(0);
    expect(screen.getAllByTestId('empty')).toHaveLength(5);
  });
});