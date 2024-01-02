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
      if (nameRef.current.value === '' && priceRef.current.value === '') {
        alert('상품명과 금액을 정확히 입력하세요');
        return false;
      } else if (nameRef.current.value === '') {
        alert('상품명을 정확히 입력하세요');
        return false;
      } else if (priceRef.current.value === '') {
        alert('금액을 정확히 입력하세요');
        return false;
      }
      saveCartItem(
        item.id || 0,
        nameRef.current?.value,
        +priceRef.current?.value
      );
      nameRef.current.value = '';
      priceRef.current.value = '';
      nameRef.current.focus();
    }
  };

  return (
    <div className='CartPage'>
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
