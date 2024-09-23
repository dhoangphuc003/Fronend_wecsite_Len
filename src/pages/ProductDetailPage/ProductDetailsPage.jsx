import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () =>{
    const navigate = useNavigate()
    const {id}= useParams();
    return (
       <div style={{padding: '0 120px', background:'#efefef', height:'100vh',width:'100%'}}>
            <h3><span style={{cursor:'pointer'}}  onClick={()=> navigate('/')}>Trang chủ</span> / Chi tiết sản phẩm</h3>
            <ProductDetailComponent idProduct={id}/>
       </div>
    )
}
export default ProductDetailsPage