import React,{useState,useEffect} from 'react'
import { Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function MyStock() {
const {id}=JSON.parse(localStorage.getItem('user'))
const [Data, setData] = useState([]);
useEffect(() => {
  axios.get(`/api1/star/findStarByUserId?user_id=${id}`).then(res=>{
    console.log(res.data);
    setData(res.data);
  })
}, [id])


  const columns = [
    {
      title: 'code',
      dataIndex: 'code',
      sorter: {
        compare: (a, b) => a.code - b.code,
      },
      render: (code) => {
        return <Link to={`/stock/detail/${code}`}>{code}</Link>
    }
    },
    {
      title: 'stockName',
      dataIndex: 'stockName',
    },
    {
      title: 'price',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
    },
    {
      title: 'fluctuation',
      dataIndex: 'fluctuation',
      sorter: {
        compare: (a, b) => a.fluctuation - b.fluctuation,
      },
      render:(fluctuation)=>{
        return <span style={{color:fluctuation<0?'green':'red'}}>{`${fluctuation}%`}</span>
      }
    },
  ];



  // function onChange(pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }
  return (
    <div>
      <Table columns={columns} dataSource={Data} rowKey={item => item.code}/>
    </div>
  )
}
