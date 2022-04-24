import React, { FC, ReactNode } from 'react'

interface BasicLayoutProps {
    children: ReactNode
}

const BasicLayout: FC<BasicLayoutProps> = ({
    children
}) => {
    return (
        <>
            {children}
        </>
    )
}


export default BasicLayout