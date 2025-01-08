import Swal from "sweetalert2";
import SectionTiltle from "../../../components/SectionTitle/SectionTiltle";
import useAxiosSecure from "../../../hooks/useAxiodSecure";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";


const ManageItems = () => {

    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (item) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data)
                if (res.data.deletedCount) {
                    // 
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} deleted successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });

    }

    return (
        <div>
            <SectionTiltle heading="manage All Items" subHeading='Hurry up' />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Image </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, idx) =>
                                <tr key={item._id}>
                                    <td > {idx + 1} </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>$ {item.price}</td>
                                    <th><Link to={`/dashboard/updateItem/${item._id}`}  className="btn btn-ghost btn-xs">
                                        Update

                                    </Link></th>
                                    <th><button onClick={() => handleDelete(item)} className="btn btn-ghost btn-xs">Delete</button></th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;