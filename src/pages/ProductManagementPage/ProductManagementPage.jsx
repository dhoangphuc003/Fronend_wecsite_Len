import React from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ActionIcons, AddProductCard, Container, Header } from './style';

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Đánh giá',
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: 'Loại',
    dataIndex: 'type',
    key: 'type',
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
    name: 'nơ',
    price: 20000,
    rating: 4.5,
    type: 'trang trí',
  },
  {
    key: '2',
    name: 'nón',
    price: 200000,
    rating: 4.5,
    type: 'sản phẩm',
  },
  {
    key: '3',
    name: 'len bông xù',
    price: 100000,
    rating: 5,
    type: 'len',
  },
  {
    key: '4',
    name: 'nơ',
    price: 20000,
    rating: 4.5,
    type: 'trang trí',
  },
  {
    key: '5',
    name: 'nón',
    price: 200000,
    rating: 4.5,
    type: 'sản phẩm',
  },
  {
    key: '6',
    name: 'len bông xù',
    price: 100000,
    rating: 5,
    type: 'len',
  },{
    key: '7',
    name: 'nơ',
    price: 20000,
    rating: 4.5,
    type: 'trang trí',
  },
  {
    key: '8',
    name: 'nón',
    price: 200000,
    rating: 4.5,
    type: 'sản phẩm',
  },
  {
    key: '9',
    name: 'len bông xù',
    price: 100000,
    rating: 5,
    type: 'len',
  },
];

const ProductManagement = () => {
  return (
    <Container>
      <Header>Quản lý sản phẩm</Header>
      <AddProductCard>
        <PlusOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
      </AddProductCard>
      <Button type="primary" style={{ marginBottom: 20 }}>Export Excel</Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </Container>
  );
};

export default ProductManagement;
