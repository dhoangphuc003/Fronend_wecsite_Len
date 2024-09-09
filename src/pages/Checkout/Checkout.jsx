import React from "react";
import { Radio, Card, Space, Typography, Button, Divider } from "antd";

const { Text, Title } = Typography;

const Checkout = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: '10px 120px' }}>
      {/* Phần chọn phương thức giao hàng và thanh toán */}
      <div style={{ flex: 2 }}>
        <Card title="Chọn phương thức giao hàng">
          <Radio.Group defaultValue="FAST">
            <Space direction="vertical">
              <Radio value="FAST">
                <Text strong style={{ color: "orange" }}>
                  FAST
                </Text>{" "}
                Giao hàng tiết kiệm
              </Radio>
              <Radio value="GO_JEK">GO_JEK Giao hàng tiết kiệm</Radio>
            </Space>
          </Radio.Group>
        </Card>

        <Card title="Chọn phương thức thanh toán" style={{ marginTop: 20 }}>
          <Radio.Group defaultValue="paypal">
            <Space direction="vertical">
              <Radio value="cod">Thanh toán tiền mặt khi nhận hàng</Radio>
              <Radio value="paypal">Thanh toán tiền bằng PayPal</Radio>
            </Space>
          </Radio.Group>
        </Card>
      </div>

      {/* Phần tổng hợp đơn hàng */}
      <div style={{ flex: 1, marginLeft: 20 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Tạm tính</Text>
            <Text>200.000 VND</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Giảm giá</Text>
            <Text>-10.000 VND</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Phí giao hàng</Text>
            <Text>20.000 VND</Text>
          </div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={5}>Tổng tiền</Title>
            <Title level={5} style={{ color: "red" }}>
              210.000 VND
            </Title>
          </div>
          <Text type="secondary">(Đã bao gồm VAT nếu có)</Text>
          <Button
            type="primary"
            style={{
              backgroundColor: "#FFC439",
              borderColor: "#FFC439",
              width: "100%",
              marginTop: 20,
            }}
            size="large"
          >
            PayPal
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
