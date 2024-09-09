import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import InputComponent from '../Inputcomponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch =(props)=> {
    const {
        size, placeholder, 
        textButton = "Tìm",
        bordered, 
        backgroundColorInput = '#fff',
        backgroundColorButton= 'rgb(13, 92, 182)',
        colorButton = '#fff',
        suggestions = [] 
    } = props

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value) {
            setFilteredSuggestions(
                suggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(value.toLowerCase())
                )
            );
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setShowSuggestions(false);
    };

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                <InputComponent 
                    size={size}
                    placeholder={placeholder}
                    boder={bordered}
                    style={{ backgroundColor: backgroundColorInput, borderRadius:2 }}
                    onChange={handleInputChange}
                    {...props}/>
                <ButtonComponent 
                    size={size}
                    style={{ background: backgroundColorButton, border: !bordered && 'none',borderRadius:2 }}
                    icon={<SearchOutlined  color= {colorButton} style={{color:colorButton  }} />}
                    textButt={textButton}
                    styleTextButton={{ color: colorButton }}
                />
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    zIndex: 1
                }}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li key={index} 
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee', color:'black' }}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ButtonInputSearch;
