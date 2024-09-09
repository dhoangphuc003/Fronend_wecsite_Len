import React, { useEffect, useState } from "react";
import {  Col, Popover } from 'antd';
import {    UserOutlined, 
            CaretDownOutlined, 
        } from '@ant-design/icons';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from "./header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserService from '../../service/UserService'
import {useDispatch} from 'react-redux'
import { resetUser } from "../../redux/slides/userSlide";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const HeaderAdmin = () =>{
    const navigate = useNavigate()
    const user = useSelector((state) => state.user); 
    const dispatch = useDispatch()
    const [userName, setUserName] = useState()
    const [userAvatar, setUserAvatar] = useState()
    const [loading, setLoading] = useState(false)
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
        navigate('/')
        setLoading(false)
    }
  
    const content = (
        <div>
            {user?.isAdmin &&(
                <WrapperContentPopup onClick={()=> navigate('/system/admin')}>Quản lý cửa hàng</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={()=> navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
           
        </div>
    )
    return (
        <div style={{ background:'rgb(26,148,255)', display:'flex', justifyContent:'center'}}>
            <WrapperHeader >
                <Col span={12}>
                    <WrapperTextHeader onClick={()=> navigate('/')}>YARN SHOP</WrapperTextHeader>
                </Col>
                <Col span={12} style={{display:'flex',gap:'54px', alignItems:'center', paddingLeft:'550px'}}>
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
                                <Popover content={content} trigger="click">
                                    <div style={{cursor:'pointer'}}>{userName?.length ? userName : user?.email}</div>
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
export default HeaderAdmin