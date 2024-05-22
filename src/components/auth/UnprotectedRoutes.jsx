import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const UnProtectedRoutes = ({ isAuthenticated, children }) => {

    if (isAuthenticated) {
        window.location.href = '/'
    }

    return <main>
        {children}
    </main>
}

export default UnProtectedRoutes