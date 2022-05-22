import React,{useState,useEffect} from 'react'
import { Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function IdolHome() {
const [Data, setData] = useState([]);
useEffect(() => {
  axios.get(`/api1/expert/findAllExpert`).then(res=>{
    setData(res.data);
  })
},[])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'expertName',
      render: (expertName, item) => {
        return <Link to={`/stock/idol/${item.expertId}`}>{expertName}</Link>
    }
    },
    {
      title: 'totalProfitRatio',
      dataIndex: 'totalProfit',
      sorter: {
        compare: (a, b) => a.totalProfit.split('%')[0] - b.totalProfit.split('%')[0],
      },
      render:(num)=>{
        return <span style={{color:num[0]==='-'?'green':'red'}}>{num}</span>
      }
    },
    {
      title: 'level',
      dataIndex: 'level',
      sorter: {
        compare: (a, b) => {
          if(a.level[0]==='初'){
            a.level='0段'
          }
          if(b.level[0]==='初'){
            b.level='0段'
          }
          return a.level[0] - b.level[0]
        },
      },
      render:(level)=>{
        return <span>{level[0]==='初'?'0段':level}</span>
      }
    },
    {
      title: 'follower',
      dataIndex: 'follower',
      sorter: {
        compare: (a, b) => a.follower - b.follower,
       
      },
    },
    {
      title: 'successRate',
      dataIndex: 'successRate',
      sorter: {
        compare: (a, b) => a.successRate.split('%')[0] - b.successRate.split('%')[0],
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={Data} rowKey={item => item.expertId}/>
    </div>
  )
}
