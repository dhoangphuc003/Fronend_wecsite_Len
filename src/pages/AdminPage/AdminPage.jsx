import { memo, useMemo, useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import * as ProductService from "../../service/ProductService";
import * as OrderService from '../../service/OrderService';
import * as UserService from '../../service/UserService';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import { useQueries } from '@tanstack/react-query';
import CustomizedContent from './components/CustomizedContent';
import HeaderAdmin from './HeaderAdmin';

const AdminPage = () => {
  const user = useSelector((state) => state?.user);

  const items = [
    getItem('DashBoard', 'dashboard', <UserOutlined />),
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
  ];

  const [keySelected, setKeySelected] = useState('dashboard'); // Set default value

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return { data: res?.data, key: 'orders' };
  };

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    console.log('res1', res);
    return { data: res?.data, key: 'products' };
  };

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    console.log('res', res);
    return { data: res?.data, key: 'users' };
  };

  const queries = useQueries({
    queries: [
      { queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60 },
      { queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60 },
      { queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60 },
    ],
  });

  const memoCount = useMemo(() => {
    const result = {};
    try {
      queries.forEach((query) => {
        if (query.data) {
          result[query.data.key] = query.data.data?.length || 0;
        }
      });
    } catch (error) {
      console.error(error);
    }
    console.log('Memo Count:', result);
    return result;
  }, [queries]);

  const COLORS = {
    users: ['#e66465', '#9198e5'],
    products: ['#a8c0ff', '#3f2b96'],
    orders: ['#11998e', '#38ef7d'],
  };

  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return <AdminUser />;
      case 'products':
        return <AdminProduct />;
      case 'orders':
        return <AdminOrder />;
      case 'dashboard':
        return <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />;
      default:
        return <></>;
    }
  };

  const handleOnClick = (e) => {
    console.log('Event:', e);
    console.log('Selected key:', e.key);
    setKeySelected(e.key);
  };

  return (
    <>
      <HeaderAdmin isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex', overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: 'calc(100vh - 50px)',
            top: 50,
            position: 'fixed',
            left: 0,
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ marginLeft: 256, flex: 1, padding: '15px', marginTop: '40px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

