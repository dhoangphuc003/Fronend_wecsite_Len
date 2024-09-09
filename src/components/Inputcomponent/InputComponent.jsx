import { Input } from 'antd';
import React     from 'react';

const InputComponent = ({size,placeholder,bordered, style, ...rests}) => {
    return (
        <Input 
                size={size}
                placeholder={placeholder}
                boder={bordered}
                style={style}
                //những thứ còn lại
                {...rests}
        />
    );
};

export default InputComponent;