import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButton, WrapperButtonMore, WrapperProducts, WrapperTexth2, WrapperTextTitle, WrapperTitle, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { assets } from "../../assets/asset";
import CardComponent from "../../components/CardComponent/CardComponent";
import FeaturesSectionComponent from "../../components/FeaturesSectionComponent/FeaturesSectionComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../service/ProductService'
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";


const HomePage = () =>{
    // const type= ["Len sơi","Dụng cụ đan móc", "Trang trí","Sản Phẩm"]
    const searchProduct = useSelector((state) => state?.product?.search)
    const [typeProduct, setTypeProduct]= useState([])
    const [limit, setLimit] = useState()
    const [productsByType, setProductsByType] = useState({});
    const [selectedType, setSelectedType] = useState('');
    const navigate = useNavigate()
    const fetchProductAll = async (context) => {
        try {
            const queryKey = context?.queryKey || [];
            const search = queryKey[1] || ''; 
            const limit = queryKey[2] || 30; 
            const sort = queryKey[3] || '';
            const type = queryKey[4] || ''; 
        
            const res = await ProductService.getAllProduct(search, limit, sort, type);
            return res;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            throw error;
        }
    };
    
    const fetchAllTypeProduct = async() =>{
        const res = await ProductService.getAllTypeProduct()
        if(res?.status ==="OK"){
            setTypeProduct(res?.data)
        }
    }
    const { isLoading, data: products } = useQuery({
        queryKey: ['products', searchProduct, limit, selectedType],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 100,
        onSuccess: (data) => {
            console.log('API Data:', data); 
            if (data?.data) { 
                const groupedProducts = data.data.reduce((acc, product) => {
                    const type = product.type || 'Uncategorized';
                    if (!acc[type]) {
                        acc[type] = [];
                    }
                    acc[type].push(product);
                    return acc;
                }, {});
                setProductsByType(groupedProducts);
                console.log('Grouped Products:', groupedProducts); // Kiểm tra dữ liệu đã nhóm
            } else {
                console.warn('No data returned from API');
            }
        }
        
        
    });
    
    useEffect(()=>{
        fetchAllTypeProduct()
    },[])

    const handleNavigateType =(type)=>{ 
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g,'')?.replace(/ /g,'_')}`,{state: type})
    }
    useEffect(() => {
        console.log('Products by Type:', productsByType); // Thêm dòng này để kiểm tra dữ liệu
    }, [productsByType]);
    const productsOfTypeLen = products?.data?.filter(product => product.type === 'len');  // Lọc sản phẩm có type là 'len'
    const productsOfTypeSanPham = products?.data?.filter(product => product.type === 'Sản phẩm');
    return (
        <>
            <div style={{padding: '0 120px'}}>
                <WrapperTypeProduct>
                {typeProduct?.map((item) => {
                    return(
                        <TypeProduct name={item} key={item}/>
                    )
                })}
                </WrapperTypeProduct>
            </div>
            <div style={{background:'#efefef',width:'100%'}}> 
                <div id="container" style={{ height:'100%', width:'1270px',margin:'0 auto'}}>
                    <SliderComponent arrImages={[assets.sl4,assets.sl2,assets.sl3,assets.sl1]}/>
                   <FeaturesSectionComponent/>
                    <Loading isLoading={isLoading}>
                        <WrapperTextTitle>
                            <WrapperTexth2 >
                                <WrapperTitle>SẢN PHẨM MỚI</WrapperTitle>
                            </WrapperTexth2>
                                <WrapperProducts>
                                    {(products?.data?.slice(0, 6).map((product)=>{
                                        return(
                                            <CardComponent 
                                                key={product.id} 
                                                name={product.name} 
                                                image={product.image} 
                                                rating={product.rating} 
                                                price={product.price}
                                                countInStock={product.countInStock}
                                                description={product.description}
                                                discount={product.discount}
                                                selled={product.selled}
                                                id={product._id}
                                            />
                                        )
                                    })) }
                                </WrapperProducts>
                            <div style={{width:'100%', display:'flex',justifyContent:'center',marginTop:'10px'}}>
                                {/* <WrapperButtonMore 
                                    textButt="Xem Thêm" 
                                    type="outline" 
                                    style={{  
                                                    border: '1px solid rgb(11, 116, 229)', 
                                                    color: 'rgb(11, 116, 229)',width: '240px', 
                                                    height: '38px', 
                                                    borderRadius: '4px'
                                                }} 
                                    styleTextButton={{fontWeight:500}}
                                    onClick={()=> setLimit((prev)=> prev+=6)}
                                    />
                                    <WrapperButtonMore 
                                    textButt="Rút gọn" 
                                    type="outline" 
                                    style={{  
                                                    border: '1px solid rgb(11, 116, 229)', 
                                                    color: 'rgb(11, 116, 229)',width: '240px', 
                                                    height: '38px', 
                                                    borderRadius: '4px'
                                                }} 
                                    styleTextButton={{fontWeight:500}}
                                    onClick={()=> setLimit((prev)=> prev=6)}
                                    />   */}
                            </div>
                        </WrapperTextTitle>
                        <WrapperTextTitle>
                        <WrapperTexth2 >
                                <WrapperTitle>LEN</WrapperTitle>
                                <WrapperButton onClick={()=> handleNavigateType('len')}>+ Xem tất cả </WrapperButton>
                            </WrapperTexth2>
                            <WrapperProducts>
                            {productsOfTypeLen?.map((product) => (
                                <CardComponent 
                                    key={product.id} 
                                    name={product.name} 
                                    image={product.image} 
                                    rating={product.rating} 
                                    price={product.price}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    discount={product.discount}
                                    selled={product.selled}
                                    id={product._id}
                                />
                            ))}
                            </WrapperProducts>
                        </WrapperTextTitle>
                        <WrapperTextTitle>
                            <WrapperTexth2 >
                                <WrapperTitle>SẢN PHẨM</WrapperTitle>
                                <WrapperButton onClick={()=> handleNavigateType('Sản phẩm')}>+ Xem tất cả </WrapperButton>
                            </WrapperTexth2>
                            <WrapperProducts>
                            {productsOfTypeSanPham?.map((product) => (
                                <CardComponent 
                                    key={product.id} 
                                    name={product.name} 
                                    image={product.image} 
                                    rating={product.rating} 
                                    price={product.price}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    discount={product.discount}
                                    selled={product.selled}
                                    id={product._id}
                                />
                            ))}
                            </WrapperProducts>
                        </WrapperTextTitle>
                    </Loading>
           
                </div>
            </div>
            
        </>
    )
}
export default HomePage