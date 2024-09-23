import { Button, Form, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../../components/TableComponent/TableCompoent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import InputComponent from "../../components/Inputcomponent/InputComponent";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../service/UserService";
import * as message from "../../components/Message/Message";
import { getBase64 } from "../../utils";
import { useQuery } from "@tanstack/react-query";

const AdminUser = () => {
  const [form] = Form.useForm();
  const tableRef = useRef(null);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const user = useSelector((state) => state.user);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    isAdmin: false,
    phone: "",
    avatar: "",
    address: "",
    city: "",
  });
  const renderAction = () => {
    return (
      <div>
        <EditOutlined
          style={{ color: "green", fontSize: "30px", cursor: "pointer" }}
          onClick={handelDetailUser}
        />
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
      </div>
    );
  };

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...userData } = data;
    return UserService.updateUser(id, token, { ...userData });
  });
  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    return UserService.deleteUser(id, token);
  });
  const mutationDeleteMany = useMutationHook((data) => {
    const { token, ...ids } = data;
    return UserService.deleteManyUser(ids, token);
  });

  const getAllUsers = async () => {
    const token = user?.access_token;
    const res = await UserService.getAllUser(token);
    return res;
  };
  const FetchGetDetailsUser = async (rowSelected) => {
    try {
      if (!rowSelected) {
        throw new Error("Row selected is invalid");
      }
      const token = user?.access_token;
      const res = await UserService.getDetailsUser(rowSelected, token);
      if (res?.data) {
        setStateUserDetails({
          name: res?.data?.name,
          email: res?.data?.email,
          isAdmin: res?.data?.isAdmin,
          phone: res?.data?.phone,
          avatar: res?.data?.avatar,
          address: res?.data?.address,
          city: res?.data?.city
        });
        setIsLoadingUpdate(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      message.error("Không thể lấy chi tiết sản phẩm. Vui lòng thử lại.");
    }
  };

  const {
    data: dataUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { isLoading: isLoadingUser, data: users } = queryUser;
  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      FetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  const handelDetailUser = () => {
    setIsOpenDrawer(true);
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated, dataUpdated, isErrorDeleted]);
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted, dataDeleted, isErrorDeleted]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ""}`}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      sorter: (a, b) => a.city.length - b.city.length,
    },
    {
      title: "Quyền",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: "true",
        },
        {
          text: "False",
          value: "false",
        },
      ],
      onFilter: (value, record) => {
        if (value === "true") {
          return (record.isAdmin = true);
        }
        return (record.isAdmin = false);
      },
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Lệnh",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user?.isAdmin ? "True" : "False",
      };
    });

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      isAdmin: false,
      phone: "",
      avatar: "",
      city:"",
      address:""
    });
    form.resetFields();
  };
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
    console.log("e.target.value", e.target.name, e.target.value);
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const onDeleteUser = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };
  const handleDeleteManyUser = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };
  const onUpdateUser = () => {
    console.log("Token:", user?.access_token); // Kiểm tra token
    setIsLoadingUpdate(true);
    console.log("Updating user with:", {
      id: rowSelected,
      token: user?.access_token,
      ...stateUserDetails,
    });
   
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateUserDetails,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };
  return (
    <div>
      <WrapperHeader>Quản Lý Người Dùng</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          tableRef={tableRef}
          nameTable="user"
          handleDeleteMany={handleDeleteManyUser}
          columns={columns}
          isLoading={isLoadingUser}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <DrawerComponent
        title="chi tiết người dùng"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width={"50%"}
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            name="userForm"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
            initialValues={stateUserDetails}
          >
            <Form.Item
              label="Tên:"
              name="name"
              rules={[{ required: true, message: "Nhập tên người dùng!" }]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Nhập email!" }]}
            >
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Nhập địa chỉ!" }]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
            <Form.Item
              label="Thành phố"
              name="city"
              rules={[{ required: true, message: "Nhập thành phố!" }]}
            >
              <InputComponent
                value={stateUserDetails.city}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Quyền"
              name="isAdmin"
              rules={[{ required: true, message: "Nhập quyền!" }]}
            >
              <InputComponent
                value={stateUserDetails.isAdmin}
                onChange={handleOnchangeDetails}
                name="isAdmin"
              />
            </Form.Item>

            <Form.Item
              label="Điện thoại"
              name="phone"
              rules={[{ required: true, message: "Nhập điện thoại!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={(e) =>
                  handleOnchangeDetails({
                    target: {
                      name: e.target.name,
                      value: Number(e.target.value),
                    },
                  })
                }
                name="phone"
                type="number"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="avatar"
              rules={[{ required: true, message: "Thêm ảnh!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}> Select file</Button>
                {stateUserDetails?.avatar && (
                  <img
                    src={stateUserDetails?.avatar}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "20px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Xóa Sản Phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={onDeleteUser}
        forceRender
      >
        <div>Bạn có chắc muốn xóa sản phẩm này không</div>
      </ModalComponent>
    </div>
  );
};
export default AdminUser;
