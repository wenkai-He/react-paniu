import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import style from './index.module.css'
import axios from 'axios';
export default function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // const { username, password } = values
    console.log(JSON.stringify(values));
    axios.post(`/user/login`,values).then(res=>{
      console.log(res);
    })
  };

  return (
    <div style={{ background: 'rgb(35,39,65)', height: "100vh" }}>
      <div className={style['formContainer']}>
        <div className={style['title']}>爬牛<span className='iconfont' style={{ fontSize: '28px', padding: '10px' }}>&#xe642;</span></div>
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
          <Form.Item >
            <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
