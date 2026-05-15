import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Tag, Spin, message } from 'antd';
import { PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { doctorApi } from '../services/api';
import '../styles/pages.css';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorApi.getDoctors();
      setDoctors(response.data);
    } catch (error) {
      message.error('获取医生信息失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>医生团队</h1>
      <p className="page-subtitle">我们拥有经验丰富的专业医疗团队</p>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {doctors.map((doctor) => (
            <Col key={doctor._id} xs={24} sm={12} md={8}>
              <Card className="doctor-card" hoverable>
                <div className="doctor-avatar">
                  <img src={doctor.avatar || 'https://via.placeholder.com/150'} alt={doctor.name} />
                </div>
                <h2>{doctor.name}</h2>
                <Tag color="blue">{doctor.specialty}</Tag>
                <Tag color="green">{doctor.qualification}</Tag>
                <p className="doctor-intro">{doctor.introduction}</p>
                <div className="doctor-info">
                  <p>
                    <ClockCircleOutlined /> {doctor.experience}年经验
                  </p>
                  <p>
                    <MailOutlined /> {doctor.email}
                  </p>
                  <p>
                    <PhoneOutlined /> {doctor.phone}
                  </p>
                </div>
                <Button type="primary" block size="large" onClick={() => (window.location.pathname = '/appointment')}>
                  预约挂号
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}

export default Doctors;
