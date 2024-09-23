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
    const [isOpenPopup, setIsOpenPopup] = useState(false)
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
        <WrapperContentPopup onClick={() => handleClickNavigate('home')}>Trang chủ</WrapperContentPopup>
        {user?.isAdmin && (
          <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
        )}
        <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
      </div>
    )

    const handleClickNavigate = (type) => {
        if(type === 'home') {
          navigate('/')
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
    return (
        <div style={{ background:'rgb(26,148,255)', height:'50px',display:'flex', justifyContent:'center', position: 'fixed',top: 0, width: '100%', zIndex: 1000,}}>
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
export default HeaderAdmin