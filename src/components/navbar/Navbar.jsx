import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {

    const {user, logOut} = useContext(AuthContext);

    const links = <>
    <li><NavLink to={'/'}>Home</NavLink></li>
    <li><NavLink to={'/all-products'}>All Products</NavLink></li>
    {
        user &&
        <>
        <li><NavLink to={'/my-products'}>My Products</NavLink></li>
        <li><NavLink to={'/my-bids'}>My Bids</NavLink></li>
        <li><NavLink to={'/create-products'}>Create Products</NavLink></li>
        </>
    }
    </>;

    const handleLogout = () => {
        logOut()
        .then(()=> {
            toast.success('Logout successful');
        })
        .catch(err => {
            toast.error(err.message);
        })
    }

    return (
        <div className='bg-base-100 shadow-sm'>
            <div className="w-11/12 mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                    </div>
                    <Link to={'/'} className="font-bold text-2xl">Smart Deals</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                        <div className='flex gap-2'>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2">
                                    <p className='text-center font-bold'>{user?.displayName}</p>
                                    <li>
                                    </li>
                                    <li>{user?.email}</li>
                                    <button onClick={handleLogout} className="btn bg-gradient text-white font-bold">Logout</button>
                                </ul>
                            </div>
                            <button onClick={handleLogout} className="btn bg-gradient text-white font-bold">Logout</button>
                        </div>
                        :
                        <Link to={'/login'} className="btn">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;