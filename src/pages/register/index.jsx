import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import style from './index.module.css'
import axios from 'axios';

export default function Register() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post('/user/register',values).then(res=>{
      console.log(res);
    })
  };

  return (
    <div style={{ background: 'rgb(35,39,65)', height: "100vh" }}>
      <div className={style['formContainer']}>
        <div className={style['title']}>爬牛<span className='iconfont' style={{fontSize:'28px',padding:'10px'}}>&#xe642;</span></div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="phoneNum"
            rules={[
              {
                required: true,
                message: 'Please input your phoneNum!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="phoneNum"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your e-mail!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="avatar"
            rules={[
              {
                required: true,
                message: 'Please input your avatar!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="avatar"
            />
          </Form.Item>
          <Form.Item >
            <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
