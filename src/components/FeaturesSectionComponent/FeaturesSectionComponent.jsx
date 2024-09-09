import { CarOutlined, DollarOutlined, PhoneOutlined, SwapOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const ServicesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #ffffff; 
    padding: 20px 0;
    margin-top: 50px;
    border-radius: 6px;
`;

const ServiceItem = styled.div`
    text-align: center;
    max-width: 200px;
`;

const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f3ed;
  border: 2px solid #f1c40f;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px; 
`;

const ServiceTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  color: #666;
`;


const FeaturesSectionComponent = () => {
  return (
    <ServicesWrapper>
      <ServiceItem>
        <IconCircle>
        <CarOutlined style={{ fontSize: 30, color: '#333' }} /> 
        </IconCircle>
        <ServiceTitle>Miễn Phí Vận Chuyển</ServiceTitle>
        <ServiceDescription>Miễn phí vận chuyển đơn hàng trên 600k</ServiceDescription>
      </ServiceItem>

      <ServiceItem>
        <IconCircle>
            <PhoneOutlined style={{ fontSize: 30, color: '#333' }} /> 
        </IconCircle>
        <ServiceTitle>Chăm Sóc Khách Hàng</ServiceTitle>
        <ServiceDescription>Hỗ trợ khách hàng 24/7.</ServiceDescription>
      </ServiceItem>

      <ServiceItem>
        <IconCircle>
            <SwapOutlined  style={{ fontSize: 30, color: '#333' }} /> 
        </IconCircle>
        <ServiceTitle>Đổi Trả Hàng</ServiceTitle>
        <ServiceDescription>Miễn phí đổi trả trong 10 ngày.</ServiceDescription>
      </ServiceItem>

      <ServiceItem>
        <IconCircle>
            <DollarOutlined   style={{ fontSize: 30, color: '#333' }} /> 
        </IconCircle>
        <ServiceTitle>Giá Cả Hợp Lý</ServiceTitle>
        <ServiceDescription>Giá cả hợp lý theo nhu cầu của Khách Hàng</ServiceDescription>
      </ServiceItem>
    </ServicesWrapper>
  );
};

export default FeaturesSectionComponent;
