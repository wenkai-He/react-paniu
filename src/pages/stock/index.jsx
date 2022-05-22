import React from 'react'
import { Layout } from 'antd';
import SideMenu from '@/components/newssandbox/SideMenu'
import TopHeader from '@/components/newssandbox/TopHeader'
import { Route, Routes } from 'react-router-dom'
import IdolHome from '../idolhome'
import Bag from '../Bag';
import MyFollow from '../myFollow';
import MyStock from '../myStock';
import IdolDetail from '../idolDetail';
import StockDetail from '../StockDetail';
import StockHome from '../stockhome';
import './index.css'
const { Content } = Layout;
export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >

          <Routes>
            <Route path='/stock/idolhome' element={<IdolHome />} />
            <Route path='/stock/stockhome' element={<StockHome />} />
            <Route path='/stock/idol/:id' element={<IdolDetail />} />
            <Route path='/stock/detail/:id' element={<StockDetail />} />
            <Route path='/stock/myfollow' element={<MyFollow />} />
            <Route path='/stock/mystock' element={<MyStock />} />
            <Route path='/stock/bag' element={<Bag />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
