
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';


const SocialLogin = () => {
const {googleSingIn} = useContext(AuthContext);
const axiosPublic = useAxiosPublic();
const navigate = useNavigate()

    const hangleGoogleLogin = ()=>{
        googleSingIn()
        .then(result=>{
           console.log(result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
            console.log(res.data);
            navigate('/')
        })
        })
    }
    return (
        <button onClick={hangleGoogleLogin} className="btn mx-8 mb-4 bg-black text-white">
          <FaGoogle/>  
 Login with google
</button>
    );
};

export default SocialLogin;