import React, { useCallback, useEffect,useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../service/UserService'
import { useMutationHook } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSlide";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { useNavigate } from "react-router-dom";

const ProfilePage = () =>{
    const user = useSelector((state) => state.user);
    const [ email, setEmail]= useState(user?.email)
    const [ name,  setName]= useState(user?.name)
    const [ address, setAddress]= useState(user?.address)
    const [ phone, setPhone]= useState(user?.phone)
    const [ avatar, setAvatar]= useState(user?.avatar)
    const [ city, setCity]= useState(user?.city)
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const handleOnchangeEmail =(value)=>{
        setEmail(value)
    }
    const handleOnchangeName =(value)=>{
        setName(value)
    }
    const handleOnchangeAddress =(value)=>{
        setAddress(value)
    }
    const handleOnchangeCity =(value)=>{
        setCity(value)
    }
    const handleOnchangePhone =(value)=>{
        setPhone(value)

    }
    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setAvatar(file.preview)
    }
    const mutation = useMutationHook((data) => {
        const { id, access_token, ...rests} = data
        UserService.updateUser(id, access_token, {...rests})
})
    const handleUpdate =()=>{
        mutation.mutate({
            id: user?.id,
            access_token: user?.access_token,
            name, 
            email, 
            address,
            city, 
            phone, 
            avatar, 
        })
        window.location.reload();//load lại trang 
    }

    const {isPending, isSuccess, isError }= mutation
    useEffect(()=>{
        if(isSuccess){
            message.success()
            handleGetDetailsUser(user?.id && user?.access_token)
        }else if(isError){
            message.error()
        }
    })
    
    const handleGetDetailsUser = useCallback(async (id, token) => {
        try {
            if (!token) {
                console.error("No access token found, please login again.");
                return;
            }
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        } catch (error) {
            if (error.response?.status === 403) {
                console.error('Access denied or token expired, please login again.');
                // Optionally, you can redirect user to login page
            } else {
                console.error('Error fetching user details:', error);
            }
        }
    }, [dispatch]);
 
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress (user?.address)
        setAvatar(user?.avatar)
        setCity(user?.city)
    },[user])


    return (
        <div style={{width:'1270px', margin:'0 auto', height:'500px'}}>
            <h3 style={{marginTop: '10px'}}><span style={{cursor:'pointer'}}  onClick={()=> navigate('/')}>Trang chủ</span> / Thông tin của tôi</h3>
            <LoadingComponent isLoading={isPending}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Tên</WrapperLabel>
                        <InputFormComponent 
                            style={{width:'300px', height:'30px'}} 
                            id="name" 
                            value={name} 
                            onChange={handleOnchangeName} 
                        />
                        <ButtonComponent  
                            onClick={handleUpdate}
                            bordered={'false'}
                            size={40}
                            style={{
                                background: '#17a2b8',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                padding:'6px'
                            }}
                            textButt={"Cập nhật"}
                            styleTextButton={{ color: '#fff' }}/>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputFormComponent 
                            style={{width:'300px', height:'30px'}} 
                            id="email" 
                            value={email} 
                            onChange={handleOnchangeEmail} 
                        />
                        <ButtonComponent  
                            onClick={handleUpdate}
                            bordered={'false'}
                            size={40}
                            style={{
                                background: '#17a2b8',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                padding:'6px'
                            }}
                            textButt={"Cập nhật"}
                            styleTextButton={{ color: '#fff' }}/>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel>Địa chỉ</WrapperLabel>
                        <InputFormComponent 
                            style={{width:'300px', height:'30px'}} 
                            id="address" 
                            value={address} 
                            onChange={handleOnchangeAddress} 
                        />
                        <ButtonComponent  
                            onClick={handleUpdate}
                            bordered={'false'}
                            size={40}
                            style={{
                                background: '#17a2b8',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                padding:'6px'
                            }}
                            textButt={"Cập nhật"}
                            styleTextButton={{ color: '#fff' }}/>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel>Thành phố</WrapperLabel>
                        <InputFormComponent 
                            style={{width:'300px', height:'30px'}} 
                            id="city" 
                            value={city} 
                            onChange={handleOnchangeCity} 
                        />
                        <ButtonComponent  
                            onClick={handleUpdate}
                            bordered={'false'}
                            size={40}
                            style={{
                                background: '#17a2b8',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                padding:'6px'
                            }}
                            textButt={"Cập nhật"}
                            styleTextButton={{ color: '#fff' }}/>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Điện thoại</WrapperLabel>
                        <InputFormComponent 
                            style={{width:'300px', height:'30px'}} 
                            id="phone" 
                            value={phone} 
                            onChange={handleOnchangePhone} 
                        />
                        <ButtonComponent  
                                        onClick={handleUpdate}
                                        bordered={'false'}
                                        size={40}
                                        style={{
                                            background: '#17a2b8',
                                            height: '30px',
                                            width: 'fit-content',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding:'6px'
                                        }}
                                        textButt={"Cập nhật"}
                                        styleTextButton={{ color: '#fff' }}/>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <input 
                            type="file" 
                            id="avatar" 
                            style={{ display: 'none' }} // input file ẩn đi
                            onChange={handleOnchangeAvatar} 
                        />
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} showUploadList={false}>
                            <Button icon={<UploadOutlined/>}> Select file</Button>
                        </WrapperUploadFile>
                      {avatar &&(
                        <img 
                            src={avatar} 
                            style={{
                                height:'60px',
                                width: '60px',
                                borderRadius:'50%',
                                objectFit:'cover'
                            }} 
                            alt="avatar"/>
                      )}
                        <ButtonComponent  
                            onClick={handleUpdate}
                            bordered={'false'}
                            size={40}
                            style={{
                                background: '#17a2b8',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                padding:'6px'
                            }}
                            textButt={"Cập nhật"}
                            styleTextButton={{ color: '#fff' }}/>
                    </WrapperInput>

                </WrapperContentProfile>
            </LoadingComponent>
        </div>
    )
}
export default ProfilePage