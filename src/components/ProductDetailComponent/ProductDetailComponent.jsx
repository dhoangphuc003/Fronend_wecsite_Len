import { Col, Image, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { WrapperAddressProduct, WrapperInputNumber, WrapperNameProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleTextSell } from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import * as message from "../../components/Message/Message";
import Loading from "../LoadingComponent/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlice";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent"
import CommentComponent from "../CommentComponent/CommentComponent";
import { initFacebookSDK } from "../../utils";

const ProductDetailComponent = ({idProduct}) =>{
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const onChange =(value) => {
        setNumProduct(Number(value))
    }
    const FetchGetDetailsProduct = async (context) => {
        try {
          const id = context?.queryKey && context?.queryKey[1] ;
          const res = await ProductService.getDetailsProduct(id);
          return res.data
        } catch (error) {
          console.error("Error fetching product details:", error.message);
          message.error("Không thể lấy chi tiết sản phẩm. Vui lòng thử lại.");
        }
      };
    const { isLoading, data: productDetails } = useQuery({queryKey: ['product-details',idProduct], queryFn: FetchGetDetailsProduct, enabled:!!idProduct});
    const renderStart = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<StarFilled key={i} style={{fontSize: '13px', color: 'rgb(253, 216, 54)'}} />);
        }
        return stars;
    };
    const handleChangeCount =(type)=>{
        if(type ==='increase'){
            setNumProduct(numProduct+1)
        }else{
            setNumProduct(numProduct-1)
        }
    }

    const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        }else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
    useEffect(() => {
        initFacebookSDK()
    }, [])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productDetails?.countInStock === 0){
            setErrorLimitOrder(true)
        }
    },[numProduct])

    useEffect(() => {
        if(order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])
    return (
      <Loading isLoading={isLoading}>
          <Row style={{padding:'16px',background:'#fff', borderRadius:'4px'}}>
            <Col span={10} style={{borderRight:'1px solid #e5e5e5', paddingRight:'16px'}}>
                <Image src={productDetails?.image} alt="Image Product" preview={false} style={{width:'500px',height:'500px'}}/>
            </Col>
            <Col span={14} style={{paddingLeft:'10px'}}>
                <WrapperNameProduct>{productDetails?.name}</WrapperNameProduct>
                <div style={{display: 'flex'}}>
                    <p style={{fontSize: '13px', color: 'rgb(0, 0, 0)', margin: '5px 0px'}}>({productDetails?.rating})</p>
                    {renderStart(productDetails?.rating)}
                    <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{productDetails?.price?.toLocaleString()} VNĐ</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến - </span>
                    <span className="address">{user?.address}</span>
                    <span className="change-address"> - Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <LikeButtonComponent
                     dataHref={ process.env.REACT_APP_IS_LOCAL 
                                ? "https://developers.facebook.com/docs/plugins/" 
                                : window.location.href
                            } 
                    />
                <div style={{ margin: '10px 0 10px',padding:'10px 0', borderTop: '1px solid #e5e5e5',borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{marginBottom:'12px'}}>Số lượng</div>
                    <WrapperQualityProduct>
                        <ButtonComponent
                            icon={<MinusOutlined  color= {'#000'} style={{fontSize: '20px'  }} textButt=''/>}
                            onClick={()=>handleChangeCount('decrease')}
                        />                        
                        <WrapperInputNumber defaultValue={Number(1)} onChange={onChange} value = {Number(numProduct)} size="small" />
                        <ButtonComponent
                            icon={<PlusOutlined  color= {'#000'} style={{fontSize: '20px'  }}   />}
                            onClick={()=>handleChangeCount('increase')}
                        />  
                    </WrapperQualityProduct>
                </div>
                <div style={{ margin: '10px 0 10px',padding:'10px 0',borderBottom: '1px solid #e5e5e5'}}>
                    <span className="noidung"><br/>{productDetails?.description}</span>
                </div>
                <div 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '50px',               
                        marginTop: '20px'          
                    }}
                >
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
                            onClick={handleAddOrderProduct}
                            textButt={"Thêm giỏ hàng"}
                            styleTextButton={{ color: '#fff' }}
                        />
                        <ButtonComponent 
                            bordered={'false'}
                            size={40}
                            style={{ 
                                background: 'rgb(184 23 23)',
                                height: '48px',
                                width:'250px',
                                border:'none',
                                borderRadius:'4px',
                                
                                
                            }}
                            textButt={"Mua ngay"}
                            styleTextButton={{ color: '#fff' }}
                        />
                </div>
            </Col>  
            <CommentComponent
                    dataHref={process.env.REACT_APP_IS_LOCAL 
                        ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                        : window.location.href
                    } 
                    width="1270px" 
                />
        </Row>
      </Loading>
    )
}
export default ProductDetailComponent