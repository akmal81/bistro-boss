import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaStar, FaUsers, FaUtensils } from 'react-icons/fa';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    console.log(user);

    // const isAdmin = true;

    return (
        <div className="flex">
            {/* side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu p-4 space-y-4'>
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to='/dashboard/adminHome'>
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addItems'>
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageItems'>
                                    <FaList />
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/bookings'>
                                    <FaBook />
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/users'>
                                    <FaUsers />
                                    All Users
                                </NavLink>
                            </li>


                        </>
                            :
                            <>

                                <li>
                                    <NavLink to='/dashboard/userHome'>
                                        <FaHome />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'>
                                        <FaUtensils />
                                        Cart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/history'>
                                        <FaCalendar />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/review'>
                                        <FaStar />
                                        Add a review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <FaList />
                                        Payment real history
                                    </NavLink>
                                </li>

                            </>
                    }


                    {/* Shared menu */}
                    <div className='divider'></div>

                    <li>
                        <NavLink to='/'>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Order/salad'>
                            <FaHome />
                            Manu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Order/contact'>
                            <FaEnvelope />
                            Contact
                        </NavLink>
                    </li>
                </ul>

            </div>
            {/* dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;