import { Row } from "antd";
import styled from "styled-components"
export const  WrapperHeader  = styled(Row)`
    width: 100%;
    background-color: rgb(0,0,0);
    color: white;
    align-items: center;
    gap:16;
    flex-wrap: nowrap; 
`

export const  WrapperTextHeader  = styled.span`
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    padding-left: 24px;
`
export const  WrapperHeaderAccout  = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
`
export const  WrapperTextHeaderSmall  = styled.span`
    font-size: 13px;
    line-height: 1.4;
    text-align: right;
`
export const  WrapperIconHeader  = styled.span`
    font-size: 30px;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &: hover {
        background: rgb(23, 162, 184);
        color: #fff;
    }
`