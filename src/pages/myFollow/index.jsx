import React,{useState,useEffect} from 'react'
import { Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function MyFollow() {
const {id}=JSON.parse(localStorage.getItem('user'))
const [Data, setData] = useState([]);
useEffect(() => {
  axios.get(`/follow/findFollowByUserId?id=${id}`).then(res=>{
    setData(res.data);
  })
}, [id])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'expert_name',
      render: (expert_name, item) => {
        console.log(item);
        return <Link to={`/stock/idol/${item.expert_id}`}>{expert_name}</Link>
    }
    },
    {
      title: 'total_profit_ratio',
      dataIndex: 'total_profit_ratio',
      sorter: {
        compare: (a, b) => a.total_profit_ratio - b.total_profit_ratio,
        
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
      dataIndex: 'follower_num',
      sorter: {
        compare: (a, b) => a.follower_num - b.follower_num,
       
      },
    },
    {
      title: 'success_rate',
      dataIndex: 'success_rate',
      sorter: {
        compare: (a, b) => a.success_rate - b.success_rate,
        
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={Data} rowKey={item => item.expert_id}/>
    </div>
  )
}
