import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextImage, WrapperTextLight } from "../SignInPage/style";
import { assets } from "../../assets/asset";
import { Image } from "antd";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from '../../service/UserService'
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as message from '../../components/Message/Message'
const SignUpPage = () =>{
    const navigate = useNavigate()
    const handleNavigateSignIn =() => {
        navigate('/sign-in')
    }
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowComfirmPassword, setisShowComfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleOnchangeEmail =(value)=>{
        setEmail(value)
    }
    const handleOnchangePassword =(value)=>{
        setPassword(value)
    }
    const handleOnchangeConfirmPassword =(value)=>{
        setConfirmPassword(value)
    }
    const handleSignUp=()=>{
        mutation.mutate({email, password, confirmPassword})
        console.log('sign-up', email, password, confirmPassword);
    }

    const mutation = useMutationHook(
        data => UserService.signupUser(data)
    )
    const {data, isPending, isSuccess, isError  }= mutation
    console.log('mutation',mutation)

    useEffect (() => {
        if (isSuccess) {
            message.success()
            handleNavigateSignIn()
        } else if (isError) {
            message.error()
        }
    },[isSuccess, isError])


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
                    <h1 >Đăng ký tài khoản</h1>
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
                    <div style={{position:'relative'}}>
                        <span 
                            style={{zIndex:10,position:'absolute',top:'15px',right:'8px'}}
                            onClick={()=>{setisShowComfirmPassword(!isShowComfirmPassword)}}
                        >
                            {isShowComfirmPassword ? (<EyeFilled style={{cursor:"pointer"}}/>):(<EyeInvisibleFilled style={{cursor:"pointer"}}/>)}
                        </span>
                        <InputFormComponent 
                            placeholder="Nhập lại mật khẩu" 
                            type={isShowComfirmPassword ? "text":"password"} 
                            value= {confirmPassword} 
                            onChange={handleOnchangeConfirmPassword}
                        />
                    </div>
                    {data?.status ==='ERR' && <span style={{color:'red'}}>{data?.message}</span>}

                    <Loading isLoading ={isPending} >
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp} 
                            bordered={'false'}
                            size={40}
                            style={{ 
                                background: '#17a2b8',
                                height: '48px',
                                width:'100%',                                
                                border:'none',
                                borderRadius:'4px',
                                margin:'26px 0 10px'
                            }}
                            textButton={"Đăng ký"}
                            styleTextButton={{ color: '#fff' }}
                        />
                    </Loading>
                    <p>Bạn đã có tài khoản?<WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
                </WrapperContainerRight>
            </div>
        </div>
    )
}
export default SignUpPage