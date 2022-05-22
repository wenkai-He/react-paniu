import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import style from './index.module.css'
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { password, ConfirmPassword } = values
    if (password !== ConfirmPassword) {
      message.error('两次密码不一样，请重试');
      return;
    }
    delete values.ConfirmPassword;
    axios.post('/api1/user/register', values).then(res => {
      if (res.data.code === 0) {
        message.error('用户名已存在');
      } else {
        navigate('/login');
        message.success(`登陆成功，请您登陆`);
      }
    }, err => {
      message.error('This is an error message:' + err);
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="ConfirmPassword"
            rules={[
              {
                required: true,
                message: 'Please confirm your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
              prefix={<PhoneOutlined className="site-form-item-icon" />}
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
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item >
            <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
            <Button type="link" block onClick={() => {
              navigate('/login')
            }}>
              已有账号？去登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
