import React, { useContext, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Details = () => {

    const modalRef = useRef();

    const { user } = useContext(AuthContext);

    const {title, price_min, price_max, email, category, created_at, image, status, location, seller_image, seller_name, condition, usage, description, seller_contact, _id} = useLoaderData();
    
    const handleModal = () => {
        modalRef.current.showModal();
    }

    const handleSubmitBid = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const image = e.target.image.value;
        const price = e.target.price.value;
        const contact = e.target.contact.value;


        const newBids = {
            product: _id,
            buyer_image: image,
            buyer_name: name,
            buyer_contact: contact,
            buyer_email: email,
            bid_price: price,
            status: 'pending'
        }


        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBids)
        })
        .then(res=> res.json())
        .then(data => {
            e.target.reset();
            modalRef.current.close();
            console.log('after post bids', data);
        })

    }

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
                        <div>
                            <span className='font-semibold'>Status: </span>
                            <div className="badge badge-warning">{status}</div>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleModal} className='btn w-full bg-gradient text-white'>I Want Buy This Product</button>
                    </div>
                </div>
            </div>
            <div>
                <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Give Seller Your Offered Price!</h3>
                        <div className="modal-action">
                            <form method="dialog" onSubmit={handleSubmitBid}>
                                <fieldset className="fieldset">
                                    <div className='flex gap-3'>
                                        <div>
                                            <label className="label">Buyer Name</label>
                                            <input type="text" name='name' className="input" readOnly defaultValue={user?.displayName} />
                                        </div>
                                        <div>
                                            <label className="label">Buyer Email</label>
                                            <input type="email" name='email' className="input" readOnly defaultValue={user?.email} />
                                        </div>
                                    </div>
                                    <label className="label">Buyer Image URL</label>
                                    <input type="text" name='image' className="input w-full"  defaultValue={user?.photoURL} />
                                    <label className="label">Place your price</label>
                                    <input type="text" name='price' className="input w-full" placeholder="e.g. 1000" />
                                    <label className="label">Contact info</label>
                                    <input type="text" name='contact' className="input w-full" placeholder="Contact info" />
                                    <div className='flex items-center justify-end gap-3 mt-5'>
                                        <button onClick={()=> modalRef.current.close()} className="btn">Close</button>
                                        <button type='submit' className="btn bg-gradient text-white">Submit Bid</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Details;