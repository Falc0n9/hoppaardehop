import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute(authenticated) {
    // const authenticated = true; // determine if authorized, from context or however you're doing it
    // authenticated = false;
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    console.log(authenticated)
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
} 