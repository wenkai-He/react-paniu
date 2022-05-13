import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar, Modal, message, Upload, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, LoadingOutlined, PlusOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'md5';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Header } = Layout;
function TopHeader(props) {
  const { username, id, password, email, phoneNum,avatar } = JSON.parse(localStorage.getItem('user'))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const navigate = useNavigate()

  const formPassToDBPass = (pass, salt) => {
    let str = "" + salt.charAt(0) + salt.charAt(2) + pass + salt.charAt(5) + salt.charAt(4);
    return md5(str);
  }

  const onFinish = (values) => {
    let result = formPassToDBPass(values.OldPassword, '9d5b364d')
    if (result !== password) {
      message.error('旧密码错误');
      return
    } else if (values.OldPassword === values.password) {
      message.error('新密码旧密码不能相同');
      return
    }
    delete values.OldPassword
    axios.post(`/user/updateUser?username=${values.username}&phoneNum=${values.phoneNum}&email=${values.email}&password=${values.password}`).then(res => {
      message.success('信息修改成功，请重新登陆')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      navigate('/login')
    })
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showInfoModal = () => {
    setIsInfoModalVisible(true);
  };
 
  const handleInfoCancel = () => {
    setIsInfoModalVisible(false);
  };

  const changeCollapsed = () => {
    props.changeCollapsed()
  }


  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState(null)
  const beforeUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file)
    //控制上传图片格式
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('您只能上传JPG/PNG 文件!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于2MB!');
      return;
    }
    axios.post('/file/uploadAvatar',formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>{
      setimageUrl(res.data);
    })
    return false;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setloading(true);
      return;
    }
    if (info.file.status === 'done') {
      const formData = new FormData();
      formData.append('file', info.file.originFileObj)
      axios.post('/file/uploadAvatar',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        setimageUrl(res.data);
      })
    }
  };

  const onClick = ({ key }) => {
    if (key === 'tmp-1') {
      showInfoModal()
    }
    if (key === 'tmp-2') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      navigate('/login')
    }
  };
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: (<span>欢迎<span style={{ color: "#1890ff" }}>{username}</span>回来</span>),

        },
        {
          label: (<span style={{ color: "#1890ff" }}>修改个人信息</span>),
        },
        {
          danger: true,
          label: '退出登录',
        },
      ]}
    />
  );
  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      {
        props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }
      <div style={{ float: 'right' }}>
        <span><span style={{ color: "#1890ff" }}></span></span>
        <Dropdown overlay={menu} onClick={showModal}>
          <Avatar size="large" icon={<UserOutlined />} src={imageUrl?imageUrl:(avatar?avatar:`https://joeschmoe.io/api/v1/${id}`)} />
        </Dropdown>
        <Modal title="更换头像" visible={isModalVisible} closable={false} footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
          ]}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Modal>

        <Modal title="Basic Modal" visible={isInfoModalVisible} closable={false} footer={[
            <Button key="back" onClick={handleInfoCancel}>
              Return
            </Button>,
          ]}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              initialValue={username}
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" disabled />
            </Form.Item>
            <Form.Item
              name="OldPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your Old Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Old Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your NewPassword!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="New Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              name="phoneNum"
              initialValue={phoneNum}
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
              initialValue={email}
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
                确认
              </Button>
            </Form.Item>
          </Form>
        </Modal>


      </div>
    </Header>
  )
}

const mapStateProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed
  }
}
const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: 'change_collapsed',
    }
  }
}

export default connect(mapStateProps, mapDispatchToProps)(TopHeader)