import React from 'react';
import { Button, Row, Col, Card, Statistic } from 'antd';
import { PhoneOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>欢迎来到宠物医院</h1>
          <p>提供专业的宠物医疗和护理服务</p>
          <Button type="primary" size="large" onClick={() => navigate('/appointment')}>
            立即预约
          </Button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Statistic title="专业医生" value={28} prefix={<TeamOutlined />} />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic title="服务患者" value={10000} suffix="+" />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic title="手术成功率" value={99} suffix="%" />
          </Col>
        </Row>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2>我们的服务</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="service-card" hoverable>
              <div className="service-icon">🏥</div>
              <h3>综合检查</h3>
              <p>全面的健康检查和诊断</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="service-card" hoverable>
              <div className="service-icon">💊</div>
              <h3>药物治疗</h3>
              <p>专业的药物治疗方案</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="service-card" hoverable>
              <div className="service-icon">🔧</div>
              <h3>手术治疗</h3>
              <p>先进的外科手术技术</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="service-card" hoverable>
              <div className="service-icon">💆</div>
              <h3>护理服务</h3>
              <p>温柔细致的护理照顾</p>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div className="contact-item">
                <PhoneOutlined className="contact-icon" />
                <h3>紧急电话</h3>
                <p>400-888-8888</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="contact-item">
                <ClockCircleOutlined className="contact-icon" />
                <h3>营业时间</h3>
                <p>周一至周日 08:00-20:00</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <h3>医院地址</h3>
                <p>北京市朝阳区某某街道123号</p>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default Home;
