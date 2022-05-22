import React, { useState, useEffect, useRef } from 'react'
import { PageHeader, Descriptions, message, Timeline} from 'antd';
import { useLocation } from 'react-router-dom';
import * as echarts from 'echarts';
import { Link } from 'react-router-dom';
import './index.module.css'
import axios from 'axios';
export default function IdolDetail() {
  const { id } = JSON.parse(localStorage.getItem('user'));
  const hotRef = useRef(null)
  const [idolInfo, setidolInfo] = useState([])
  const [dealInfo, setDealInfo] = useState([])
  const [Like, setLike] = useState(null)
  const location = useLocation()
  const expertId = location.pathname.slice(12)
  useEffect(() => {
    axios.get(`/api1/expert/findById?id=${expertId}`).then(res => {
      setidolInfo(res.data)
    })
  }, [expertId])

  useEffect(() => {
    axios.get(`/api1/follow/checkState?user_id=${id}&expert_id=${expertId}`).then(res => {
      setLike(res.data.code)
    })
  }, [id, expertId])

  const handleToLike = () => {
    setLike(1)
    axios.get(`/api1/follow/followById?user_id=${id}&expert_id=${expertId}`).then(res => {
      message.success(`关注成功`);
    })
  }
  const handleToUnlike = () => {
    setLike(0)
    axios.get(`/api1/follow/deleteById?user_id=${id}&expert_id=${expertId}`).then(res => {
      message.success(`取关成功`);
    })
  }


  useEffect(() => {
    axios.get(`/api1/expert/getDeals?id=${expertId}`).then(res => {
      if(res.data.length!==0){
        renderHotView(res.data)
        setDealInfo(res.data)
      }else{
        return;
      }
        
    })
    return () => {
      window.onresize = null
    }
  }, [expertId])

  const renderHotView = (infoData) => {
    const dateArr = infoData[0].trade_time.split('-')
    const firstYear = dateArr[0]
    var map = new Map();
    for (let i = 0; i < infoData.length; i++) {
      if (map.has(infoData[i].trade_time)) {
        let value = map.get(infoData[i].trade_time) + 1
        map.set(infoData[i].trade_time, value)
      } else {
        map.set(infoData[i].trade_time, 1);
      }
    }
    let arr = [];
    for (let value of map.values()) {
      arr.push(value);
    }
    let maxNum = Math.max(...arr)
    function getVirtulData(year) {
      year = year || '2022';
      var data = [];

      for (let item of map.entries()) {
        data.push([
          item[0],
          item[1]
        ])
      }

      return data;
    }
    var myChart = echarts.init(hotRef.current);
    // 指定图表的配置项和数据
    var option = {
      title: {
        top: 50,
        left: 'center',
        text: `${infoData.length} deals in ${firstYear}`
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: maxNum,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65,
        show: false
        // hoverLink:false
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: [firstYear],
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtulData(firstYear)
      }
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = () => {
      myChart.resize()
    }
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
              <span className='iconfont' style={{ fontSize: '20px', paddingLeft: '10px', cursor: 'pointer', display: Like === 0 ? '' : 'none' }} onClick={() => handleToLike()}>&#xe603;</span>
              <span className='iconfont' style={{ fontSize: '20px', paddingLeft: '10px', cursor: 'pointer', color: 'pink', display: Like === 1 ? '' : 'none' }} onClick={() => handleToUnlike()}>&#xe614;</span>
            </div>}
            avatar={{ src: idolInfo.expertAvatar }}
          >
        
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="段位"><span>{idolInfo.level&&idolInfo.level[0]==='初'?'0段':idolInfo.level}</span></Descriptions.Item>
              <Descriptions.Item label="仓位">{idolInfo.stockPercent}</Descriptions.Item>
              <Descriptions.Item label="选股成功率">{idolInfo.successRate}</Descriptions.Item>
              <Descriptions.Item label="总利润率"><span style={{color:idolInfo.totalProfit&&idolInfo.totalProfit[0]==='-'?'green':'red'}}>{idolInfo.totalProfit}</span></Descriptions.Item>
              <Descriptions.Item label="总资产"><span>{idolInfo.totalAsset}元</span></Descriptions.Item>
              <Descriptions.Item label="粉丝数"><span>{idolInfo.follower}</span></Descriptions.Item>
              <Descriptions.Item label="月利润率"><span style={{color:idolInfo.monthProfit&&idolInfo.monthProfit[0]==='-'?'green':'red'}}>{idolInfo.monthProfit}</span></Descriptions.Item>
              <Descriptions.Item label="周利润率"><span style={{color:idolInfo.weekProfit&&idolInfo.weekProfit[0]==='-'?'green':'red'}}>{idolInfo.weekProfit}</span></Descriptions.Item>
              <Descriptions.Item label="日利润率"><span style={{color:idolInfo.dayProfit&&idolInfo.dayProfit[0]==='-'?'green':'red'}}>{idolInfo.dayProfit}</span></Descriptions.Item>

            </Descriptions>
          </PageHeader>

        </div>
      }
      <div ref={hotRef} style={{ height: '400px', marginTop: '30px', width: '100%'}}></div>
      <div style={{ marginLeft: '-100px', marginTop: '-50px'}}>
        <Timeline mode='left' >
          {
            dealInfo.map((item, index) => {
              return <Timeline.Item key={index} color={item.method === '买入' ? 'green' : 'red'} label={item.trade_time}>
                {item.method}
                {<Link to={`/stock/detail/${item.code}`}>{item.stock_name}</Link>}
                {`${item.amount}股`}
              </Timeline.Item>
            })
          }
        </Timeline>
      </div>
    </div>
  )
}
