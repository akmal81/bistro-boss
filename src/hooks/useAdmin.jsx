import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiodSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";


const useAdmin = () => {
    // const {user} = useAuth;
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending:isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;