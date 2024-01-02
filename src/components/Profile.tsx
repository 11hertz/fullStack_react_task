import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect } from 'react';

const Profile = () => {
  const {
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) navigate('/login');
  }, [loginUser, navigate]);

  const { logout } = useSession();

  return (
    <>
      {loginUser ? (
        <>
          <h2>{loginUser.id} 님 환영합니다.</h2>
          <button onClick={logout}>LOGOUT</button>
        </>
      ) : (
        <h2>Profile</h2>
      )}
    </>
  );
};

export default Profile;
