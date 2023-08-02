import { render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  const inputNewItem = screen.getByLabelText(/new item name/i);
  expect(inputNewItem);
});

it('has a "Add New Item" button that is disabled when the input is empty', async () => {
  render(<PackingList />);
  const newItemButton = screen.getByRole('button', { name: /Add New Item/i });
  const inputNewItem = screen.getByLabelText(/new item name/i);

  expect(inputNewItem).toHaveValue('');
  expect(newItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const inputNewItem = screen.getByLabelText(/new item name/i);
  const newItemButton = screen.getByRole('button', { name: /Add New Item/i });

  await user.type(inputNewItem, 'wow');

  expect(newItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const inputNewItem = screen.getByLabelText(/new item name/i);
  const newItemButton = screen.getByRole('button', { name: /Add New Item/i });

  await user.type(inputNewItem, 'wow');
  await user.click(newItemButton);
  // screen.debug();
  expect(screen.getByLabelText('wow')).not.toBeChecked();
});
