import React from 'react';
import {  Navigate, } from 'react-router-dom';
import Cookies from 'js-cookie';



// Define the interface for PrivateRoute props
interface PrivateRouteProps {
    element: React.ReactNode;  // Use ReactNode here to support any valid JSX element
}

export const isAuthenticated = (): boolean => {
    
    const token = localStorage.getItem('jwt');
    
    return token !== undefined; // Check if the token exists
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    return isAuthenticated() ? <>{element}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
