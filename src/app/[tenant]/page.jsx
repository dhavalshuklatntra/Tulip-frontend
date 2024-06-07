'use client'
import React from 'react'
// import SearchGif from "@/assets/Image/tenant/Search.gif";
import { Layout } from 'antd'

import SearchGif from '@/app/assets/Image/tenant/Search.gif'
import useTenant from './useTenant'
import MainPage from './MainPage'
import Image from '../_component/Image/Image'

const Tenantpage = () => {
  const [{ tenantDataLoading }, {}] = useTenant()

  return (
    <>
      {tenantDataLoading ? (
        <Layout>
          <Layout.Content>
            <Image alt="Searching" src={SearchGif} />
          </Layout.Content>
        </Layout>
      ) : (
        <>
          <MainPage />
        </>
      )}
    </>
  )
}

export default Tenantpage
