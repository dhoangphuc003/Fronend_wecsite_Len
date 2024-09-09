import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    width: 100%;
    padding: 10px 15px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 0; 
    font-size: 16px;
    background: transparent;
    transition: border-bottom-color 0.3s;
    
    &:focus {
        border-bottom-color: #007bff; 
        outline: none;
        box-shadow: none;
    }
`