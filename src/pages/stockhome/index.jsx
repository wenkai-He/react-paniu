import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function StockHome() {
    const [Data, setData] = useState([]);
    const { Search } = Input;
    useEffect(() => {
        axios.get(`/api1/stock/getMostRiseStock`).then(res => {
            setData(res.data);
        })
    }, [])


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
            render: (price) => <span>{price === undefined || '' ? 0 : price}</span>
        },
        {
            title: 'fluctuation',
            dataIndex: 'fluctuation',
            sorter: {
                compare: (a, b) => a.fluctuation - b.fluctuation,
            },
            render: (fluctuation) => <span style={{color:fluctuation<0?'green':'red'}}>{fluctuation === undefined || '' ? '0%' : `${fluctuation}%`}</span>
        },
    ];
    const onSearch = (value) => {
        if (value === '') {
            axios.get(`/stock/getMostRiseStock`).then(res => {
                setData(res.data);
            })
        }
        let chinese = new RegExp("[\u4E00-\u9FA5]+");
        let num = new RegExp("[0-9]+");
        if (chinese.test(value)) {
            axios.get(`/stock/findByName?name=${value}`).then(res => {
                setData(res.data)
            })
        } else if (num.test(value)) {
            axios.get(`/stock/findByCode?code=${value}`).then(res => {
                setData(res.data)
            })
        }
    }

    return (
        <div>
            <Search
                placeholder="输入股票代码或者股票名称"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={Data} rowKey={item => item.code} />
        </div>
    )
}
