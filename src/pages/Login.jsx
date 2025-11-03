import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
    const { logInWithGoogle, logIn } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        logIn(email, password)
        .then(()=> {
            toast.success('Successfully Authenticate');
            navigate(`${location.state ? location.state : '/'}`);
        })
        .catch(err => {
            toast.error(err.message);
        })
    }

    const handleGoogleSubmit = () => {
        logInWithGoogle()
        .then(()=> {
            toast.success('Successfully Authenticate');
            navigate(`${location.state ? location.state : '/'}`);
        })
        .catch(err => {
            toast.error(err.message);
        })
    }

    return (
        <div className='w-11/12 mx-auto py-20'>
            <form onSubmit={handleSubmit} className='w-[400px] mx-auto py-5 px-7 rounded-xl bg-white shadow-xl'>
                <h1 className='text-3xl text-[#001931] font-semibold text-center'>Login</h1>
                <p className='mb-5 font-medium mt-2 text-[#001931] text-center'>Don't have an account? <Link className='text-[#632EE3]' to={'/register'}>Register Now</Link></p>
                <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" name='email' className="input w-full" placeholder="Email" />
                <label className="label">Password</label>
                <div className='relative'>
                    <input type={showPass ? 'text' : 'password'} name='password' className="input w-full" placeholder="Password" required/>
                    <span onClick={()=> setShowPass(!showPass)} className='absolute cursor-pointer top-[20%] right-[5%] z-10 p-1'>
                        {
                            showPass ? <FaEye /> : <FaEyeSlash />
                        }
                    </span>
                </div>
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] font-bold text-white mt-4">Login</button>
                <div className='flex items-center gap-2 py-3'>
                    <div className='border-t text-gray-300 flex-1'></div>
                    <p className='font-semibold'>OR</p>
                    <div className='border-t text-gray-300 flex-1'></div>
                </div>
                {/* Google */}
                <button onClick={handleGoogleSubmit} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
                </button>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;