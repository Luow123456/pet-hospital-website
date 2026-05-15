import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spin, message, InputNumber, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { shopApi } from '../services/api';
import '../styles/pages.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await shopApi.getProducts();
      setProducts(response.data);
    } catch (error) {
      message.error('获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: value,
    });
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product._id] || 1;
    try {
      setLoading(true);
      await shopApi.createOrder({
        product: product._id,
        quantity,
        totalPrice: product.price * quantity,
      });
      message.success('加入购物车成功！');
      setQuantities({ ...quantities, [product._id]: 1 });
    } catch (error) {
      message.error('添加到购物车失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>药品商城</h1>
      <p className="page-subtitle">优质宠物用品和药品在线购买</p>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8}>
              <Card className="product-card" hoverable>
                <div className="product-image">
                  <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-info">
                  <p>规格: {product.specifications}</p>
                  <p>库存: {product.stock}件</p>
                </div>
                <div className="product-price">
                  <span className="price">¥{product.price}</span>
                </div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <InputNumber
                    min={1}
                    max={product.stock}
                    defaultValue={1}
                    onChange={(value) => handleQuantityChange(product._id, value)}
                    style={{ width: '100%' }}
                  />
                  <Button
                    type="primary"
                    block
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? '暂无库存' : '购买'}
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}

export default Shop;
