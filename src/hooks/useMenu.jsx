// import React, { useEffect, useState } from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {

    const axiosPublic = useAxiosPublic();

    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     fetch(`${import.meta.env.VITE_API_URL}/menu`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setMenu(data);
    //         setLoading(false)

    //     })
    // },[])

    // data fetching useing tagstack query

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })

    return [menu, loading, refetch]
};

export default useMenu;