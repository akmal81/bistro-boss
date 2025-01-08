import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Providers/AuthProviders';
import { Navigate } from 'react-router-dom';

const AminRoute = ({children}) => {

    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, loading } = useContext(AuthContext);


    if (loading|| isAdminLoading) {

        return <span className="loading loading-dots loading-lg"></span>
    }
    if (user && isAdmin) {
        return children
    }

    return <Navigate
        to='/login'
        state={{ from: location }}
        replace={true}
    ></Navigate>
};


export default AminRoute;