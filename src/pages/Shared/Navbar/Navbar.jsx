import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProviders';
import Swal from 'sweetalert2'

import { RiShoppingCart2Line } from "react-icons/ri";
import useCart from '../../../hooks/useCart';

const Navbar = () => {
    const [cart] = useCart()
    console.log(cart)

    const { user, logOutUser } = useContext(AuthContext);

    
    const handleLogOut = () => {
        logOutUser()
            .then(() => {


            })
            .catch(error => console.log(error))


    }

    const navOption = <>

        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Menu</Link></li>
        <li><Link to='/Order/salad'>Your Order</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
        <li><Link to='/secret'>secret</Link></li>
        <li><Link to='/dashboard/cart'>
            <button class="btn">
                <RiShoppingCart2Line className='text-2xl' />
                <div class="badge badge-secondary">{cart.length}</div>
            </button>
        </Link></li>

        {
            user ? <>
                {/* <span>{user&&user.displayName}</span> */}


                <button onClick={handleLogOut} className=" btn-ghost">SingOut</button>
            </>
                :
                <li><Link to='/login'>Login</Link></li>
        }
    </>

    return (
        <>
            <div className="navbar bg-base-100 fixed bg-black bg-opacity-30 text-white max-w-screen-xl z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navOption}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOption}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;