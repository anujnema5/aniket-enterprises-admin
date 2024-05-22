import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const protectedRoute = [
    '/'
]


const authRoutes = [
    'sign-in'
]


const ProtectedRoutes = ({ isAuthenticated, children }) => {
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return <main>
        {children}
    </main>
}

export default ProtectedRoutes