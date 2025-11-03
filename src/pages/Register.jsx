import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const { logInWithGoogle, createUser, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const image = e.target.image.value;
        const password = e.target.password.value;

        const userInfo = {
            displayName: name,
            photoURL: image
        }

        // password validation
        if(password.length < 6){
            setError('Password must be at least 8 characters long');
            return;
        }

        if(!/[A-Z]/.test(password)){
            setError('Password must contain at least one uppercase letter (A-Z).');
            return;
        }

        if(!/[a-z]/.test(password)){
            setError('Password must contain at least one lowercase letter (a-z).');
            return;
        }

        if(!/\d/.test(password)){
            setError('Password must contain at least one digit (0-9).');
            return;
        }

        if(!/[@$!%*?&]/.test(password)){
            setError('Password must contain at least one special character (e.g., !, @, #, $, %, ^, &, *).');
            return;
        }

        createUser(email, password)
        .then(()=> {
            updateUser(userInfo)
            .then(()=> {
                setError('');
                navigate('/');
                toast.success('Successfully Authenticate');
                e.target.reset();
            })
            .catch(err => {
                toast.error(err.message);    
            })
        })
        .catch(err => {
            toast.error(err.message);
        })
    }

    const handleGoogleSubmit = (e) => {
        e.preventDefault();

        logInWithGoogle()
        .then(()=> {
            toast.success('Successfully Authenticate');
        })
        .catch(err => {
            toast.error(err.message);
        })
    }

    return (
        <div className='w-11/12 mx-auto py-20'>
            <form onSubmit={handleSubmit} className='w-[400px] mx-auto py-5 px-7 rounded-xl bg-white text-center'>
                <h1 className='text-3xl text-[#001931] font-semibold text-center'>Register Now!</h1>
                <p className='mb-5 font-medium mt-2 text-[#001931]'>Already have an account? <Link className='text-[#632EE3]' to={'/login'}>Login Now</Link></p>
                <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" name='name' className="input w-full" placeholder="Enter name" required />
                <label className="label">Email</label>
                <input type="email" name='email' className="input w-full" placeholder="Email" required />
                <label className="label">Image-URL</label>
                <input type="text" name='image' className="input w-full" placeholder="Image url" required />
                <label className="label">Password</label>
                <div className='relative'>
                    <input type={showPass ? 'text' : 'password'} name='password' className="input w-full" placeholder="Password" required/>
                    <span onClick={()=> setShowPass(!showPass)} className='absolute cursor-pointer top-[20%] right-[5%] z-10 p-1'>
                        {
                            showPass ? <FaEye /> : <FaEyeSlash />
                        }
                    </span>
                </div>
                <button className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] font-bold text-white mt-4">Register</button>
                {
                    error &&
                    <p className='text-center py-2 text-red-500'>{error}</p>
                }
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

export default Register;