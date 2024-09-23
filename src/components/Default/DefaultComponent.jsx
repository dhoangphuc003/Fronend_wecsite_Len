import React from 'react';
import HeaderComponent from '../Header/HeaderComponent';
import FooterComponent from '../Footer/Footer';

const DefaultComponent = ({ children, showFooter }) => {
  return (
    <div>
        <HeaderComponent/>
        {children}
      {showFooter && (
        <FooterComponent/>
      )}
    </div>
  );
};

export default DefaultComponent;
