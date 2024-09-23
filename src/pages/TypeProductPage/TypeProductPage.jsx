import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {  Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";


const TypeProductPage = () =>{
    const searchProduct = useSelector((state) => state?.product?.search)
    const {state} = useLocation()
    const navigate = useNavigate()
    const [product, setProduct]= useState([])
    const [loading, setLoading]= useState(false)
    const [panigate, setPanigate] = useState({
        page:0,
        limit:10,
        total:1
    })
    const fetchProductByType = async(type, page, limit)=>{
        setLoading(true)
        const res = await ProductService.getAllProductByType(type, page, limit);
        if(res?.status === "OK"){
            setLoading(false)
            setProduct(res?.data)
            setPanigate({...panigate, total: res?.total})
        }else{
            setLoading(false)
        }
    }
    const onchange = (current, pageSize)=>{
        setPanigate({...panigate, page:current-1, limit:pageSize})
    }
    useEffect(()=>{
        if(state){
            fetchProductByType(state, panigate.page, panigate.limit)
        }
    },[state,panigate.page, panigate.limit])
    return (
        <Loading isLoading={loading}>
            <div style={{width:'100%', background:'#efefef', height:'calc(100vh-60px)'}}>
                <div style={{display:'block',padding:'0 120px',margin:'0 auto', height:'100vh'}}>
                    <h3 style={{marginTop: '10px'}}><span style={{cursor:'pointer'}}  onClick={()=> navigate('/')}>Trang chủ</span> / Sản phẩm</h3>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: '100vh' }}>
                        <WrapperNavbar span={4}>
                            <NavbarComponent />
                        </WrapperNavbar>
                        <Col
                            span={20}
                            style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '100%', 
                            paddingBottom: '30px', 
                            }}
                        >
                            <WrapperProducts>
                            {product?.filter((pro) => {
                                if (searchProduct === ' ') {
                                return pro;
                                } else if (pro?.name?.toLowerCase()?.includes(searchProduct?.toLowerCase())) {
                                return pro;
                                }
                            })?.map((data) => (
                                <CardComponent
                                key={data.id}
                                name={data.name}
                                image={data.image}
                                rating={data.rating}
                                price={data.price}
                                countInStock={data.countInStock}
                                description={data.description}
                                discount={data.discount}
                                selled={data.selled}
                                id={data._id}
                                />
                            ))}
                            </WrapperProducts>

                            <Pagination
                            defaultCurrent={panigate.page + 1}
                            total={panigate.total} 
                            onChange={onchange}
                            style={{
                                marginTop: '10px',
                                textAlign: 'center',
                                marginBottom: '15px', // Khoảng cách giữa pagination và footer
                            }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    )
}
export default TypeProductPage