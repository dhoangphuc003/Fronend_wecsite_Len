import React, { useState } from 'react';
import { Layout, Button, Card, Row, Col, Checkbox, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 1));


  return (
    <div style={{padding: '20px 120px', height:'100vh', background:'rgb(251 243 243)'}}>
        <Row gutter={16}>
          <Col span={16}>
            <Card title="Giỏ hàng">
              <Row justify="space-between" align="middle">
                <Col>
                    <h3>Phí Giao Hàng</h3>
                    <div style={{padding: '0px 15px'}}>
                        <h5 value="low">20.000 VND Dưới 200.000 VND</h5>
                        <h5 value="medium">10.000 VND Từ 200.000 VND đến dưới 500.000 VND</h5>
                        <h5 value="high">0 VND Trên 500.000 VND</h5>
                    </div>
                </Col>
              </Row>
              <Divider style={{margin: '10px 0'}}/>
              <Row align="middle" justify="space-between">
                <Col span={2}></Col>
                <Col span={4}>Ảnh</Col>
                <Col span={6}>Tên</Col>
                <Col span={4}>Số lượng</Col>
                <Col span={4}>Thành tiền</Col>
                <Col span={4}></Col> {/* khoảng trống cho icon thùng rác */}
              </Row>
              <Divider style={{margin: '10px 0'}}/>
              <Row justify="space-between" align="middle">
                <Col span={2}><Checkbox /></Col>
                <Col span={4}><img src="https://via.placeholder.com/60" alt="product" /></Col>
                <Col span={6}>Len Nhung</Col>
                <Col span={4}>
                  <Button onClick={decrement}>-</Button>
                  <span style={{ margin: '0 10px' }}>{quantity}</span>
                  <Button onClick={increment}>+</Button>
                </Col>
                <Col span={4}>200.000 VND</Col>
                <Col span={4} style={{textAlign: 'center'}}><DeleteOutlined style={{fontSize:'25px'}} /></Col> 
              </Row>
              
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Thông tin thanh toán">
              <p>Địa chỉ: <strong>HCM HCM</strong> <Button type="link">Thay đổi</Button></p>
              <Divider />
              <Row justify="space-between">
                <Col>Tạm tính</Col>
                <Col>200.000 VND</Col>
              </Row>
              <Row justify="space-between">
                <Col>Giảm giá</Col>
                <Col>10.000 VND</Col>
              </Row>
              <Row justify="space-between">
                <Col>Phí giao hàng</Col>
                <Col>10.000 VND</Col>
              </Row>
              <Divider />
              <Row justify="space-between">
                <Col>Tổng tiền</Col>
                <Col>200.000 VND</Col>
              </Row>
              <Button type="primary" block style={{ marginTop: '20px' }}>Mua hàng</Button>
            </Card>
          </Col>
        </Row>
  </div>
  );
};

export default CartPage;
