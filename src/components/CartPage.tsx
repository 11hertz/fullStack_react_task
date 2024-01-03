import { useEffect, useReducer, useRef } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';

const Cart = () => {
  const { selectedItem: item, saveCartItem } = useOutletContext<{
    selectedItem: Cart;
    saveCartItem: (id: number, name: string, price: number) => void;
  }>();

  const [, setSearchParams] = useSearchParams({
    searchStr: '',
    itemId: '',
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const [isEditing, toggleEditing] = useReducer((prev) => !prev, false);

  const saveOrEditing = () => {
    if (isEditing)
      if (nameRef.current && priceRef.current) {
        if (nameRef.current.value === '' && priceRef.current.value === '') {
          alert('상품명과 금액을 입력하세요');
          return false;
        } else if (nameRef.current.value === '') {
          alert('상품명을 입력하세요');
          return false;
        } else if (priceRef.current.value === '') {
          alert('금액을 입력하세요');
          return false;
        }
        const itemId = saveCartItem(
          item.id || 0,
          nameRef.current?.value,
          +priceRef.current?.value
        );
        setSearchParams({ itemId: String(itemId) });
        nameRef.current.value = '';
        priceRef.current.value = '';
        nameRef.current.focus();
      }
    toggleEditing();
  };

  useEffect(() => {
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = item.name;
      priceRef.current.value = String(item.price);
      nameRef.current.select();
    }
  }, [item, isEditing]);

  useEffect(() => {
    if (item?.id === 0) toggleEditing();
  }, [item?.id]);

  return (
    <div className='CartPage'>
      {isEditing ? (
        <form>
          <input type='text' ref={nameRef} placeholder='Input name'></input>
          <input type='text' ref={priceRef} placeholder='Input price'></input>
        </form>
      ) : (
        <div>
          {item?.id}. {item?.name} (￦{item?.price.toLocaleString()})
        </div>
      )}

      {isEditing && <button onClick={toggleEditing}>Cancel</button>}
      <button onClick={saveOrEditing}>{isEditing ? 'SAVE' : 'EDIT'}</button>
    </div>
  );
};

export default Cart;
