import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Select, DatePicker, TimePicker, message, Spin } from 'antd';
import { appointmentApi, doctorApi, petRecordApi } from '../services/api';
import '../styles/pages.css';

function Appointment() {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchDoctors();
      fetchPets();
    }
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorApi.getDoctors();
      setDoctors(response.data);
    } catch (error) {
      message.error('获取医生列表失败');
    }
  };

  const fetchPets = async () => {
    try {
      const response = await petRecordApi.getPets();
      setPets(response.data);
    } catch (error) {
      message.error('获取宠物列表失败');
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const appointmentData = {
        doctor: values.doctor,
        pet: values.pet,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        symptoms: values.symptoms,
      };
      await appointmentApi.createAppointment(appointmentData);
      message.success('预约成功！');
      form.resetFields();
    } catch (error) {
      message.error('预约失败，请重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <div className="page-card auth-card" style={{ textAlign: 'center' }}>
          <h2>请先登录</h2>
          <p>预约服务需要登录。</p>
          <Button type="primary" onClick={() => (window.location.pathname = '/login')}>
            去登录
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-heading">
        <span className="section-tag">预约挂号</span>
        <h2>快速安排宠物就诊</h2>
        <p>选择宠物、医生以及时间，轻松完成在线预约。</p>
      </div>

      <div className="page-card form-card" style={{ maxWidth: 760, margin: '0 auto' }}>
        <Spin spinning={loading}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="选择宠物"
              name="pet"
              rules={[{ required: true, message: '请选择宠物' }]}
            >
              <Select placeholder="请选择您的宠物">
                {pets.map((pet) => (
                  <Select.Option key={pet._id} value={pet._id}>
                    {pet.name} ({pet.type})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="选择医生"
              name="doctor"
              rules={[{ required: true, message: '请选择医生' }]}
            >
              <Select placeholder="请选择医生">
                {doctors.map((doctor) => (
                  <Select.Option key={doctor._id} value={doctor._id}>
                    {doctor.name} - {doctor.specialty}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="预约日期"
              name="date"
              rules={[{ required: true, message: '请选择预约日期' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="预约时间"
              name="time"
              rules={[{ required: true, message: '请选择预约时间' }]}
            >
              <TimePicker style={{ width: '100%' }} format="HH:mm" />
            </Form.Item>

            <Form.Item
              label="症状描述"
              name="symptoms"
              rules={[{ required: true, message: '请描述宠物的症状' }]}
            >
              <Input.TextArea rows={5} placeholder="请详细描述宠物的症状" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                提交预约
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
}

export default Appointment;
