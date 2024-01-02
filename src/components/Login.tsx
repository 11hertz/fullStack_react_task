import { FormEvent, useEffect, useRef } from 'react';
import { useSession } from '../hooks/session-context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) navigate('/profile');
  }, [loginUser, navigate]);

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useSession();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idRef.current && passwordRef.current) {
      const id = idRef.current?.value;
      const password = passwordRef.current?.value;

      login({ id, password });
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <input type='text' placeholder='Input your ID' ref={idRef} />
        <input
          type='password'
          placeholder='Input your PASSWORD'
          ref={passwordRef}
        />
        <button type='submit'>LOGIN</button>
      </form>
    </>
  );
};

export default Login;
