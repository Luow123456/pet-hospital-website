import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Spin, message, Space, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { consultationApi } from '../services/api';
import '../styles/pages.css';

function Consultation() {
  const [form] = Form.useForm();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchConsultations();
    }
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await consultationApi.getConsultations();
      setConsultations(response.data);
    } catch (error) {
      message.error('获取咨询列表失败');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await consultationApi.createConsultation({
        title: values.title,
        content: values.content,
      });
      message.success('提交咨询成功！');
      form.resetFields();
      fetchConsultations();
    } catch (error) {
      message.error('提交咨询失败');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <Card style={{ textAlign: 'center', marginTop: 50 }}>
          <h2>请先登录</h2>
          <p>在线咨询需要登录。</p>
          <Button type="primary" onClick={() => (window.location.pathname = '/login')}>
            去登录
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-heading">
        <span className="section-tag">在线咨询</span>
        <h2>立即发送问题，获取专家建议</h2>
        <p>我们会安排专业医生尽快回复您的咨询。</p>
      </div>

      <Spin spinning={loading}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Card className="consultation-card" title="提交咨询">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item label="咨询标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
                <Input placeholder="请输入咨询标题" />
              </Form.Item>
              <Form.Item label="咨询内容" name="content" rules={[{ required: true, message: '请输入咨询内容' }]}>
                <Input.TextArea rows={6} placeholder="请详细描述您的问题" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SendOutlined className="animated-icon" />} block>
                  提交咨询
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card className="consultation-card" title="咨询记录">
            <List
              className="consultation-list"
              dataSource={consultations}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <div>
                        <p>{item.content}</p>
                        {item.reply && <p style={{ color: 'green' }}>医生回复: {item.reply}</p>}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Space>
      </Spin>
    </div>
  );
}

export default Consultation;
