import { useState, useEffect } from 'react';
import CustomButton from '../components/Button';
import { loginApi } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await loginApi(email, password);
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if(token&&user){
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <form className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4 md:max-w-[400px] w-full" onSubmit={handleLogin}>
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
            <input className="border-2 border-gray-300 rounded-xl p-2" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="border-2 border-gray-300 rounded-xl p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex flex-col justify-center w-full">
                <CustomButton type="submit">Login</CustomButton>
            </div>
        </form>
      </div>
  )
}

export default LoginPage;