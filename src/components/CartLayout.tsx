import { Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const CartLayout = () => {
  const {
    session: { cart },
    saveCartItem,
    removeCartItem,
  } = useSession();

  const [selectedItem, setSelectedItem] = useState<Cart | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({ searchStr: '' });
  const [items, setItems] = useState<Cart[]>([]);

  const searchStr = searchParams.get('searchStr') || '';
  const itemId = searchParams.get('itemId') || '';

  useEffect(() => {
    const sortedItem = cart.sort((a, b) => a.id - b.id);
    if (searchStr) {
      setItems(sortedItem.filter((item) => item.name.includes(searchStr)));
    } else {
      setItems(sortedItem);
    }
  }, [cart, searchStr]);

  useEffect(() => {
    if (itemId) {
      setSelectedItem(cart.find((item) => item.id === Number(itemId)) || null);
    } else {
      setSelectedItem(items[0]);
    }
  }, [cart, items, itemId]);

  return (
    <div className='CartLayoutWrap'>
      <div className='CartLayout'>
        Search :
        <input
          type='text'
          value={searchParams.get('searchStr') || ''}
          onChange={(e) =>
            setSearchParams({ searchStr: e.currentTarget.value, itemId })
          }
        />
        <ul>
          {cart
            .filter((item) => item.name.includes(searchStr))
            .map((item) => (
              <li
                className={clsx('itemList', {
                  activeList: item.id === selectedItem?.id,
                })}
                key={item.id}
              >
                <small>{item.id}</small>
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setSearchParams({ searchStr, itemId: String(item.id) });
                  }}
                >
                  <strong>{item.name}</strong>
                </button>
                <small>{item.price.toLocaleString()}</small>
                <button
                  className='deleteItem '
                  onClick={() => removeCartItem(item.id)}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
        <button
          onClick={() => setSelectedItem({ id: 0, name: '', price: 1000 })}
        >
          + Add Item
        </button>
      </div>
      <Outlet context={{ selectedItem, saveCartItem }} />
    </div>
  );
};

export default CartLayout;
