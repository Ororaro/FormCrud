import React, { useEffect, useState } from "react";
import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../store/cart-slice";
import { Checkbox } from "antd";

interface User {
  id: string;
  data: {
    firstname: string;
    lastname: string;
    gender: string;
    phonelang: string;
    phone: string;
    nationality: string;
  };
}
const TableComponent = () => {
  const dispatch = useDispatch();
  const userList = useSelector(
    (state: RootState) => state.counter.users
  ) as unknown as User[];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [checkSelectAll, setCheckSelectAll] = useState<boolean>(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectAllRows = (checked: boolean) => {
    const allRowKeys = userList.map((user: any) => user.id);
    setSelectedRowKeys(checked ? allRowKeys : []);
    setCheckSelectAll(checked);
  };

  const onDelete = () => {
    dispatch(deleteUser(selectedRowKeys));
    setSelectedRowKeys([]);
    setCheckSelectAll(false);
  };

  const data = [];
  for (let i = 0; i < userList.length; i++) {
    data.push({
      key: userList[i].id,
      name: (
        <Typography>
          {userList[i]?.data?.firstname} {userList[i]?.data?.lastname}
        </Typography>
      ),
      gender: <Typography>{userList[i]?.data?.gender}</Typography>,
      phone: (
        <Typography>
          {userList[i]?.data?.phonelang}
          {userList[i]?.data?.phone}
        </Typography>
      ),
      nationality: <Typography>{userList[i]?.data?.nationality} </Typography>,
      id: userList[i].id,
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a?.name?.localeCompare(b?.name),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a: any, b: any) => a?.gender?.localeCompare(b?.gender),
    },
    {
      title: "Mobile Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a: any, b: any) => a?.phone?.localeCompare(b?.phone),
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a: any, b: any) => a?.nationality?.localeCompare(b?.nationality),
    },
    {
      title: "Manage",
      dataIndex: "",
      key: "x",
      render: (_: any, record: { id: any }) => (
        <Space size="middle">
          <a onClick={() => dispatch(updateUser(record?.id))}>Edit</a>
          <a onClick={() => dispatch(deleteUser(record?.id))}>Delete</a>
        </Space>
      ),
    },
  ];

  const paginationConfig = {
      next_page: "Next",
      prev_page: "Prev",
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ padding: "2rem 0" }}>
        <Checkbox
          onChange={(e) => selectAllRows(e.target.checked)}
          checked={checkSelectAll}
        >
          Select All
        </Checkbox>
        <Button htmlType="button" onClick={onDelete}>
          Delete
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["topRight"],
          locale:paginationConfig
        }}
      />
    </div>
  );
};

export default TableComponent;
