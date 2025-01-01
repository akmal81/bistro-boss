import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const SignUp = () => {

    // const captchaRef = useRef(null);
    // const [disable, setDisable] = useState(true);
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated');

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Account created successfully!!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/')

                    })
                    .catch(error => console.log(error))
            })
    }





    return (
        <>
            <Helmet>
                <title>Sign Up || Bistro Boss</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sing now!</h1>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">


                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered" required />
                                {errors.name && <span className='text-red-600'>This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo url</span>
                                </label>
                                <input type="url" {...register("photo", { required: true })} name='photo' placeholder="name" className="input input-bordered" required />
                                {errors.photo && <span className='text-red-600'>This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" required />
                                {errors.email && <span className='text-red-600'>This field is required</span>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 4,
                                        maxLength: 20,
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                    })}
                                    name='password' placeholder="password" className="input input-bordered" required />
                                {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must have one uppercase one loawercase one number and one special charaters</span>}
                            </div>


                            <div className="form-control mt-6">
                                <input type='submit' className="btn btn-primary" value='Sing Up' />
                            </div>
                        </form>


                        <p className='text-center pb-6'><small>already have an account?</small><Link to='/login'> Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;