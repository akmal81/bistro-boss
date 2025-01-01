import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(user)

    if(loading)
    {

        return <span className="loading loading-dots loading-lg"></span>
    }
    if(user){
        return children
    }

    return <Navigate 
    to='/login'
    state={{from:location}}
    replace={true}
    ></Navigate>
};

export default PrivateRoute;