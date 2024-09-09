import styled from "styled-components";

export const WrapperContainerLeft = styled.div` 
    position: relative;
    width: 469px;
    justify-content: center;
    display: flex;
    flex-direction:column;
    
`
export const WrapperContainerRight = styled.div`
    flex:1;
    width: 468px;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
`
export const WrapperTextImage = styled.div`
    position: absolute;
    top: 60%;
    left: 45%;
    width: 370px;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`
export const WrapperTextLight = styled.span`
    color: rgb(13, 92, 182);
    font-size: 13px;
    cursor: pointer;
`