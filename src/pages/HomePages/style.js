import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-start;
    font-size: 13px;
    height: 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff !important;
        background: rgb(26, 148, 255);
    }
`
export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top:20px;
    flex-wrap: wrap;
`
export const WrapperTitle = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: #7a4419; 
    border-bottom: 3px solid #7a4419;
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 0px;
    margin-top: 20px;

`
export const WrapperButton = styled.a`
    background-color: #a01d1b; /* Màu nền nút đỏ */
    color: white; /* Màu chữ trắng */
    border-radius: 5px;
    padding: 5px 15px;
    text-decoration: none;
    font-weight: bold;
    float: right;
    display: inline-block;
    font-size: 13px;
    margin-bottom: 0px;
    margin-top: 20px;

    &:hover {
        background-color: #c42323; /* Màu nền khi rê chuột */
    }
`
export const WrapperTexth2 = styled.h2`
    border-bottom: 2px solid #ececec;
`
export const WrapperTextTitle = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
`
