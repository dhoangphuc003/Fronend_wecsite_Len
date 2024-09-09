import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan', revenue: 4000,
  },
  {
    name: 'Feb', revenue: 3000,
  },
  {
    name: 'Mar', revenue: 5000,
  },
  {
    name: 'Apr', revenue: 4780,
  },
  {
    name: 'May', revenue: 5890,
  },
  {
    name: 'Jun', revenue: 4390,
  },
  {
    name: 'Jul', revenue: 6490,
  },
  {
    name: 'Aug', revenue: 7000,
  },
  {
    name: 'Sep', revenue: 6000,
  },
  {
    name: 'Oct', revenue: 5000,
  },
  {
    name: 'Nov', revenue: 8000,
  },
  {
    name: 'Dec', revenue: 9000,
  },
];

const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
