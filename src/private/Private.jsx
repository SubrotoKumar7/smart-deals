import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/loader/Loader';

const Private = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loader></Loader>;
    }

    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>;
};

export default Private;