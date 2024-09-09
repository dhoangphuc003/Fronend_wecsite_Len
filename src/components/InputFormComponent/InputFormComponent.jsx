import React from 'react';
import { WrapperInputStyle } from './style';
const InputFormComponent = (props) => {
    const { placeholder = "Nhập",onChange, ...rests} = props
    const handleOnchangeInput =(e)=>{
        props.onChange(e.target.value)
    }

    return (
        <WrapperInputStyle
            placeholder={placeholder}
            value={props.value}
            onChange={handleOnchangeInput}
            {...rests}
        />
    )
}
export default InputFormComponent;