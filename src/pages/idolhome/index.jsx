import React,{useState,useEffect} from 'react'
import { Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function IdolHome() {
const [Data, setData] = useState([]);
useEffect(() => {
  axios.get(`/expert/findAllExpert`).then(res=>{
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
      dataIndex: 'totalProfitRatio',
      sorter: {
        compare: (a, b) => a.totalProfitRatio - b.totalProfitRatio,
       
      },
    },
    {
      title: 'level',
      dataIndex: 'level',
      sorter: {
        compare: (a, b) => a.math - b.math,
        
      },
    },
    {
      title: 'follower',
      dataIndex: 'followerNum',
      sorter: {
        compare: (a, b) => a.followerNum - b.followerNum,
       
      },
    },
    {
      title: 'successRate',
      dataIndex: 'successRate',
      sorter: {
        compare: (a, b) => a.successRate - b.successRate,
        
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={Data} rowKey={item => item.expertId}/>
    </div>
  )
}
