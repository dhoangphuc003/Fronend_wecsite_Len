import React from 'react';
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style';
import {  Rate } from 'antd';

const NavbarComponent = () => {
    const renderContent = (type, options)=>{
        switch(type){
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue>{option}</WrapperTextValue>
                })
            case 'star':
                return options.map((option)=>{
                    return(
                        <div style={{display:'flex',gap:'4px'}}>
                            <Rate disabled defaultValue={option} />
                            <span style={{fontSize:'13px', alignContent: 'center'}}>{` ${option} sao`}</span>
                        </div>
                            )
                })
            case 'price':
                return options.map((option)=>{
                    return(
                        <WrapperTextPrice>
                            {option}
                        </WrapperTextPrice>
                        )
                })
            default:
                return {}
        }
    }
    return (
        <div>
            <WrapperLableText>Danh Mục</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Len','Dụng cụ đan/móc','Nguyên phụ liệu', 'Sản phẩm'])}
            </WrapperContent>
            <WrapperLableText>Đánh giá</WrapperLableText>
            <WrapperContent>
                {renderContent('star',[5,4,3])}
            </WrapperContent>
            <WrapperLableText>Giá tiền</WrapperLableText>
            <WrapperContent>
                {renderContent('price',['0 - 100.000vnđ',
                                        '100.000 - 300.000vnđ',
                                        '300.000 - 500.000vnđ'])}
            </WrapperContent>
        </div>
    );
};

export default NavbarComponent;