import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {  Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { len_list, sanpham_list, trangtri_list } from "../../assets/asset";
// loại trang product
const TypeProductPage = () =>{
    const onchange = ()=>{

    }
    return (
        <div style={{width:'100%', background:'#efefef'}}>
            <div style={{padding:'0 120px',margin:'0 auto'}}>
                <Row style={{flexWrap:'nowrap',paddingTop:'10px'}}>
                    <WrapperNavbar span={4} >
                        <NavbarComponent/>
                    </WrapperNavbar>
                    <Col span={20}>
                        <WrapperProducts > 
                        
                        {len_list.map((len)=>(
                                <CardComponent name={len.name} image={len.image} rating={len.rating} price={len.price}/>
                            ))}
                        {sanpham_list.map((len)=>(
                                <CardComponent name={len.name} image={len.image} rating={len.rating} price={len.price}/>
                            ))}
                        </WrapperProducts>
                        <Pagination defaultCurrent={1} total={100} onChange={onchange} style={{marginTop:'10px', textAlign:'center'}}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default TypeProductPage