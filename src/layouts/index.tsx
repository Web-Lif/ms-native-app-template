import React, { Suspense } from 'react'

import '@weblif/fast-ui/es/app'

const BasicLayout = React.lazy(() => import('./BasicLayout'))

type LayoutProps = {
    children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Suspense fallback={<div />}>
            <BasicLayout>
                {children}
            </BasicLayout>
        </Suspense>
    )
}

export default Layout