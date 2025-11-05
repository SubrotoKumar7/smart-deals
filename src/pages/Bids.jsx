import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Bids = () => {

    const { user } = useContext(AuthContext);

    const [bids, setBids] = useState([]);

    useEffect(()=> {
        if(user?.email){
            fetch(`http://localhost:3000/bids?email=${user?.email}`)
            .then(res=> res.json())
            .then(data=> {
                console.log('after ', data);
                setBids(data);
            })
        }
    }, [user?.email]);

    const handleRemoveBid = (_id) => {
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/bids/${_id}`, {
                method: "DELETE"
            })
            .then(res=> res.json())
            .then(data=> {
                console.log('after delete', data);
                if(data.deletedCount){
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your bids has been deleted.",
                    icon: "success"
                    });

                    const remainingBids = bids.filter(bid => bid._id !== _id);
                    setBids(remainingBids);
                }
            })

            
        }
        });
    }

    return (
        <div className='w-11/12 mx-auto py-20'>
            <h1 className='text-3xl font-bold'>My Bids {bids.length}</h1>
            <div className='mt-10'>
                <div className='mt-5'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <label>SL No</label>
                                </th>
                                <th>Buyer Name</th>
                                <th>Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    bids.map((bid, i) => 
                                        <tr key={i}>
                                            <th>
                                            <label>{i + 1}</label>
                                            </th>
                                            <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                    src={bid.buyer_image}
                                                    alt="buyer" />
                                                </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{bid.buyer_name}</div>
                                                </div>
                                            </div>
                                            </td>
                                            <td>{bid.buyer_email}</td>
                                            <td>{bid.bid_price}</td>
                                            <th>
                                            <button onClick={()=> handleRemoveBid(bid._id)} className="btn btn-outline btn-xs">Remove bids</button>
                                            </th>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Bids;