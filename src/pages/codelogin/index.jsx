import React, { useState } from 'react'
import { Form, Input, Button, message, Row, Col } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import style from './index.module.css'
import axios from 'axios';
export default function CodeLogin() {
  const [time, settime] = useState(59)
  const [buttonStatus, setbuttonStatus] = useState(true)
  const navigate = useNavigate()
  const [phoneNum, setphoneNum] = useState(null)
  const getPhone = (item) => {
    if (item.target.value.length !== 11) {
      message.error('手机号格式错误')
    } else {
      setphoneNum(item.target.value)
    }
  }
  const getCode = () => {
    if(phoneNum===null){
        message.error('未输入手机号')
        return;
    }
    setbuttonStatus(false)
    axios.post(`/api1/user/login/getCode?phoneNum=${phoneNum}`).then(res => {
        message.success('验证码已发送')
    },err=>{
        message.error(err)
    })
    let times = time;
    let timer = setInterval(function () {
        if (times <= 1) {
            setbuttonStatus(true)
            settime(59)
            clearInterval(timer);
        } else {
            times -= 1;
            settime(times);
        }
    }, 1000);
}
  const onFinish = (values) => {
    axios.post(`/api1/user/login/verifyCode`, values).then(res => {
      if (res.data.code === 1) {
        localStorage.setItem('token', res.data.token)
      } else {
        message.error('验证码错误');
        throw new Error('验证码错误')
      }
    }, err => {
      message.error('This is an error message' + err);
    }).then(res => {
      axios.get(`/api1/user/getUserByPhoneNum?phoneNum=${phoneNum}`).then(res => {
        if (res.status === 200) {
          message.success(`登陆成功，${res.data.username}欢迎回来`);
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
            name="phoneNum"
            rules={[
              {
                required: true,
                message: 'Please input your phoneNum!',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="phoneNum" onBlur={getPhone} />
          </Form.Item>
          <Form.Item name="code" rules={[
            {
              required: true,
              message: 'Please input your code!',
            },
          ]}>
            <Row gutter={16}>
              <Col span={18}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="code"
                />
              </Col>
              <Col span={6}>
                <Button onClick={getCode} style={{ display: buttonStatus ? '' : 'none' }}><span>获取验证码</span></Button>
                <Button disabled style={{ display: buttonStatus ? 'none' : '' }}><span>{`${time}s后可重发`}</span></Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item >
            <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <div style={{ display: 'flex', justifyContent: "center" }}>
              <Button type="link" block style={{ marginTop: '10px' }} onClick={() => {
                navigate('/login')
              }}>
                账号登陆
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
