import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { day: 'Mar 1', revenue: 150000 },
  { day: 'Mar 2', revenue: 300000 },
  { day: 'Mar 3', revenue: 1500000 },
  { day: 'Mar 4', revenue: 975000 },
  { day: 'Mar 5', revenue: 800000 },
  { day: 'Mar 6', revenue: 360000 },
  { day: 'Mar 7', revenue: 210000 },
  ];
  
  const MonthlyRevenueChart = () => {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={monthlyData}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
export default MonthlyRevenueChart;
