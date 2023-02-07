import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import { login, logout, onUserStateChange } from '../api/firebase';
// import { useEffect } from 'react';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';

const NavBar = () => {
  const { user, login, logout } = useAuthContext();
  // const handleLogin = () => {
  // equivalent to .then(setUser) 양쪽에 user가 있으니까 생략해도 됨
  // login().then(setUser)
  // };

  // const handleLogout = () => {
  // logout().then(setUser);
  // };

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-purple-500 gap-1'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/carts'>Carts</Link>}
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login} />}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
};

export default NavBar;
