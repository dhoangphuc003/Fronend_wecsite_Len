import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from 'antd';
import {    UserOutlined, 
            CaretDownOutlined, 
            ShoppingCartOutlined,
        } from '@ant-design/icons';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from "./header";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserService from '../../service/UserService'
import {useDispatch} from 'react-redux'
import { resetUser } from "../../redux/slides/userSlide";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { searchProduct } from "../../redux/slides/productSlice";

const HeaderComponent = () =>{
    const navigate = useNavigate()
    const user = useSelector((state) => state.user); 
    const order = useSelector((state) => state.order); 
    const dispatch = useDispatch()
    const [userName, setUserName] = useState()
    const [userAvatar, setUserAvatar] = useState()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const handleNavigateSignin =() => {
        navigate('/sign-in')
    }
    useEffect(()=>{
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    },[user?.name,user?.avatar]) 

    
    const handleLogout = async()=>{
        setLoading(true)
        await UserService.logoutToken()
        dispatch(resetUser())
        setLoading(false)
    }
  
    const content = (
        <div>
        <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
        {user?.isAdmin && (
          <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
        )}
        <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
        <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
      </div>
    )

    const handleClickNavigate = (type) => {
        if(type === 'profile') {
          navigate('/profile-user')
        }else if(type === 'admin') {
          navigate('/system/admin')
        }else if(type === 'my-order') {
          navigate('/my-order',{ state : {
              id: user?.id,
              token : user?.access_token
            }
          })
        }else {
          handleLogout()
        }
        setIsOpenPopup(false)
      }
    

    const onSearch =(e)=>{
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
        console.log('e.target.value', e.target.value);
    }
    return (
        <div style={{width:'100%', background:'rgb(26,148,255)', display:'flex', justifyContent:'center'}}>
            <WrapperHeader >
                <Col span={5}>
                    <WrapperTextHeader onClick={()=> navigate('/')}>YARN SHOP</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch size='large' placeholder="Nhập tên để tìm kiếm" textButton="Tìm" onChange={onSearch}/>
                </Col>
                <Col span={6} style={{display:'flex',gap:'54px', alignItems:'center', paddingLeft:'15px'}}>
                    <div onClick={() => navigate('/order')} style={{cursor:'pointer'}}>
                        <Badge count={order?.orderItems?.length} size="small">
                            <ShoppingCartOutlined style={{fontSize:'30px',color:'white'}}/>
                        </Badge>
                        <WrapperTextHeaderSmall >Giỏ Hàng</WrapperTextHeaderSmall>
                    </div>
                    <LoadingComponent isLoading ={loading} >
                        <WrapperHeaderAccout>
                            {userAvatar? (
                                <img src={userAvatar} 
                                style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    objectFit:'cover'
                                }}
                                    alt=""></img>
                            ):(
                                <UserOutlined style={{fontSize:'30px'}}/>
                            )}
                            {user?.access_token ? (
                                <>
                                <Popover content={content} trigger="click" open={isOpenPopup}>
                                  <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                                </Popover>
                              </>
                            ):(
                                <div onClick={handleNavigateSignin}>
                                <WrapperTextHeaderSmall style={{cursor: "pointer"}}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                    <CaretDownOutlined/>
                                </div>
                                </div>
                            )}
                        
                        </WrapperHeaderAccout>
                    </LoadingComponent>
                   
                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent