import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButton, WrapperProducts, WrapperTexth2, WrapperTextTitle, WrapperTitle, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { assets } from "../../assets/asset";
import CardComponent from "../../components/CardComponent/CardComponent";
import FeaturesSectionComponent from "../../components/FeaturesSectionComponent/FeaturesSectionComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../service/ProductService'
import { useSelector } from "react-redux";


const HomePage = () =>{
    const type= ["Len sơi","Dụng cụ đan móc", "Trang trí","Sản Phẩm"]
    const searchProduct = useSelector((state) => state?.product?.search)
    const refSearch = useRef()
    const [stateProducts, setStateProducts] = useState([])
    const fetchProductAll = async (search)=>{
        const res = await ProductService.getAllProduct(search)
        if(search?.length > 0){
           setStateProducts(res?.data)
        }else {
            return res
        }
    };
    const {isLoading, data: products} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        retry:3,
        retryDelay: 1000
    });

    useEffect(() => {
        if(refSearch.current) {
            fetchProductAll(searchProduct)
        }
        refSearch.current = true
    },[searchProduct])
    useEffect(() => {
        if(products?.length >0) {
            setStateProducts(products)
        }
        refSearch.current = true
    },[products])
    useEffect(() => {
        if(products?.data?.length > 0) {
            setStateProducts(products?.data)
        }
    },[products])
    return (
        <>
            <div style={{padding: '0 120px'}}>
                <WrapperTypeProduct>
                {type.map((item) => {
                    return(
                        <TypeProduct name={item} key={item}/>
                    )
                })}
                </WrapperTypeProduct>
            </div>
            <div style={{background:'#efefef',width:'100%'}}> 
                <div id="container" style={{padding: '0 120px', height:'100%', width:'1270x',margin:'0 auto'}}>
                    <SliderComponent arrImages={[assets.sl4,assets.sl2,assets.sl3,assets.sl1]}/>
                   <FeaturesSectionComponent/>
                   <WrapperTextTitle>
                        <WrapperTexth2 >
                            <WrapperTitle>SẢN PHẨM BÁN CHẠY</WrapperTitle>
                        </WrapperTexth2>
                        <WrapperProducts>
                            {(stateProducts?.map((product)=>{
                                return(
                                    <CardComponent 
                                        key={product?.id} 
                                        name={product.name} 
                                        image={product.image} 
                                        rating={product.rating} 
                                        price={product.price}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        discount={product.discount}
                                        selled={product.selled}
                                    />
                                )
                            })) }
                        </WrapperProducts>
                    </WrapperTextTitle>
                    <WrapperTextTitle>
                        <WrapperTexth2 >
                            <WrapperTitle>LEN SỢI</WrapperTitle>
                            <WrapperButton href="#">+ Xem tất cả </WrapperButton>
                        </WrapperTexth2>
                        <WrapperProducts>
                        {/* {len_list.map((len,index)=>(
                                <CardComponent key={index} name={len.name} image={len.image} rating={len.rating} price={len.price}/>
                            ))} */}
                        </WrapperProducts>
                    </WrapperTextTitle>
                    <WrapperTextTitle>
                        <WrapperTexth2 >
                            <WrapperTitle>PHỤ LIỆU TRANG TRÍ</WrapperTitle>
                            <WrapperButton href="#">+ Xem tất cả </WrapperButton>
                        </WrapperTexth2>
                        <WrapperProducts>
                        {/* {trangtri_list.map((len, index)=>(
                                <CardComponent key={index} name={len.name} image={len.image} rating={len.rating} price={len.price}/>
                            ))} */}
                        </WrapperProducts>
                    </WrapperTextTitle>
                    <WrapperTextTitle>
                        <WrapperTexth2 >
                            <WrapperTitle>SẢN PHẨM</WrapperTitle>
                            <WrapperButton href="#">+ Xem tất cả </WrapperButton>
                        </WrapperTexth2>
                        <WrapperProducts>
                        {/* {sanpham_list.map((len, index)=>(
                                <CardComponent key={index} name={len.name} image={len.image} rating={len.rating} price={len.price}/>
                            ))} */}
                        </WrapperProducts>
                    </WrapperTextTitle>
                    {/* <div style={{width:'100%', display:'flex',justifyContent:'center',marginTop:'10px'}}>
                        <WrapperButtonMore 
                            textButton="Xem Thêm" 
                            type="outline" 
                            styleButton={{  
                                            border: '1px solid rgb(11, 116, 229)', 
                                            color: 'rgb(11, 116, 229)',width: '240px', 
                                            height: '38px', 
                                            borderRadius: '4px'
                                        }} 
                            styleTextButton={{fontWeight:500}}/> 
                    </div> */}
                </div>
            </div>
            
        </>
    )
}
export default HomePage