import { React, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { axios, setToken, navigate } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/admin/login', {
                email,
                password
            });

            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                toast.success(data.message);
                navigate('/admin');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-50'>
            <div className='w-full max-w-sm p-6 m-4 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white'>
                <div className='flex flex-col items-center justify-center gap-4 text-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-2xl font-bold mb-1'>
                            <span className='text-primary'>Admin</span> Login
                        </h1>
                        <p className='text-gray-600 text-sm'>
                            Enter your credentials to access the admin panel
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                        <div className='mb-4'>
                            <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>Email</label>
                            <input
                                type='email'
                                id='email'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label htmlFor='password' className='block text-gray-700 font-bold mb-2 mt-4'>Password</label>
                            <input
                                type='password'
                                id='password'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary/80 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login