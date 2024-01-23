import React from 'react'
import SideMenu from './SideMenu'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainAppContainer = () => {
    return (
        <div className='flex flex-row justify-between'>
            <SideMenu />
            <div className='w-full flex flex-col'>
                <Header />
                {/*  */}
                <Outlet />
            </div>
        </div>
    )
}

export default MainAppContainer
