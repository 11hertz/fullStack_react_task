import { Link } from 'react-router-dom';
import { useSession } from './hooks/session-context';

export const Nav = () => {
  const {
    session: { loginUser },
  } = useSession();
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>

        {loginUser ? (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        ) : (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}

        <li>
          <Link to='/cart'>Cart</Link>
        </li>
      </ul>
    </nav>
  );
};
