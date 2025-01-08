import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiodSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })


    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <div className='flex justify-evenly my-4 '>
                <h2 className='text-3xl'>All Users </h2>
                <h2 className='text-3xl'>Total  Users: {users.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Role</th>
                            <th>Delete user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) =>
                                <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <th>{user.name}</th>
                                    <td>{user.email}</td>
                                    <td>

                                        {
                                            user.role === 'admin' ? 'Admin' :
                                                <button
                                                    onClick={() => { handleMakeAdmin(user) }}
                                                    className="btn btn-ghost btn-xs bg-orange-400">
                                                    <FaUsers className="text-white text-xl" />
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => { handleDeleteUser(user) }}
                                            className="btn btn-ghost btn-xs">
                                            <FaTrash className="text-red-600 text-xl" />
                                        </button>
                                    </td>

                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;