import React, { useState } from 'react';
import { Card, Form, Button, Input, message, Spin } from 'antd';
import { userApi } from '../services/api';
import '../styles/pages.css';

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await userApi.register(values);
      message.success('注册成功！请登录。');
      window.location.href = '/login';
    } catch (error) {
      message.error(error.response?.data?.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Card style={{ maxWidth: 400, margin: '50px auto' }} title="用户注册">
        <Spin spinning={loading}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="昵称" name="name" rules={[{ required: true, message: '请输入昵称' }]}>
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱' }]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="电话" name="phone" rules={[{ required: true, message: '请输入电话号码' }]}>
              <Input placeholder="请输入电话号码" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请再次输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                注册
              </Button>
            </Form.Item>
            <p style={{ textAlign: 'center' }}>
              已有账号？<a href="/login">立即登录</a>
            </p>
          </Form>
        </Spin>
      </Card>
    </div>
  );
}

export default Register;
