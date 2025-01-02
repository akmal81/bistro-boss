import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaCalendar, FaHome, FaList, FaStar } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="flex">
            {/* side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu p-4 space-y-4'>
                    <li>
                        <NavLink to='/dashboard/userHome'>
                            <FaHome />
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'>
                            <RiShoppingCart2Line />
                            My cart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/reservation'>
                            <FaCalendar />
                            Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/review'>
                            <FaStar />
                            Add a review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/bookings'>
                            <FaList />
                            My Bookings
                        </NavLink>
                    </li>
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