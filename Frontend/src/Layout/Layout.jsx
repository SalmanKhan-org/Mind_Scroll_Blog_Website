import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import useGetUser from '@/hooks/useGetUser'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    useGetUser();
  return (
      <SidebarProvider>
          <Header/>
          <AppSidebar />
          <main >
              <div className='w-full min-h-[calc(100vh-40px)]'>
                  <Outlet />
              </div>
              <Footer/>
          </main>
      </SidebarProvider>
  )
}

export default Layout
