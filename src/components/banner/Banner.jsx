import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router';


const Banner = () => {
    return (
        <div className='flex flex-col items-center justify-center py-20 text-center bg-linear-to-tl from-[#001931] via-[#E9E9E9] to-[##001931]'>
            <h1 className='text-7xl font-bold'>Deal your <span className='text-gradient'>Products</span> <br /> in a <span className='text-gradient'>Smart</span> way !</h1>
            <div className="join mt-15 mb-8">
                <input className="md:w-[360px] pl-6 input join-item rounded-l-full" placeholder="Search products..." />
                <button className="btn join-item rounded-r-full bg-gradient text-white"><FaSearch></FaSearch></button>
            </div>
            <div className='flex gap-3 items-center'>
                <Link to='/all-products' className='btn bg-gradient text-white'>Watch All Products</Link>
                <Link to='/create-products' className='btn btn-outline'>Post an Products</Link>
            </div>
        </div>
    );
};

export default Banner;