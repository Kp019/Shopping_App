
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { loginWithRedirect } = useAuth();

  return (
    <div className=' flex flex-col items-center gap-8 justify-center h-[100vh]'>
      <div className='text-4xl font-bold'>Click here to Login</div>
      <button className='py-2 px-4 bg-[#f3ecbb] rounded-md text-xl' onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
};

export default Login;
