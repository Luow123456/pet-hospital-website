import React, { useState } from 'react';
import { Card, Form, Button, Input, message, Spin } from 'antd';
import { userApi } from '../services/api';
import '../styles/pages.css';

function Login({ setUser, setIsLoggedIn }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await userApi.login(values.email, values.password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      message.success('登录成功！');
      window.location.href = '/';
    } catch (error) {
      message.error(error.response?.data?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Card style={{ maxWidth: 400, margin: '50px auto' }} title="用户登录">
        <Spin spinning={loading}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱' }]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                登录
              </Button>
            </Form.Item>
            <p style={{ textAlign: 'center' }}>
              没有账号？<a href="/register">立即注册</a>
            </p>
          </Form>
        </Spin>
      </Card>
    </div>
  );
}

export default Login;
