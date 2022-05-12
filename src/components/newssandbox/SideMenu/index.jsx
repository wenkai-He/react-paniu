import React from 'react'
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
const { Sider } = Layout;
function SideMenu(props) {
  const itemList = [
    {
      key: '/stock/idolhome',
      icon: <PieChartOutlined />,
      label: "大牛广场"
    },
    {
      key: '/stock/stockhome',
      icon: <PieChartOutlined />,
      label: "股票广场"
    },
    {
      key: '/stock/mystock',
      icon: <UserOutlined />,
      label: "我的自选股",
    },
    {
      key: '/stock/myfollow',
      icon: <UserOutlined />,
      label: "我的关注",
    },
    {
      key: '/stock/bag',
      icon: <UserOutlined />,
      label: "智慧锦囊",
    },
  ]
  const navigate = useNavigate()
  const location = useLocation()
  const selectKey = [location.pathname]
  const openKey = ['/' + location.pathname.split('/')[1]]
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo">
          <span className='iconfont' style={props.isCollapsed?{fontSize: '33px'}:{ fontSize: '28px', paddingRight: '14px' }}>
            &#xe642;
          </span>
          <span style={props.isCollapsed?{display:'none'}:{}}>
            爬牛
          </span>
        </div>
        <div style={{ flex: 1, "overflow": 'auto' }}>
          <Menu theme="dark" mode="inline" items={itemList} selectedKeys={selectKey} defaultOpenKeys={openKey} onClick={(item) => {
            navigate(item.key)
          }}/>
        </div>
      </div>
    </Sider>
  )
}


const mapStateProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed
  }
}

export default connect(mapStateProps)(SideMenu)