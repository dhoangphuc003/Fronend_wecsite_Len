import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export const WrapperImageSmall = styled(Image)`
    width: 64px !important;
    height: 64px !important;
`
export const WrapperColImageSmall = styled(Col)`
    flex-basis: unset;
    display:flex;   
`
export const WrapperNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    word-break: break-word;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`
export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    padding: 10px;
    color: #e05757;
`
export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
`
export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    };
    span.noidung{
        font-size:14px;
    }
    
`
export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center,
    width: 120px;
`
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 100px;
        border-top: none;
        border-bottom: none;
        text-align: center; /* Căn giữa số theo chiều ngang */
        display: flex; 
        align-items: center; /* Căn giữa theo chiều dọc */
    }

    &.ant-input-number.ant-input-number-sm .ant-input-number-handler-wrap {
        display: none;
    }

    .ant-input-number-input {
        text-align: center; /* Đảm bảo văn bản (số) cũng được căn giữa */
    }
`;