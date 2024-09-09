import { useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreAddOutlined, BarChartOutlined, DashboardOutlined, ProfileOutlined, TagOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderAdmin from './HeaderAdmin';
import AdminProduct from '../AdminProduct/AdminProduct';
import AdminUser from '../AdminUser/AdminUser';
import AdminReport from '../AdminReport/AdminReport';
import AdminOrder from '../AdminOrder/AdminOrder';
import AdminDashboard from '../AdminDashboard/AdminDashboard';



const AdminPage = () => {
  const items = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />),
    getItem('Người Dùng', 'user', <UserOutlined />),
    getItem('Sản Phẩm', 'product', <AppstoreAddOutlined />),
    getItem('Đơn Hàng', 'order', <ProfileOutlined />),
    getItem('Báo Cáo', 'report', <BarChartOutlined />),
    getItem('Hỗ trợ', 'help', <TagOutlined />),
  ]

  const renderPage = (key) => {
    switch(key) {
      case 'dashboard':
        return (
          <AdminDashboard />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      case 'user':
        return (
          <AdminUser />
        )
      case 'report':
        return (
          <AdminReport />
        )
      case 'order':
        return (
          <AdminOrder />
        )   
      default:
        return <></>
    }
  }
  const [keySelected, setKeySelected ] = useState()
  const handleOnClick =({key})=>{
    setKeySelected(key)
  }
  console.log('key',keySelected)


  return (
    <>
      <HeaderAdmin/>
      <div style={{display:'flex'}}>
        <Menu
          mode="inline"
          style={{
            width: '256px',
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style= {{flex:'1', padding:'15px'}}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

