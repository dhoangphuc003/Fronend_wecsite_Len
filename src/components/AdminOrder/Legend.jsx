import React from 'react';

const Legend = ({ payload }) => {
    if (!payload || !Array.isArray(payload)) {
      return null; 
    }
  
    return (
      <div style={{ padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: entry.fill, 
                marginRight: '8px',
                borderRadius: '50%',
              }}
            />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

export default Legend;
