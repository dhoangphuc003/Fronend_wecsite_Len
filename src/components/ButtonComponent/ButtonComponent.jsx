import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({size, style, styleTextButton, textButt="Tìm", disabled, ...rests}) => {
    return (
        <Button size={size}
                style={{
                    ...style,
                    background: disabled ? "#ccc": style.background 
                }}
                {...rests}
        >
                <span style={styleTextButton}>{textButt}</span>
        </Button>
    );
};


export default ButtonComponent;