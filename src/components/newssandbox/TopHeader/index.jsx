import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar, Modal,message,Upload } from 'antd';
import { UserOutlined,LoadingOutlined,PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
function TopHeader(props) {
  const { username, id } = JSON.parse(localStorage.getItem('user'))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate()
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const changeCollapsed = () => {
    props.changeCollapsed()
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState(null)
  const beforeUpload = (file) => {
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
    getBase64(file, (imageUrl) => {
      console.log(typeof (imageUrl));
      setloading(false);
      setimageUrl(imageUrl);
    });
    return false;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setloading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setloading(false);
        setimageUrl(imageUrl)
      }
      );
    }
  };
  const onClick = ({ key }) => {
    if (key === 'tmp-1') {
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
          key: 'mail',
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
          <Avatar size="large" icon={<UserOutlined />} src={imageUrl===null?`https://joeschmoe.io/api/v1/${id}`:imageUrl} />
        </Dropdown>
        <Modal title="更换头像" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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