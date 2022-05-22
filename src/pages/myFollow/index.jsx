import React,{useState,useEffect} from 'react'
import { Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function MyFollow() {
const {id}=JSON.parse(localStorage.getItem('user'))
const [Data, setData] = useState([]);
useEffect(() => {
  axios.get(`/api1/follow/findFollowByUserId?id=${id}`).then(res=>{
    console.log(res.data);
    setData(res.data);
  })
}, [id])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'expert_name',
      render: (expert_name, item) => {
        return <Link to={`/stock/idol/${item.expert_id}`}>{expert_name}</Link>
    }
    },
    {
      title: 'total_profit_ratio',
      dataIndex: 'total_profit',
      sorter: {
        compare: (a, b) => a.total_profit.split('%')[0] - b.total_profit.split('%')[0],
        
      },
      render:(num)=>{
        return <span style={{color:num<0?'green':'red'}}>{num}</span>
      }
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
      dataIndex: 'follower',
      sorter: {
        compare: (a, b) => a.follower - b.follower,
       
      },
    },
    {
      title: 'success_rate',
      dataIndex: 'success_rate',
      sorter: {
        compare: (a, b) => a.success_rate.split('%')[0] - b.success_rate.split('%')[0],
        
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={Data} rowKey={item => item.expert_id}/>
    </div>
  )
}
