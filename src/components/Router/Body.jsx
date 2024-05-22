import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignIn from '../SignIn'
import Table from '../Table'
import ProtectedRoutes from '../auth/ProtectedRoutes'
import { useSelector } from 'react-redux'
import { getadmin } from '../../features/slices/adminSlice'
import UnprotectedRoutes from '../auth/UnprotectedRoutes'

const Body = () => {
    const auth = useSelector(getadmin);

    const isAuthenticated = () => {
        return auth?.admin && auth?.token ? true : false
    }

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element:
                <ProtectedRoutes isAuthenticated={isAuthenticated()}>
                    <Table />
                </ProtectedRoutes>
        },
        {
            path: '/sign-in',
            element:
                <UnprotectedRoutes isAuthenticated={isAuthenticated()}>
                    <SignIn />
                </UnprotectedRoutes>
        }
    ])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body
