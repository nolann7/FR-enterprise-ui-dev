// @vitest-environment happy-dom

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  render(<Counter />);

  const curCount = screen.getByTestId('current-count');
  expect(curCount).toHaveTextContent(/0/);

  const incrButton = screen.getByRole('button', { name: /increment/i });
  await userEvent.click(incrButton);

  expect(curCount).toHaveTextContent(/1/);
});
