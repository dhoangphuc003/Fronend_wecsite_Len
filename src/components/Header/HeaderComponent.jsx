import React, { useEffect, useRef, useState } from "react";
import { Badge, Col, Popover } from 'antd';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from "./header";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as UserService from '../../service/UserService';
import { resetUser } from "../../redux/slides/userSlide";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../service/ProductService';
import { searchProduct } from '../../redux/slides/productSlice';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const [userName, setUserName] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    
    const handleNavigateSignin = () => {
        navigate('/sign-in');
    };

    useEffect(() => {
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
    }, [user?.name, user?.avatar]);

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutToken();
        dispatch(resetUser());
        setLoading(false);
    };

    const refSearch = useRef();
    const [stateProducts, setStateProducts] = useState([]);

    const fetchProductAll = async (search) => {
        const res = await ProductService.getAllProduct(search);
        if (search?.length > 0) {
            setStateProducts(res?.data);
            return []
        } else {
            return res;
        }
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', search],
        queryFn: () => fetchProductAll(search),
        retry: 3,
        retryDelay: 1000,
    });

    useEffect(() => {
        if (refSearch.current) {
            fetchProductAll(search);
        }
        refSearch.current = true;
    }, [search]);

    useEffect(() => {
        if (products?.length > 0) {
            setStateProducts(products);
        }
        refSearch.current = true;
    }, [products]);

    const content = (
        <div>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý cửa hàng</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const onSearch = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        dispatch(searchProduct(searchValue)); 
    };

    return (
        <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader >
                <Col span={5}>
                    <WrapperTextHeader onClick={() => navigate('/')}>YARN SHOP</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        placeholder="Nhập tên để tìm kiếm"
                        suggestions={stateProducts.map(product => product.name)} // Truyền danh sách gợi ý
                        onChange={onSearch} 
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center', paddingLeft: '15px' }}>
                    <LoadingComponent isLoading={loading} >
                        <WrapperHeaderAccout>
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                    alt="avatar"
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateSignin}>
                                    <WrapperTextHeaderSmall style={{ cursor: "pointer" }}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccout>
                    </LoadingComponent>
                    <div onClick={() => navigate('/cartpage')}>
                        <Badge count='1' size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: 'white' }} />
                        </Badge>
                        <WrapperTextHeaderSmall >Giỏ Hàng</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
