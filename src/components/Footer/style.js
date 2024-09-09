import styled from "styled-components"
export const  WrapperFooter  = styled.div`
    color: #d9d9d9;
    background: #2e309c;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding-top: 30px;
    height: 100%;
`
export const  WrapperFooterContent  = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
`
export const  WrapperFooterContentLCR  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 3px;
`

export const WrapperFooterListItem = styled.li`
    list-style: none;
    margin-bottom: 15px;
    cursor: pointer;
    margin-left: -40px;
`
export const WrapperFooterSocialIcon = styled.div`
    display:flex;
    width: 40px;
    margin-right: 15px;
    gap:10px;
`
export const WrapperFooterCopyRight = styled.p`
    font-weight: 200;
`;
export const WrapperFooterHR = styled.hr`
    width: 25%;
    height: 2px;
    margin: 20px 0;
    background-color: gray;
    border: none;
`;