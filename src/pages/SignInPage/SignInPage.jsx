import React, { useCallback, useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextImage, WrapperTextLight } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { assets } from "../../assets/asset";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from '../../service/UserService'
import { useMutationHook } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from "../../redux/slides/userSlide";


const SignInPage = () =>{
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
    const handleOnchangeEmail =(value)=>{
        setEmail(value)
    }
    const handleOnchangePassword =(value)=>{
        setPassword(value)
    }
    const handleNavigateSignUp =() => {
        navigate('/sign-up')
    }
    const navigate = useNavigate()
   
    const handleSignIn=()=>{
        mutation.mutate({
            email,
            password
        });
        // console.log('sign-in', email, password);
    }
    const mutation = useMutationHook(
        data => UserService.loginUser(data)
    )
    const {data, isPending, isSuccess  }= mutation
    const handleGetDetailsUser = useCallback(async (id, token) => {
        try {
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, [dispatch]);
    useEffect(() => {
        if (isSuccess) {
            if(location?.state){
                navigate(location?.state)
            }else{
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if(data?.access_token){
                const decoded = jwtDecode(data?.access_token)
                if(decoded?.id){
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        } 
    },[isSuccess,data?.access_token,navigate,handleGetDetailsUser])

    return (
        <div style={{   display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center',
                        height:'100vh',
                        backgroundImage:'-webkit-linear-gradient( 136deg,rgb(0,158,253) 0%,rgb(42,245,152) 100%)'}}>
            <div style={{display:'flex',width:'937px',height:'500px', borderRadius:'6px',background:'#fff', position:'relative'}}>
                <WrapperContainerLeft>
                    <Image src={assets.logoLogin} style={{borderTopLeftRadius:'6px', borderBottomLeftRadius:'6px'}} preview={false} alt="logo-login" width='469px' height='584px'/>
                    <WrapperTextImage>
                        <h1>Chào mừng <br/>đến với shop len!</h1>
                        <h5>Khám phá len độc đáo!</h5>
                    </WrapperTextImage>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <h1>Đăng nhập</h1>
                    <InputFormComponent 
                        style={{marginBottom:'10px'}} 
                        placeholder="abc@gmail.com"
                        value= {email} 
                        onChange={handleOnchangeEmail} 
                    />
                    <div style={{position:'relative'}}>
                        <span
                            style={{zIndex:10,position:'absolute',top:'15px',right:'8px'}}
                            onClick={()=>{setIsShowPassword(!isShowPassword)}}
                        >
                            {isShowPassword ? (<EyeFilled style={{cursor:"pointer"}}/>):(<EyeInvisibleFilled style={{cursor:"pointer"}}/>)}
                        </span>
                        <InputFormComponent 
                            placeholder="Nhập mật khẩu" 
                            type={isShowPassword ? "text":"password"}    
                            value= {password} 
                            onChange={handleOnchangePassword}
                        />
                    </div>
                    {data?.status ==='ERR' && <span style={{color:'red'}}>{data?.message}</span>}

                    <LoadingComponent isLoading ={isPending} >
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            bordered={'false'}
                            size={40}
                            style={{
                                background: '#17a2b8',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={"Đăng Nhập"}
                            styleTextButton={{ color: '#fff' }}
                        />
                    </LoadingComponent>

                    <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
                    <p>Bạn đã chưa tài khoản?<WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerRight>
            </div>
        </div>
    )
}
export default SignInPage