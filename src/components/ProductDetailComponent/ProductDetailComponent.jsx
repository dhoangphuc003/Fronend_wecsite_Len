import { Col, Image, Row } from "antd";
import React from "react";
import { assets } from "../../assets/asset";
import { WrapperAddressProduct, WrapperColImageSmall, WrapperImageSmall, WrapperInputNumber, WrapperNameProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleTextSell } from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailComponent = () =>{
    const onChange =() => {}
    
    return (
        <Row style={{padding:'16px',background:'#fff', borderRadius:'4px'}}>
            <Col span={10} style={{borderRight:'1px solid #e5e5e5', paddingRight:'16px'}}>
                <Image src={assets.LenNhungGau} alt="Image Product" preview={false}/>
                <Row style={{paddingTop:'5px', justifyContent:'space-between'}}>
                    <WrapperColImageSmall span={4}>
                        <WrapperImageSmall  src={assets.smallimage1} alt="Image small" preview={false}/>
                    </WrapperColImageSmall>
                    <WrapperColImageSmall span={4}>
                        <WrapperImageSmall src={assets.smallimage2} alt="Image small" preview={false}/>
                    </WrapperColImageSmall>
                    <WrapperColImageSmall span={4}>
                        <WrapperImageSmall src={assets.smallimage3} alt="Image small" preview={false}/>
                    </WrapperColImageSmall>
                    <WrapperColImageSmall span={4}>
                        <WrapperImageSmall src={assets.smallimage4} alt="Image small" preview={false}/>
                    </WrapperColImageSmall>
                    <WrapperColImageSmall span={4}>
                        <WrapperImageSmall src={assets.smallimage5} alt="Image small" preview={false}/>
                    </WrapperColImageSmall>
                    <WrapperColImageSmall span={4}>
                        <WrapperImageSmall src={assets.smallimage6} alt="Image small" preview={false}/>
                    </WrapperColImageSmall>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft:'10px'}}>
                <WrapperNameProduct>Len Nhung Gấu</WrapperNameProduct>
                <div style={{display: 'flex'}}>
                    <StarFilled style={{fontSize:'11px', color: 'rgb(253, 216, 54)'}}/>
                    <StarFilled style={{fontSize:'11px', color: 'rgb(253, 216, 54)'}}/>
                    <StarFilled style={{fontSize:'11px', color: 'rgb(253, 216, 54)'}}/>
                    <StarFilled style={{fontSize:'11px', color: 'rgb(253, 216, 54)'}}/>
                    <StarFilled style={{fontSize:'11px', color: 'rgb(253, 216, 54)'}}/>
                    <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>100.000đ</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến - </span>
                    <span className="address">Địa chỉ</span>
                    <span className="change-address"> - Đổi địa chỉ</span>
                    <span className="noidung"><br/>Len bông xù đây là dòng len sợi mềm, rất nhẹ được dùng để đan áo, mũ, viền áo váy,... hoặc chị em cũng có thể sử dụng để đan móc chăn, giày dép và cả thú bông cho bé nữa. Đặc biệt, len bông xù lông cừu là phiên bản nâng cấp của nhiều loại len lông xù trên thị trường. Len dày hơn, mềm hơn và đều lông. Sản phẩm sẽ giữ ấm mùa đông rất tốt cho trẻ sơ sinh và trẻ nhỏ.</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 10px',padding:'10px 0', borderTop: '1px solid #e5e5e5',borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{marginBottom:'12px'}}>Số lượng</div>
                    <WrapperQualityProduct>
                        <ButtonComponent
                            icon={<MinusOutlined  color= {'#000'} style={{fontSize: '20px'  }} />}
                        />                        
                        <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />
                        <ButtonComponent
                            icon={<PlusOutlined  color= {'#000'} style={{fontSize: '20px'  }} />}
                        />  
                    </WrapperQualityProduct>
                </div>
                <div >
                        <ButtonComponent 
                            bordered={'false'}
                            size={40}
                            style={{ 
                                background: '#17a2b8',
                                height: '48px',
                                width:'250px',
                                border:'none',
                                borderRadius:'4px',
                                
                            }}
                            textButton={"Thêm giỏ hàng"}
                            styleTextButton={{ color: '#fff' }}
                        />
                    </div>
            </Col>  
        </Row>
    )
}
export default ProductDetailComponent