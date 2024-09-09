import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ActionIcons, Container, Header } from '../ProductManagementPage/style';

const columns = [
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Thanh toán',
    dataIndex: 'paid',
    key: 'paid',
  },
  {
    title: 'Giao hàng',
    dataIndex: 'ship',
    key: 'ship',
  },
  {
    title: 'Phương thức thanh toán',
    dataIndex: 'payment method',
    key: 'payment method',
  },
  {
    title: 'Lệnh',
    key: 'action',
    render: (_, record) => (
      <ActionIcons>
        <DeleteOutlined style={{ color: 'red' }} />
        <EditOutlined style={{ color: 'orange' }} />
      </ActionIcons>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    paid: 'Đã thanh toán',
    ship: 'Đang giao',
    'payment method': 'Thẻ tín dụng',
  },
  {
    key: '2',
    name: 'Trần Thị B',
    phone: '0912345678',
    address: '456 Đường DEF, Quận 2, TP.HCM',
    paid: 'Chưa thanh toán',
    ship: 'Chưa giao',
    'payment method': 'Chuyển khoản',
  },
  {
    key: '3',
    name: 'Lê Văn C',
    phone: '0923456789',
    address: '789 Đường GHI, Quận 3, TP.HCM',
    paid: 'Đã thanh toán',
    ship: 'Đã giao',
    'payment method': 'Tiền mặt',
  },
  {
    key: '4',
    name: 'Hoàng Thị D',
    phone: '0934567890',
    address: '101 Đường JKL, Quận 4, TP.HCM',
    paid: 'Đã thanh toán',
    ship: 'Đang giao',
    'payment method': 'Ví điện tử',
  },
  {
    key: '5',
    name: 'Phạm Văn E',
    phone: '0945678901',
    address: '202 Đường MNO, Quận 5, TP.HCM',
    paid: 'Chưa thanh toán',
    ship: 'Chưa giao',
    'payment method': 'Thẻ ghi nợ',
  },
];


const OrderManagementPage = () => {
  return (
    <Container>
      <Header>Quản lý đơn hàng</Header>
      <Button type="primary" style={{ marginBottom: 20 }}>Export Excel</Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </Container>
  );
};

export default OrderManagementPage;
