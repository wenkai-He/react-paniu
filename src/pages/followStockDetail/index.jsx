import React, { useState, useEffect } from 'react'
import { PageHeader, Descriptions,message } from 'antd';
import { useLocation } from 'react-router-dom';
import './index.module.css'
import axios from 'axios';
export default function StockDetail() {
  const {id}=JSON.parse(localStorage.getItem('user'));
  const [stockInfo, setstockInfo] = useState(null)
  const [Like, setLike] = useState(null)
  const location = useLocation()
  const code = location.pathname.slice(14)
  useEffect(() => {
    axios.get(`/stock/findByCode?code=${code}`).then(res => {
      console.log(res.data);
     setstockInfo(res.data[0])
    })
  }, [code])
  useEffect(() => {
    axios.get(`/star/checkState?user_id=${id}&stock_code=${code}`).then(res=>{
      setLike(res.data.code)
    })
  }, [id,code])
  const handleToLike=()=>{
    setLike(1)
    axios.get(`/star/starById?user_id=${id}&stock_code=${code}`).then(res=>{
      message.success(`关注成功`);
    })
  }
  const handleToUnlike=()=>{
    setLike(0)
    axios.get(`/star/deleteById?user_id=${id}&stock_code=${code}`).then(res=>{
      message.success(`取关成功`);
    })
  }
  return (
    <div >
      {
        stockInfo && <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={stockInfo.stockName}
            subTitle={<div>
              {stockInfo.code}
              <span className='iconfont' style={{fontSize:'20px',paddingLeft:'10px',cursor:'pointer',display:Like===0?'':'none'}} onClick={()=>handleToLike()}>&#xe603;</span>
              <span className='iconfont' style={{fontSize:'20px',paddingLeft:'10px',cursor:'pointer',color:'pink',display:Like===1?'':'none'}} onClick={()=>handleToUnlike()}>&#xe614;</span>
            </div>}
          >
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="price">{stockInfo.price===undefined?0:stockInfo.price}</Descriptions.Item>
              <Descriptions.Item label="fluctuation">{stockInfo.fluctuation===undefined?0:stockInfo.fluctuation}</Descriptions.Item>
            </Descriptions>
          </PageHeader>

        </div>
      }
    </div>
  )
}
