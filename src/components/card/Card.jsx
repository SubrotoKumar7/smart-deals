import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router';

const Card = ({product}) => {
    const {_id, title, status, usage, price_min, price_max, image} = product;
    return (
        <div className="card bg-base-100 shadow-2xl">
            <figure>
                <img
                src={image}
                alt="products images" />
            </figure>
            <div className="card-body">
                <span className='btn btn-xs rounded-full w-fit bg-purple-200 text-purple-500'>{status}</span>
                <h2 className="card-title">{title} [{usage}]</h2>
                <p className='flex items-center font-semibold text-purple-500'><FaDollarSign /> {price_min}-{price_max}</p>
                <div className="card-actions justify-end">
                <Link to={`/product-details/${_id}`} className="btn btn-outline w-full">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;