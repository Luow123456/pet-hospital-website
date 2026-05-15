import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Select, Spin, message, Modal, Table } from 'antd';
import { petRecordApi } from '../services/api';
import '../styles/pages.css';

function PetRecords() {
  const [form] = Form.useForm();
  const [pets, setPets] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchPets();
    }
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await petRecordApi.getPets();
      setPets(response.data);
    } catch (error) {
      message.error('获取宠物列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async (petId) => {
    try {
      const response = await petRecordApi.getRecords(petId);
      setRecords(response.data);
    } catch (error) {
      message.error('获取病历失败');
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await petRecordApi.createPet(values);
      message.success('添加宠物成功！');
      form.resetFields();
      setIsModalVisible(false);
      fetchPets();
    } catch (error) {
      message.error('添加宠物失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPet = (petId) => {
    const pet = pets.find((p) => p._id === petId);
    setSelectedPet(pet);
    fetchRecords(petId);
  };

  const columns = [
    {
      title: '就诊日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '医生',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: '诊断',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: '处方',
      dataIndex: 'prescription',
      key: 'prescription',
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <Card style={{ textAlign: 'center', marginTop: 50 }}>
          <h2>请先登录</h2>
          <p>宠物病历管理需要登录。</p>
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
        <span className="section-tag">病历管理</span>
        <h2>宠物健康档案一目了然</h2>
        <p>添加宠物信息并查看详细就诊记录，方便随时管理和查询。</p>
      </div>

      <Spin spinning={loading}>
        <div className="page-card records-card" style={{ padding: 32 }}>
          <div className="records-topbar">
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              添加宠物
            </Button>
            <div>当前宠物数量: <strong>{pets.length}</strong></div>
          </div>

          <Card bordered={false} className="page-card" style={{ marginBottom: 24 }}>
            <Form layout="vertical">
              <Form.Item label="选择宠物" style={{ marginBottom: 0 }}>
                <Select placeholder="请选择宠物" onChange={handleSelectPet}>
                  {pets.map((pet) => (
                    <Select.Option key={pet._id} value={pet._id}>
                      {pet.name} - {pet.type} ({pet.breed})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Card>

          {selectedPet && (
            <Card bordered={false} className="page-card pet-summary">
              <h3>{selectedPet.name}</h3>
              <p>类型: {selectedPet.type}</p>
              <p>品种: {selectedPet.breed}</p>
              <p>年龄: {selectedPet.age}岁</p>
              <p>体重: {selectedPet.weight}kg</p>
            </Card>
          )}

          {selectedPet && (
            <Card bordered={false} className="page-card">
              <h3>就诊记录</h3>
              <div className="table-wrapper">
                <Table columns={columns} dataSource={records} rowKey="_id" pagination={false} />
              </div>
            </Card>
          )}
        </div>
      </Spin>

      <Modal title="添加宠物" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="宠物名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="宠物类型" name="type" rules={[{ required: true }]}>
            <Select placeholder="请选择">
              <Select.Option value="dog">狗</Select.Option>
              <Select.Option value="cat">猫</Select.Option>
              <Select.Option value="rabbit">兔子</Select.Option>
              <Select.Option value="bird">鸟</Select.Option>
              <Select.Option value="other">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="品种" name="breed" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="年龄" name="age" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="体重(kg)" name="weight" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PetRecords;
