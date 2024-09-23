import React from "react";
import { 
    StyleNameProduct, 
    WrapperCardType, 
    WrapperDisCountProduct, 
    WrapperPriceProduct, 
    WrapperRateProduct, 
    WrapperStyleTextSell 
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
    const { name, price, image, rating, discount, selled, countInStock, id } = props;
    const navigate = useNavigate();

    const handleDetailsProduct = (id) => {
        if (countInStock > 0) {
            navigate(`/product-details/${id}`);
        }
    };

    // Style when the product is out of stock
    const outOfStockStyle = {
        opacity: 0.6,  // Gray out the card
        pointerEvents: "none",  // Disable click event
        cursor: "not-allowed",  // Change cursor to not-allowed
    };

    return (
        <WrapperCardType
            hoverable
            cover={
                <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                    <img alt="example" src={image} style={{ width: '100%', height: '100%' }} />
                    {countInStock === 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            fontSize: '14px',
                            width:'102px'
                        }}>
                            Hết hàng
                        </div>
                    )}
                </div>
            }
            onClick={() => handleDetailsProduct(id)}
            style={countInStock === 0 ? outOfStockStyle : {}}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperRateProduct>
                <span>
                    <span>{rating}</span><StarFilled style={{ fontSize: '11px', color: "yellow" }} />
                </span>
                <WrapperStyleTextSell>Đã bán {selled || 100}</WrapperStyleTextSell>
            </WrapperRateProduct>
            <WrapperPriceProduct>
                {price?.toLocaleString()} VNĐ
                <WrapperDisCountProduct> -{discount || 5} %</WrapperDisCountProduct>
            </WrapperPriceProduct>
        </WrapperCardType>
    );
};

export default CardComponent;
