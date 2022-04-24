import React, { FC, ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { FiMinus, FiX } from 'react-icons/fi'
import { ipcRenderer } from 'electron'

const GlobalStyle = createGlobalStyle`
    body {
        background: #252526;
        color: #cccccc;
        margin: 0px;
    }
`

const TopMenu = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    color: rgb(204, 204, 204);
    background-color: rgb(60, 60, 60);
`

const TopMenuSpac = styled.div`
    flex: 1;
    -webkit-app-region: drag;
`

const Icon = styled.div`
    cursor: pointer;
    display: inline-flex;
    line-height: 30px;
    height: 100%;
    width: 46px;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    &:hover {
        background: hsla(0,0%,100%,.1);
    }
`

const Content = styled.div`
    flex: 1;
`

const Layout = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
`

const CloseWindow = styled(Icon)`
    &:hover {
        background: rgba(232,17,35,.9);
    }
`

interface BasicLayoutProps {
    children: ReactNode
}

const BasicLayout: FC<BasicLayoutProps> = ({
    children
}) => {
    return (
        <Layout>
            <GlobalStyle />
            <TopMenu>
                <TopMenuSpac />
                <Icon
                    onClick={() => {
                        ipcRenderer.send('window:minimize')
                    }}
                >
                    <FiMinus />
                </Icon>
                <CloseWindow
                    onClick={() => {
                        ipcRenderer.send('window:close')
                    }}
                >
                    <FiX />
                </CloseWindow>
            </TopMenu>
            <Content>
                {children}
            </Content>
        </Layout>

    )
}

export default BasicLayout