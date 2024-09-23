import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ 
    size, 
    style = {},  // Cung cấp giá trị mặc định là đối tượng rỗng
    styleTextButton = {}, 
    textButt, 
    disabled, 
    ...rests 
}) => {
    return (
        <Button 
            size={size}
            style={{
                ...style,
                background: disabled ? "#ccc" : style.background || 'defaultBackgroundColor', // Sử dụng giá trị mặc định nếu style.background không có
                cursor: disabled ? 'not-allowed' : 'pointer', // Thay đổi con trỏ chuột khi disabled
                // border: 'none', // Thay đổi border nếu cần
            }}
            disabled={disabled} // Đảm bảo thuộc tính disabled được truyền chính xác
            {...rests}
        >
            <span style={styleTextButton}>{textButt}</span>
        </Button>
    );
};

export default ButtonComponent;
