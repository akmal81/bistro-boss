import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {


    const [disable, setDisable] = useState(true);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    console.log('state in the location', from)

    // captcha regenerate
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        loginUser(email, password)
            .then(result => {
                Swal.fire({
                    title: "Custom animation with Animate.css",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                    `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                    `
                    }
                });
                navigate(from, { replace: true });

            }).catch(err => { })
    }

    const handleValidateCaptcha = (e) => {
        e.preventDefault();

        const user_captcha_value = e.target.value;

        if (validateCaptcha(user_captcha_value) == true) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>Login || Bistro Boss</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>

                                <input
                                    type="text"
                                    name='captcha'
                                    onBlur={handleValidateCaptcha}
                                    placeholder="Type the text above"
                                    className="input input-bordered"
                                    // required 
                                    />

                            </div>



                            <div className="form-control mt-6">
                                {/* TODO: apply disable for recaptcha */}
                                <input type='submit' className="btn btn-primary" value='Login' disabled={false} />
                            </div>
                        </form>
                        <SocialLogin/>
                        <p className='text-center pb-6'><small>New Here?</small><Link to='/signup'> Signup</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;