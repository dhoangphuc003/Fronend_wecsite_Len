import React from 'react';
import {Table, Button } from 'antd';
import {Container, Header } from '../ProductManagementPage/style';
import MonthlyRevenueChart from '../Char/Char';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Đơn hàng',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: 'Đã hủy',
    dataIndex: 'Cancel',
    key: 'Cancel',
  },
  {
    title: 'Giao hàng',
    dataIndex: 'ship',
    key: 'ship',
  },
  {
    title: 'Doanh thu',
    dataIndex: 'revenue',
    key: 'revenue',
  },
];

const data = [
    {
      key: '1',
      date: '2023-09-01',
      order: 10,
      Cancel: 2,
      ship: 8,
      revenue: 150000, // Giá trị giả định cho doanh thu
    },
    {
      key: '2',
      date: '2023-09-02',
      order: 20,
      Cancel: 1,
      ship: 19,
      revenue: 300000,
    },
    {
      key: '3',
      date: '2023-09-03',
      order: 50,
      Cancel: 0,
      ship: 5,
      revenue: 1500000,
    },
    {
      key: '4',
      date: '2023-09-04',
      order: 15,
      Cancel: 3,
      ship: 12,
      revenue: 975000,
    },
    {
      key: '5',
      date: '2023-09-05',
      order: 25,
      Cancel: 5,
      ship: 20,
      revenue: 800000,
    },
    {
      key: '6',
      date: '2023-09-06',
      order: 12,
      Cancel: 2,
      ship: 10,
      revenue: 360000,
    },
    {
      key: '7',
      date: '2023-09-07',
      order: 7,
      Cancel: 1,
      ship: 6,
      revenue: 210000,
    }
  ];
  
  

const ReportPage = () => {
  return (
    <Container >
      <Header>Báo cáo doanh thu</Header>
      <MonthlyRevenueChart/>
      <Button type="primary" style={{ marginBottom: 20 }}>Export Excel</Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} />
    </Container>
  );
};

export default ReportPage;  
