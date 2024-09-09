// thẻ sản phẩm
import React from "react";
import { StyleNameProduct, WrapperCardType, WrapperDisCountProduct, WrapperPriceProduct, WrapperRateProduct, WrapperStyleTextSell } from "./style";
import { StarFilled } from "@ant-design/icons";

const CardComponent = (props) =>{
    const {name, type, price, description, image, rating, discount, selled, countInStock} = props
    return (
        <WrapperCardType
            hoverable
            cover={<img alt="example" src={image} style={{width:'200px',height:'200px'}}/>}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperRateProduct>
                <span>
                    <span>{rating}</span><StarFilled style={{fontSize:'11px', color: "yellow"}}/>
                </span>
                <WrapperStyleTextSell>Đã bán {selled || 100}</WrapperStyleTextSell>
            </WrapperRateProduct>
            <WrapperPriceProduct>
                {price}
                <WrapperDisCountProduct> -{discount || 5 } %</WrapperDisCountProduct>
            </WrapperPriceProduct>
      </WrapperCardType>
    )
}
export default CardComponent