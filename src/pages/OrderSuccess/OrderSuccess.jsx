import React from 'react';
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrderInfo, Table, TableRow, TableCell, TotalPrice, SuccessMessage } from './style';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';

const OrderSucess = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <Loading isLoading={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <SuccessMessage>Đơn hàng đặt thành công</SuccessMessage>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
            <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                    <WrapperValue>
                      <span style={{color: '#ea8500', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                    </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                <Table>
                  <thead>
                    <TableRow>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell>Giá tiền</TableCell>
                      <TableCell>Số lượng</TableCell>
                    </TableRow>
                  </thead>
                  <tbody>
                    {state.orders?.map((order) => (
                      <TableRow key={order?.name}>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover', borderRadius: '5px' }} alt='' />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{convertPrice(order?.price)}</TableCell>
                        <TableCell>{order?.amount}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </WrapperItemOrderInfo>
              <TotalPrice>
                <span>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
              </TotalPrice>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSucess;
