import React, { useState } from "react";
import Loading from "../LoadingComponent/LoadingComponent";
import { Table } from "antd";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DeleteButton, ExportButton } from "./style";
import ModalComponent from "../ModalComponent/ModalComponent";

const TableComponent = (props) => {
  const [rowSelectedKeys, setRowSelectedKey] = useState([]);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
    tableRef, nameTable
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKey(selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
    },
  };

  const handleDeleteAll = async () => {
    try {
      await handleDeleteMany(rowSelectedKeys);
      // Reset trạng thái và chọn lại các mục sau khi xóa
      setRowSelectedKey([]); // Reset selected keys
    } catch (error) {
      console.error('Error deleting items:', error);
      // Thêm thông báo lỗi nếu cần
    } finally {
      setIsModalOpenDelete(false);
    }
  };

  if (!Array.isArray(data)) {
    console.error('Expected data to be an array but got:', data);
    return null; // hoặc trả về một UI fallback phù hợp
  }

  return (
    <Loading isLoading={isLoading}>
      <DownloadTableExcel
        filename={nameTable}
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <ExportButton> Export excel <br/></ExportButton>
      </DownloadTableExcel>

      {rowSelectedKeys.length > 0 && (
        <DeleteButton
          onClick={() => setIsModalOpenDelete(true)}
        >
          Xóa mục đã chọn
        </DeleteButton>
      )}
      
      <ModalComponent
        title="Xóa Sản Phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteAll}
      >
        <div>Bạn có chắc muốn xóa các mục này không</div>
      </ModalComponent>

      <table ref={tableRef} style={{ display: "none" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.key}>
              {columns.map((col) => (
                <td key={col.key}>{item[col.dataIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
