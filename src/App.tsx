import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import { Nav } from './Nav';
import { SessionContextProvider } from './hooks/session-context';
import CartLayout from './components/CartLayout';
import CartPage from './components/CartPage';

function App() {
  return (
    <SessionContextProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<CartLayout />}>
          <Route index element={<CartPage />} />
        </Route>
      </Routes>
    </SessionContextProvider>
  );
}

export default App;
