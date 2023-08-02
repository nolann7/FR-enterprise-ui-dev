import { screen, render } from 'test/utilities';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const initialCount = 10;
  render(<Counter initialCount={initialCount} />);

  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent(String(initialCount));
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const initialCount = 10;
  const { user } = render(<Counter initialCount={initialCount} />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  const resetButton = screen.getByRole('button', { name: /reset/i });

  await user.click(incrementButton);
  let newCount = initialCount + 1;
  expect(currentCount).toHaveTextContent(String(newCount));
  await user.click(incrementButton);
  newCount = initialCount + 2;
  expect(currentCount).toHaveTextContent(String(newCount));

  await user.click(resetButton);
  expect(currentCount).toHaveTextContent('0');
});
