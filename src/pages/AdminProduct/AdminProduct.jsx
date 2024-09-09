import { Button, Form, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../../components/TableComponent/TableCompoent";
import InputComponent from "../../components/Inputcomponent/InputComponent";
import { WrapperUploadFile } from "../ProfilePage/style";
import { getBase64 } from "../../utils";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as ProductService from "../../service/ProductService";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [form] = Form.useForm();
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const user = useSelector((state) => state.user);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: "",
    image: "",
    rating: "",
    type: "",
  });
  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: "",
    image: "",
    rating: "",
    type: "",
  });
  const renderAction = () => {
    return (
      <div>
        <EditOutlined
          style={{ color: "green", fontSize: "30px", cursor: "pointer" }}
          onClick={handelDetailProduct}
        />
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
      </div>
    );
  };

  const mutation = useMutationHook((data) => {
    const { name, image, type, price, countInStock, rating, description } =
      data;
    const res = ProductService.createProduct({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
    });
    return res;
  });
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...productData } = data;
    return ProductService.updateProduct(id, token, { ...productData });
  });
  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    return ProductService.deleteProduct(id, token);
  });
  const mutationDeleteMany = useMutationHook((data) => {
    const { token, ...ids } = data;
    return ProductService.deleteManyProduct(ids, token);
  });

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    console.log("res", res);
    return res;
  };
  const FetchGetDetailsProduct = async (rowSelected) => {
    try {
      if (!rowSelected) {
        throw new Error("Row selected is invalid");
      }
      const res = await ProductService.getDetailsProduct(rowSelected);
      if (res?.data) {
        setStateProductDetails({
          name: res?.data?.name,
          price: res?.data?.price,
          description: res?.data?.description,
          countInStock: res?.data?.countInStock,
          image: res?.data?.image,
          rating: res?.data?.rating,
          type: res?.data?.type,
        });
        setIsLoadingUpdate(false);
      }
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
      message.error("Không thể lấy chi tiết sản phẩm. Vui lòng thử lại.");
    }
  };

  const { data, isLoading, isSuccess, isError } = mutation;
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
  const {
    data: dataDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const { isLoading: isLoadingProduct, data: products } = queryProduct;

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      FetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  const handelDetailProduct = () => {
    setIsOpenDrawer(true);
  };
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, data, isError]);

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
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDeletedMany, dataDeletedMany, isErrorDeletedMany]);
  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Loại",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      filters: [
        {
          text: "len",
          value: "len",
        },
        {
          text: "trang trí",
          value: "trangtri",
        },
        {
          text: "sản phẩm",
          value: "sanpham",
        },
        {
          text: "dụng cụ",
          value: "dungcu",
        },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 500000",
          value: ">=",
        },
        {
          text: "<= 500000",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 500000;
        }
        return record.price <= 500000;
      },
    },
    {
      title: "Tồn kho",
      dataIndex: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.countInStock >= 50;
        }
        return record.countInStock <= 50;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 5",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 3;
        }
        return record.rating <= 5;
      },
    },
    {
      title: "Lệnh",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });
  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
    handleCancel()
    console.log("Success:", stateProduct);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      countInStock: "",
      image: "",
      rating: "",
      type: "",
    });
    form.resetFields();
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      description: "",
      countInStock: "",
      image: "",
      rating: "",
      type: "",
    });
    setStateProduct({
      name: "",
      price: "",
      description: "",
      countInStock: "",
      image: "",
      rating: "",
      type: "",
    });
    form.resetFields();
  };
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
    console.log("e.target.value", e.target.name, e.target.value);
  };
  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
    console.log("e.target.value", e.target.name, e.target.value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const onDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleDeleteManyProducts = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const onUpdateProduct = () => {
    setIsLoadingUpdate(true);
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateProductDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    handleCloseDrawer()
  };
  return (
    <div>
      <WrapperHeader>Quản Lý Sản Phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          tableRef={tableRef}
          nameTable="Product"
          handleDeleteMany={handleDeleteManyProducts}
          columns={columns}
          isLoading={isLoadingProduct}
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
      <ModalComponent
        forceRender
        title="Tạo Sản Phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {/* <Loading isLoading={isLoading}> */}
        <Form
          name="creatForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
          initialValues={stateProduct}
        >
          <Form.Item
            label="Tên SP:"
            name="name"
            rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Loại"
            name="type"
            rules={[{ required: true, message: "Nhập loại sản phẩm!" }]}
          >
            <InputComponent
              value={stateProduct.type}
              onChange={handleOnchange}
              name="type"
            />
          </Form.Item>

          <Form.Item
            label="Tồn kho"
            name="countInStock"
            rules={[{ required: true, message: "Nhập số lượng trong kho!" }]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnchange}
              name="countInStock"
            />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Nhập giá!" }]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnchange}
              name="price"
            />
          </Form.Item>

          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[{ required: true, message: "Nhập đánh giá!" }]}
          >
            <InputComponent
              value={stateProduct.rating}
              onChange={handleOnchange}
              name="rating"
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Nhập mô tả!" }]}
          >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnchange}
              name="description"
            />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="image"
            rules={[{ required: true, message: "Thêm ảnh!" }]}
          >
            <WrapperUploadFile
              onChange={handleOnchangeAvatar}
              maxCount={1}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}> Select file</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* </Loading> */}
      </ModalComponent>
      <DrawerComponent
        title="chi tiết sản phẩm"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width={"50%"}
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            name="detailForm"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
            initialValues={stateProductDetails}
          >
            <Form.Item
              label="Tên SP:"
              name="name"
              rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
            >
              <InputComponent
                value={stateProductDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại"
              name="type"
              rules={[{ required: true, message: "Nhập loại sản phẩm!" }]}
            >
              <InputComponent
                value={stateProductDetails.type}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Tồn kho"
              name="countInStock"
              rules={[{ required: true, message: "Nhập số lượng trong kho!" }]}
            >
              <InputComponent
                value={stateProductDetails.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Nhập giá!" }]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Đánh giá"
              name="rating"
              rules={[{ required: true, message: "Nhập đánh giá!" }]}
            >
              <InputComponent
                value={stateProductDetails.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Nhập mô tả!" }]}
            >
              <InputComponent
                value={stateProductDetails.description}
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="image"
              rules={[{ required: true, message: "Thêm ảnh!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}> Select file</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
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
        onOk={onDeleteProduct}
      >
        <div>Bạn có chắc muốn xóa sản phẩm này không</div>
      </ModalComponent>
    </div>
  );
};
export default AdminProduct;
