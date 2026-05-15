import React, { useState } from 'react';
import { Form, Button, Input, message, Spin } from 'antd';
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
      <div className="page-card auth-card">
        <div className="auth-title">
          <h2>欢迎回来</h2>
          <p>请输入账号信息，继续管理宠物健康服务。</p>
        </div>

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
          </Form>
        </Spin>

        <div className="auth-footer">
          没有账号？<a href="/register">立即注册</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
