import React, { useState, useEffect,useRef } from 'react'
import { PageHeader, Descriptions,message } from 'antd';
import { useLocation } from 'react-router-dom';
import * as echarts from 'echarts';
import './index.module.css'
import moment from 'moment';
import axios from 'axios';
export default function StockDetail() {
  const KRef = useRef(null)
  const {id}=JSON.parse(localStorage.getItem('user'));
  const [stockInfo, setstockInfo] = useState(null)
  const [Like, setLike] = useState(null)
  const location = useLocation()
  const code = location.pathname.slice(14)
  const totalCode=code.slice(0,3)<400?'sz'+code:'sh'+code
  const date=new Date()
  const day=date.getDate()<10?`0${date.getDate()}`:date.getDate()
  const month=date.getMonth()<10?`0${date.getMonth()+1}`:date.getMonth()+1
  const year=date.getFullYear()
  const lastyear=year-1;
  const nowday=year+`${month}`+day
  const lastday=lastyear+`${month}`+day
  useEffect(() => {
    axios.get(`/api1/stock/findByCode?code=${code}`).then(res => {
      console.log(res.data);
     setstockInfo(res.data[0])
    })
  }, [code])
  useEffect(() => {
    axios.get(`/api1/star/checkState?user_id=${id}&stock_code=${code}`).then(res=>{
      setLike(res.data.code)
    })
  }, [id,code])
  const handlerInfo=(data)=>{
    const dataList=[];
    for(let i=0;i<data.length;i++){
      let date=moment(data[i].date).format("YYYY/MM/DD");
      let open=data[i].open;
      let close=data[i].close;
      let low=data[i].low;
      let high=data[i].high;
      const item=Array.of(date,open,close,low,high)
      dataList.push(item)
    }
    return dataList
  }
  useEffect(() => {
    axios.get(`/api2/findStockRange?code=${totalCode}&start=${lastday}&end=${nowday}`).then(res => {
        const dataList=handlerInfo(res.data)
        renderKView(dataList)
    })
    return () => {
      window.onresize = null
    }
  }, [totalCode,lastday,nowday])
  const handleToLike=()=>{
    setLike(1)
    axios.get(`/api1/star/starById?user_id=${id}&stock_code=${code}`).then(res=>{
      message.success(`关注成功`);
    })
  }
  const handleToUnlike=()=>{
    setLike(0)
    axios.get(`/api1/star/deleteById?user_id=${id}&stock_code=${code}`).then(res=>{
      message.success(`取关成功`);
    })
  }

  const renderKView = (infoData) => {
    const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';
const data0 = splitData(infoData);
function splitData(rawData) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values
  };
}
function calculateMA(dayCount) {
  var result = [];
  for (var i = 0, len = data0.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += +data0.values[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}
    var myChart = echarts.init(KRef.current);
    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: data0.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 50,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 50,
          end: 100
        }
      ],
      series: [
        {
          name: '日K',
          type: 'candlestick',
          data: data0.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor
          },
          markPoint: {
            label: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) + '' : '';
              }
            },
            data: [
              {
                name: 'Mark',
                coord: ['2013/5/31', 2300],
                value: 2300,
                itemStyle: {
                  color: 'rgb(41,60,85)'
                }
              },
              {
                name: 'highest value',
                type: 'max',
                valueDim: 'highest'
              },
              {
                name: 'lowest value',
                type: 'min',
                valueDim: 'lowest'
              },
              {
                name: 'average value on close',
                type: 'average',
                valueDim: 'close'
              }
            ],
            tooltip: {
              formatter: function (param) {
                return param.name + '<br>' + (param.data.coord || '');
              }
            }
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [
              [
                {
                  name: 'from lowest to highest',
                  type: 'min',
                  valueDim: 'lowest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                },
                {
                  type: 'max',
                  valueDim: 'highest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                }
              ],
              {
                name: 'min line on close',
                type: 'min',
                valueDim: 'close'
              },
              {
                name: 'max line on close',
                type: 'max',
                valueDim: 'close'
              }
            ]
          }
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: 'MA30',
          type: 'line',
          data: calculateMA(30),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        }
      ]
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
      <div ref={KRef} style={{ height: '300px', marginTop: '30px', width: '100%'}}></div>
    </div>
  )
}
