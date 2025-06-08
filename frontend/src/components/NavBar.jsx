import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const NavBar = () => {

    const { token, navigate } = useAppContext();

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />
            <button onClick={() => navigate(token ? '/admin' : '/admin/login')} className='flex items-center gap-2 bg-primary text-white text-sm cursor-pointer px-10 py-2.5 rounded-full'>
                {token ? 'Dashboard' : 'Login'}
                <img src={assets.arrow} alt="arrow" className='w-3' />
            </button>
        </div>
    )
}

export default NavBar