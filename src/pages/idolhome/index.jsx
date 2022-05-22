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
    },
    {
      title: 'level',
      dataIndex: 'level',
      sorter: {
        compare: (a, b) => a.level - b.level,
        
      },
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
