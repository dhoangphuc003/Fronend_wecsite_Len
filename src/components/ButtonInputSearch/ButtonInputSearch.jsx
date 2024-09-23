import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import InputComponent from '../Inputcomponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch =(props)=> {
    const {
        size, placeholder, 
        textButton,
        bordered, 
        backgroundColorInput = '#fff',
        backgroundColorButton= 'rgb(13, 92, 182)',
        colorButton = '#fff',
    } = props
    return (
        <div style={{display:'flex'}}> 
            <InputComponent 
                size={size}
                placeholder={placeholder}
                boder={bordered}
                style={{ backgroundColor: backgroundColorInput, borderRadius:2 }}
                {...props}/>
            <ButtonComponent 
                size={size}
                style={{ background: backgroundColorButton, border: !bordered && 'none',borderRadius:2 }}
                icon={<SearchOutlined  color= {colorButton} style={{color:colorButton  }} />}
                textButt={textButton}
                styleTextButton={{ color: colorButton }}
            />
        </div>
    );
};

export default ButtonInputSearch;