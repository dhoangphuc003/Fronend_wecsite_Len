import { Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import InputComponent from '../Inputcomponent/InputComponent';
import { convertPrice } from '../../utils';

import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { orderContant } from '../../contant';
import TableComponent from '../TableComponent/TableCompoent';
import { useRef } from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';
import PieChartComponent from './PieChart';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as message from "../../components/Message/Message";

const AdminOrder = () => {
  const user = useSelector((state) => state?.user);
  const order = useSelector((state) => state?.order);
  const tableRef = useRef(null);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false); // Khởi tạo với false

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...updateData } = data;
    return OrderService.updateShip(id, token, { ...updateData });
  });

  const {
    data: dataUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const onUpdateShip = () => {
    if (!rowSelected) {
      // Hiển thị thông báo lỗi nếu không có đơn hàng nào được chọn
      return;
    }
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        isDelivered,
      },
      {
        onSettled: () => {
          queryOrder.refetch();
          setIsModalOpen(false);
        },
      }
    );
  };

  const handleOnchangeDelivered = (value) => {
    setIsDelivered(value);
    onUpdateShip()
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={() => confirm()}
          >
            Search
          </Button>
          <Button
            size="small"
            style={{ width: 90 }}
            onClick={() => clearFilters && clearFilters()}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const renderAction = () => (
    <div>
      <SendOutlined
        style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
        onClick={() => setIsModalOpen(true)}
      />
    </div>
  );

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Thanh toán',
      dataIndex: 'isPaid',
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Giao hàng',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      ...getColumnSearchProps('totalPrice')
    },
    {
      title: "Lệnh",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable = orders?.data?.map((order) => ({
    ...order,
    key: order._id,
    userName: order?.shippingAddress?.fullName,
    phone: order?.shippingAddress?.phone,
    address: order?.shippingAddress?.address,
    paymentMethod: orderContant.payment[order?.paymentMethod],
    isPaid: order?.isPaid ? 'TRUE' : 'FALSE',
    isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
    totalPrice: convertPrice(order?.totalPrice),
  }));

  const handleCancelModel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated, dataUpdated, isErrorUpdated]);

  return (
    <div>
      <h2>Quản lý đơn hàng</h2>
      <div style={{ height: '200px', width: '100%' }}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          tableRef={tableRef}
          nameTable="Order"
          columns={columns}
          isLoading={isLoadingOrders}
          pagination={{ pageSize: 6 }}
          data={dataTable}
          onRow={(record, rowIndex) => ({
            onClick: (event) => {
              setRowSelected(record._id);
            },
          })}
        />
      </div>
      <ModalComponent
        title="Xác nhận giao hàng"
        open={isModalOpen}
        onCancel={handleCancelModel}
        onOk={() => handleOnchangeDelivered(true)} 
      >
        <div>
          <label>
            Đã giao hàng:
          </label>
        </div>
      </ModalComponent>
    </div>
  );
};

export default AdminOrder;
