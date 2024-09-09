import styled from "styled-components";
import { Card } from "antd";

export const WrapperCardType = styled(Card)`
       width: 200px;
    & .ant-card-cover {
        overflow: hidden; 
    }
    & img {
        width:200px;
        height:200px
        transition: transform 0.3s ease-in-out; 
    }
    &:hover img {
        transform: scale(1.2);
    }
    .ant-card-body {
        padding: 10px;
    }

    .ant-card-head {
        width: 200px;
        height: 200px;
    }
`
export const StyleNameProduct = styled.div`
    font-weight:bold;
    font-size: 16px;
    line_height:16px;
    color: rgb(56,56,61);
`
export const WrapperRateProduct = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 4px 0 0px
`
export const WrapperPriceProduct = styled.div`
    color: rgb(255, 66, 78);
    font-size:16px;
    font-weight:bold;
    margin: 4px 0 4px;
`
export const WrapperDisCountProduct = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight:500;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`