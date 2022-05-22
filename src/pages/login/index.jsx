import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import style from './index.module.css'
import axios from 'axios';
export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    const { username } = values
    axios.post(`/api1/user/login`, values).then(res => {
      if (res.data.code === 1) {
        localStorage.setItem('token', res.data.token)
      } else {
        message.error('用户名或密码错误，请重试');
        throw new Error('用户名或密码错误')
      }
    }, err => {
      message.error('This is an error message' + err);
    }).then(res => {
      axios.get(`/api1/user/UserInfo?username=${username}`).then(res => {
        if (res.status === 200) {
          message.success(`登陆成功，${username}欢迎回来`);
          localStorage.setItem('user', JSON.stringify(res.data))
          navigate('/stock')
        } else {
          message.error('对不起，好像出了点错误')
        }
      })
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
          <Form.Item >
            <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <div style={{ display: 'flex', justifyContent: "center" }}>
              <Button type="link" block style={{ marginTop: '10px' }} onClick={() => {
                navigate('/codelogin')
              }}>
                短信登陆
              </Button>
              <Button type="link" block style={{ marginTop: '10px' }} onClick={() => {
                navigate('/forget')
              }}>
                忘记密码
              </Button>
            </div>
            <Button type="link" block onClick={() => {
              navigate('/register')
            }}>
              没有账号？去注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
