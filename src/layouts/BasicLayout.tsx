import React, { FC, ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { VscChromeClose, VscChromeMinimize } from 'react-icons/vsc'
import { ipcRenderer } from 'electron'

const GlobalStyle = createGlobalStyle`
    body {
        --global-bg-color: #252526;
        --global-font-color: rgb(204, 204, 204);
        --global-menu-bg-color: rgb(60, 60, 60);
        --global-menu-hover-danger-bg-color: rgba(232, 17, 35, .9);
        --global-menu-hover-normal-bg-color: hsla(0, 0%, 100%, .1); 
        margin: 0px;
    }
`

const TopMenu = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    color: var(--global-font-color);
    background-color: var(--global-menu-bg-color);
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
    transition: background .5s;
    &:hover {
        background: var(--global-menu-hover-normal-bg-color);
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
        background: var(--global-menu-hover-danger-bg-color);
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
                        ipcRenderer.invoke('window/minimize')
                    }}
                >
                    <VscChromeMinimize />
                </Icon>
                <CloseWindow
                    onClick={() => {
                        ipcRenderer.invoke('window/close')
                    }}
                >
                    <VscChromeClose />
                </CloseWindow>
            </TopMenu>
            <Content>
                {children}
            </Content>
        </Layout>

    )
}

export default BasicLayout