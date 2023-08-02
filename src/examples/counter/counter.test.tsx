import { screen } from '@testing-library/react';
import { render } from './test/utilities';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const curCount = screen.getByTestId('current-count');
  expect(curCount).toHaveTextContent(/0/);

  const incrButton = screen.getByRole('button', { name: /increment/i });
  await user.click(incrButton);

  expect(curCount).toHaveTextContent(/1/);
});
