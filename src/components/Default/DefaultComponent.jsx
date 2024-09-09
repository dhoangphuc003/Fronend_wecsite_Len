import React from "react";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/Footer";

const DefaultComponent = ({children}) =>{
    return (
        <div>
            <HeaderComponent/>
            {children}
            <FooterComponent/>
        </div>
    )
}
export default DefaultComponent