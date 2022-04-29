import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const BasicLayout = React.lazy(() => import('./BasicLayout'))

const Layout = () => {
    return (
        <Suspense fallback={<div />}>
            <BasicLayout>
                <Outlet />
            </BasicLayout>
        </Suspense>
    )
}

export default Layout