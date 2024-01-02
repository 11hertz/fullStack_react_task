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
  const [searchParams, setSearchParmas] = useSearchParams({ searchStr: '' });

  const searchStr = searchParams.get('searchStr') || '';

  useEffect(() => {
    setSelectedItem(cart[0]);
  }, [cart]);

  return (
    <div className='CartLayoutWrap'>
      <div className='CartLayout'>
        Search :{' '}
        <input
          type='text'
          value={searchParams.get('searchStr') || ''}
          onChange={(e) =>
            setSearchParmas({ searchStr: e.currentTarget.value })
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
                {item.id}{' '}
                <button onClick={() => setSelectedItem(item)}>
                  {item.name}
                </button>{' '}
                {item.price.toLocaleString()}
                <button onClick={() => removeCartItem(item.id)}>X</button>
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
