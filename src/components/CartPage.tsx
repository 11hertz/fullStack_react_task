import { FormEvent, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const Cart = () => {
  const { selectedItem: item, saveCartItem } = useOutletContext<{
    selectedItem: Cart;
    saveCartItem: (id: number, name: string, price: number) => void;
  }>();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameRef.current && priceRef.current) {
      saveCartItem(
        item.id || 0,
        nameRef.current?.value,
        +priceRef.current?.value
      );
    }
  };

  return (
    <div className='CartPage'>
      <h2>Cart</h2>
      {item?.id === 0 ? (
        <form onSubmit={save}>
          <input type='text' ref={nameRef} placeholder='Input name'></input>
          <input type='text' ref={priceRef} placeholder='Input price'></input>
          <button>SAVE</button>
        </form>
      ) : (
        <div>
          {item?.id}. {item?.name} (￦{item?.price.toLocaleString()})
        </div>
      )}
    </div>
  );
};

export default Cart;
