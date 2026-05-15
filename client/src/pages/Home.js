import React, { useState, useEffect } from 'react';
import { Carousel, Button, Row, Col, Card, Statistic } from 'antd';
import { PhoneOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

function Home() {
  const navigate = useNavigate();
  const [heroScroll, setHeroScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const ratio = Math.min(1, scrollY / 320);
      setHeroScroll(ratio);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroIllustrationStyle = {
    opacity: 1 - heroScroll,
    top: `${-heroScroll * 12}px`,
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-particles">
          <span className="particle particle-1" />
          <span className="particle particle-2" />
          <span className="particle particle-3" />
          <span className="particle particle-4" />
        </div>
        <Carousel autoplay effect="fade" autoplaySpeed={5000} dotPosition="bottom" className="hero-carousel">
          <div className="hero-slide">
            <div className="hero-content">
              <span className="hero-badge">专业宠物医疗</span>
              <h1>守护每一只宠物的健康</h1>
              <div className="hero-illustration-inline fade-in-illustration" style={heroIllustrationStyle}>
                <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="animalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#f6efff" stopOpacity="0.42" />
                    </linearGradient>
                  </defs>
                  <path d="M60 140 C60 80, 120 40, 150 42 C180 40, 240 80, 240 140 C240 220, 180 268, 150 268 C120 268, 60 220, 60 140 Z" fill="url(#animalGradient)" opacity="0.95" />
                  <path d="M90 105 C80 80, 100 50, 128 64" fill="none" stroke="#ffdfdf" strokeWidth="16" strokeLinecap="round" />
                  <path d="M210 105 C220 80, 200 50, 172 64" fill="none" stroke="#ffdfdf" strokeWidth="16" strokeLinecap="round" />
                  <circle cx="108" cy="150" r="22" fill="#ffffff" />
                  <circle cx="192" cy="150" r="22" fill="#ffffff" />
                  <circle cx="108" cy="152" r="10" fill="#3e4b84" className="cat-eye" />
                  <circle cx="192" cy="152" r="10" fill="#3e4b84" className="cat-eye" />
                  <path d="M120 192 C130 205, 170 205, 180 192" fill="none" stroke="#3e4b84" strokeWidth="8" strokeLinecap="round" />
                  <path d="M150 168 C145 178, 155 178, 150 168" fill="#ff7f8f" />
                  <path d="M78 170 C68 178, 58 175, 50 168" fill="none" stroke="#3e4b84" strokeWidth="6" strokeLinecap="round" />
                  <path d="M222 170 C232 178, 242 175, 250 168" fill="none" stroke="#3e4b84" strokeWidth="6" strokeLinecap="round" />
                  <path d="M120 100 C115 94, 115 84, 122 78" fill="none" stroke="#3e4b84" strokeWidth="8" strokeLinecap="round" />
                  <path d="M180 100 C185 94, 185 84, 178 78" fill="none" stroke="#3e4b84" strokeWidth="8" strokeLinecap="round" />
                  <path className="cat-heart" d="M212 58 C212 46, 226 42, 232 50 C238 42, 252 46, 252 58 C252 72, 232 84, 232 84 C232 84, 212 72, 212 58 Z" fill="#ff9bbd" opacity="0.9" />
                </svg>
              </div>
              <p>结合线上咨询、预约挂号与全面检查，打造贴心宠物诊疗服务。</p>
              <Button className="hero-button" type="primary" size="large" onClick={() => navigate('/appointment')}>
                立即预约
              </Button>
            </div>
          </div>
          <div className="hero-slide">
            <div className="hero-content">
              <span className="hero-badge">温暖关怀</span>
              <h1>专业团队 温馨护理</h1>
              <p>经验丰富的医生和护士，为宠物提供全程安心守护。</p>
              <Button className="hero-button" type="primary" size="large" onClick={() => navigate('/doctors')}>
                查看医生团队
              </Button>
            </div>
          </div>
          <div className="hero-slide">
            <div className="hero-content">
              <span className="hero-badge">品质商城</span>
              <h1>精选药品与营养用品</h1>
              <p>一站式购物，快速配送，陪伴宠物健康成长。</p>
              <Button className="hero-button" type="primary" size="large" onClick={() => navigate('/shop')}>
                前往商城
              </Button>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Statistic title="专业医生" value={28} prefix={<TeamOutlined className="animated-icon statistic-icon" />} />
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
              <div className="service-icon animated-icon">🏥</div>
              <h3>综合检查</h3>
              <p>全面的健康检查和诊断</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="service-card" hoverable>
              <div className="service-icon animated-icon">💊</div>
              <h3>药物治疗</h3>
              <p>专业的药物治疗方案</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="service-card" hoverable>
              <div className="service-icon animated-icon">🩺</div>
              <h3>手术专科</h3>
              <p>先进的外科手术与康复方案</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="service-card" hoverable>
              <div className="service-icon animated-icon">💆</div>
              <h3>康护服务</h3>
              <p>温柔细致的术后护理照顾</p>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Appointment Process */}
      <div className="process-section">
        <h2>预约流程</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card className="process-card" hoverable>
              <div className="process-step-number">1</div>
              <h3>选择服务</h3>
              <p>浏览我们的专业项目，找到适合的宠物护理方案。</p>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="process-card" hoverable>
              <div className="process-step-number">2</div>
              <h3>填写信息</h3>
              <p>选择医生、日期和时间，填写宠物症状描述。</p>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="process-card" hoverable>
              <div className="process-step-number">3</div>
              <h3>完成预约</h3>
              <p>提交后即可收到预约确认，安心等待就诊。</p>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="contact-item">
              <PhoneOutlined className="contact-icon animated-icon" />
              <h3>紧急电话</h3>
              <p>400-888-8888</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="contact-item">
              <ClockCircleOutlined className="contact-icon animated-icon" />
              <h3>营业时间</h3>
              <p>周一至周日 08:00-20:00</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="contact-item">
              <span className="contact-icon animated-icon">📍</span>
              <h3>医院地址</h3>
              <p>北京市朝阳区某某街道123号</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <div className="contact-map-panel">
              <div className="address-card">
                <div className="address-card-content">
                  <h3>医院地址</h3>
                  <p>北京市朝阳区某某街道123号</p>
                  <p>欢迎您前来就诊，宠物医院位置便利，交通便捷。</p>
                  <div className="address-actions">
                    <Button
                      type="default"
                      onClick={() => window.open('https://www.openstreetmap.org/?mlat=39.9175&mlon=116.4395#map=16/39.9175/116.4395', '_blank')}
                    >
                      查看地图
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => window.open('https://uri.amap.com/navigation?to=116.4395,39.9175,宠物医院&mode=car&policy=0&src=webapp.pethospital', '_blank')}
                    >
                      高德导航
                    </Button>
                    <Button
                      type="default"
                      onClick={() => {
                        const query = encodeURIComponent('宠物医院 北京市朝阳区某某街道123号');
                        const baiduUrl = `https://map.baidu.com/search/${query}`;
                        window.open(baiduUrl, '_blank');
                      }}
                    >
                      百度导航
                    </Button>
                  </div>
                </div>
              </div>
              <div className="address-map-wrapper">
                <iframe
                  title="医院位置"
                  className="address-map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=116.4270%2C39.9120%2C116.4500%2C39.9230&layer=mapnik&marker=39.9175%2C116.4395"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
