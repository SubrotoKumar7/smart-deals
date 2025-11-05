import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';

const Details = () => {
    const {title, price_min, price_max, email, category, created_at, image, status, location, seller_image, seller_name, condition, usage, description, seller_contact, _id} = useLoaderData();
    return (
        <div className='w-11/12 mx-auto py-20'>
            <div className='flex gap-10'>
                <div className='flex-1'>
                    <img className='md:w-[600px] md:h-[500px] mb-10' src={image} alt={title} />
                    <div className='bg-white p-5'>
                        <h1 className='font-bold text-xl'>Products Description</h1>
                        <div className='flex items-center mt-3 justify-between'>
                            <p><span className='text-purple-400 font-semibold'>Condition:</span> {condition}</p>
                            <p><span className='text-purple-400 font-semibold'>Usage Time:</span> {usage}</p>
                        </div>
                        <div className="divider"></div>
                        <div className='space-y-5 w-full'>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <div className='flex-1 space-y-7'>
                    <Link className='flex items-center gap-2' to='/all-products'><FaArrowLeft></FaArrowLeft> Back to products</Link>
                    <h1 className='text-5xl font-bold'>{title}</h1>
                    <div className="badge badge-soft badge-secondary">{category}</div>
                    <div className='p-5 bg-white shadow-2xl'>
                        <p className='text-green-500 font-bold text-xl'>${price_min}-{price_max}</p>
                        <p>Price starts from</p>
                    </div>
                    <div className='p-5 bg-white shadow-2xl'>
                        <h2 className='text-xl font-semibold'>Products Details</h2>
                        <p><span className='font-semibold'>Products ID: </span> {_id}</p>
                        <p><span className='font-semibold'>Posted: </span> {created_at}</p>
                    </div>
                    <div className='p-5 bg-white shadow-2xl'>
                        <h2 className='text-xl font-semibold'>Seller Information</h2>
                        <div className='flex gap-5 items-center py-2'>
                            <img className='w-15 h-15 rounded-full' src={seller_image} alt="seller images" />
                            <div>
                                <h3 className='font-medium'>{seller_name}</h3>
                                <p><small>{email}</small></p>
                            </div>
                        </div>
                        <p><span className='font-semibold'>Location: </span> {location}</p>
                        <p><span className='font-semibold'>Contact: </span> {seller_contact}</p>
                        <p>
                            <span className='font-semibold'>Status: </span>
                            <div className="badge badge-warning">{status}</div>
                        </p>
                    </div>
                    <div>
                        <button className='btn w-full bg-gradient text-white'>I Want Buy This Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;