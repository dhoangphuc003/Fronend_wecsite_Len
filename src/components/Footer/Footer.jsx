import React from "react";
import { assets } from "../../assets/asset";
import { EnvironmentFilled, MailFilled, PhoneFilled } from "@ant-design/icons";
import { WrapperFooter, WrapperFooterContent, WrapperFooterContentLCR, WrapperFooterCopyRight, WrapperFooterHR, WrapperFooterListItem, WrapperFooterSocialIcon } from "./style";


const FooterComponent = () =>{
    return (
        <WrapperFooter>
            <WrapperFooterContent>
                <WrapperFooterContentLCR style={{margin: '0 120px'}}>
                    <h1>GIỚI THIỆU</h1>
                    <p><b>YarnShop</b> - Shop bán len sợi, dụng cụ và phụ kiện handmade </p>
                    <p>Chuyên sản xuất và phân phối các sản phẩm thú bông len cao cấp</p>
                    <WrapperFooterSocialIcon>
                        <img src={assets.faceboook_icon} alt=''/>
                        <img src={assets.instagram_icon} alt=''/>
                        <img src={assets.youtube_icon} alt=''/>
                    </WrapperFooterSocialIcon>
                </WrapperFooterContentLCR>
                <WrapperFooterContentLCR>
                    <h1>CỬA HÀNG</h1>
                    <ul>
                        <WrapperFooterListItem>Trang Chủ</WrapperFooterListItem>
                        <WrapperFooterListItem>Danh Sách Sản Phẩm</WrapperFooterListItem>
                        <WrapperFooterListItem>Liên Hệ</WrapperFooterListItem>
                    </ul>
                </WrapperFooterContentLCR>
                <WrapperFooterContentLCR>
                    <h1>Liên Hệ </h1>
                    <ul>
                        <WrapperFooterListItem><PhoneFilled/>  0328572011</WrapperFooterListItem>
                        <WrapperFooterListItem><EnvironmentFilled />  An Phú Đông, Quận 12, Hồ Chí Minh</WrapperFooterListItem>
                        <WrapperFooterListItem><MailFilled /> dhoangphuc003@gmail.com</WrapperFooterListItem>
                    </ul>
                </WrapperFooterContentLCR>
            </WrapperFooterContent>
            <WrapperFooterHR/>
            <WrapperFooterCopyRight>
                Copyright 2024 yarnshop.com
            </WrapperFooterCopyRight>
        </WrapperFooter>           
    )
}
export default FooterComponent