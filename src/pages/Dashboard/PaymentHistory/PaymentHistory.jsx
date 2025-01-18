import { useQueries, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiodSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const PaymentHistory = () => {

    const {user }= useAuth();

    const axiosSecure = useAxiosSecure();
    
    console.log(user);


    const {data: payment=[]} = useQuery({
        querykey: ['/payments', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })

    return (
        <div>
           <h2 className="text-2xl">Total Payments: {payment.length}</h2>
        </div>
    );
};

export default PaymentHistory;