import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  ShoppingOutlined,
  MessageOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import PetRecords from './pages/PetRecords';
import Shop from './pages/Shop';
import Consultation from './pages/Consultation';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: '我的档案',
    },
    {
      key: 'logout',
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: 'doctors',
      icon: <UserOutlined />,
      label: '医生团队',
    },
    {
      key: 'appointment',
      icon: <CalendarOutlined />,
      label: '在线挂号',
    },
    {
      key: 'pet-records',
      icon: <UserOutlined />,
      label: '宠物病历',
    },
    {
      key: 'consultation',
      icon: <MessageOutlined />,
      label: '在线咨询',
    },
    {
      key: 'shop',
      icon: <ShoppingOutlined />,
      label: '药品商城',
    },
  ];

  const handleMenuClick = (key) => {
    window.location.pathname = `/${key}`;
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="app-header">
          <div className="logo">🐾 宠物医院</div>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={(e) => handleMenuClick(e.key)}
            items={menuItems}
            className="app-menu"
          />
          <div className="user-section">
            {isLoggedIn ? (
              <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                <Button type="primary">
                  <UserOutlined /> {user?.name}
                </Button>
              </Dropdown>
            ) : (
              <>
                <Button type="primary" onClick={() => (window.location.pathname = '/login')}>
                  <LoginOutlined /> 登录
                </Button>
                <Button onClick={() => (window.location.pathname = '/register')}>
                  注册
                </Button>
              </>
            )}
          </div>
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/pet-records" element={<PetRecords />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Content>
        <Footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>联系我们</h3>
              <p>电话: 400-888-8888</p>
              <p>邮箱: info@pethospital.com</p>
            </div>
            <div className="footer-section">
              <h3>营业时间</h3>
              <p>周一至周日: 08:00 - 20:00</p>
              <p>急诊: 24小时</p>
            </div>
            <div className="footer-section">
              <h3>地址</h3>
              <p>北京市朝阳区某某街道123号</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 宠物医院. 版权所有.</p>
          </div>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
