import { PropsWithChildren, createContext, useContext, useState } from 'react';

type SessionContextProp = {
  session: Session;
  login: ({ id, password }: LoginUser) => void;
  logout: () => void;
  saveCartItem: (id: number, name: string, price: number) => void;
  removeCartItem: (id: number) => void;
};

const DEFAULT_SESSION = {
  loginUser: null,
  cart: [
    {
      id: 100,
      name: '라면',
      price: 3000,
    },
    {
      id: 101,
      name: '파',
      price: 5000,
    },
    {
      id: 102,
      name: '계란',
      price: 6000,
    },
  ],
};

const SessionContext = createContext<SessionContextProp>({
  session: DEFAULT_SESSION,
  login: () => {},
  logout: () => {},
  saveCartItem: () => {},
  removeCartItem: () => {},
});

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(DEFAULT_SESSION);

  const login = ({ id, password }: LoginUser) => {
    setSession({ ...session, loginUser: { id, password } });
  };

  const logout = () => {
    setSession({ ...session, loginUser: null });
  };

  const saveCartItem = (id: number, name: string, price: number) => {
    const { cart } = session;
    const item = id && cart.find((item) => item.id === id);
    if (item) {
      item.name = name;
      item.price = price;
    } else {
      id = Math.max(...session.cart.map((cart) => cart.id), 0) + 1;
      cart.push({ id, name, price });
    }

    setSession({ ...session, cart });
    return id;
  };

  const removeCartItem = (itemId: number) => {
    const { cart } = session;
    setSession({ ...session, cart: cart.filter((item) => item.id !== itemId) });
  };

  return (
    <SessionContext.Provider
      value={{ session, login, logout, saveCartItem, removeCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
