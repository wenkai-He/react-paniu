import React, { useState, useEffect } from 'react'
import { PageHeader, Descriptions,message } from 'antd';
import { useLocation } from 'react-router-dom';
import './index.module.css'
import axios from 'axios';
export default function IdolDetail() {
  const {id}=JSON.parse(localStorage.getItem('user'));
  const [idolInfo, setidolInfo] = useState([])
  const [Like, setLike] = useState(null)
  const location = useLocation()
  const expertId = location.pathname.slice(12)
  useEffect(() => {
    axios.get(`/expert/findById?id=${expertId}`).then(res => {
     setidolInfo(res.data)
    })
  }, [expertId])

  useEffect(() => {
    axios.get(`/follow/checkState?user_id=${id}&expert_id=${expertId}`).then(res=>{
      setLike(res.data.code)
    })
  }, [id,expertId])
  
  const handleToLike=()=>{
    setLike(1)
    axios.get(`/follow/followById?user_id=${id}&expert_id=${expertId}`).then(res=>{
      message.success(`关注成功`);
    })
  }
  const handleToUnlike=()=>{
    setLike(0)
    axios.get(`/follow/deleteById?user_id=${id}&expert_id=${expertId}`).then(res=>{
      message.success(`取关成功`);
    })
  }
  return (
    <div >
      {
        idolInfo && <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={idolInfo.expertName}
            subTitle={<div >
              {idolInfo.expertId}
              <span className='iconfont' style={{fontSize:'20px',paddingLeft:'10px',cursor:'pointer',display:Like===0?'':'none'}} onClick={()=>handleToLike()}>&#xe603;</span>
              <span className='iconfont' style={{fontSize:'20px',paddingLeft:'10px',cursor:'pointer',color:'pink',display:Like===1?'':'none'}} onClick={()=>handleToUnlike()}>&#xe614;</span>
            </div>}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="段位">{idolInfo.level}</Descriptions.Item>
              <Descriptions.Item label="仓位">{idolInfo.storage}</Descriptions.Item>
              <Descriptions.Item label="区域">{idolInfo.successRate}</Descriptions.Item>
              <Descriptions.Item label="粉丝数"><span style={{ color: 'green' }}>{idolInfo.followerNum}</span></Descriptions.Item>
              <Descriptions.Item label="总利润率"><span style={{ color: 'green' }}>{idolInfo.totalProfitRatio}</span></Descriptions.Item>
            </Descriptions>
          </PageHeader>

        </div>
      }
    </div>
  )
}
