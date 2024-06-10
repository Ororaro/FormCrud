import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../store/list-slice";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const userList = useSelector(
    (state: RootState) => state.counter.users
  ) as unknown as User[];
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [checkSelectAll, setCheckSelectAll] = useState<boolean>(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys as string[]);
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

  const data = userList.map((user) => {
    let gender: string = "";
    let nationality: string = "";
    switch (i18n.language) {
      case "en":
        if (user.data.gender === "male") gender = "Male";
        if (user.data.gender === "female") gender = "Female";
        if (user.data.gender === "unsex") gender = "Unsex";
        if (user.data.nationality === "Thai") nationality = "Thai";
        if (user.data.nationality === "French") nationality = "French";
        if (user.data.nationality === "American") nationality = "American";
        break;
      case "th":
        if (user.data.gender === "male") gender = "ผู้ชาย";
        if (user.data.gender === "female") gender = "ผู้หญิง";
        if (user.data.gender === "unsex") gender = "ไม่ระบุ";
        if (user.data.nationality === "Thai") nationality = "ไทย";
        if (user.data.nationality === "French") nationality = "ฝรั่งเศส";
        if (user.data.nationality === "American") nationality = "อเมริกัน";
        break;
      default:
        break;
    }
    return {
      key: user.id,
      name: `${user.data.firstname} ${user.data.lastname}`,
      gender: gender,
      phone: user?.data?.phonelang + user?.data?.phone,
      nationality: nationality,
      id: user.id,
    };
  });

  const columns = [
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a?.name?.localeCompare(b?.name),
    },
    {
      title: t("table.gender"),
      dataIndex: "gender",
      key: "gender",
      sorter: (a: any, b: any) => a?.gender?.localeCompare(b?.gender),
    },
    {
      title: t("table.mobile_Phone"),
      dataIndex: "phone",
      key: "phone",
      sorter: (a: any, b: any) => a?.phone?.localeCompare(b?.phone),
    },
    {
      title: t("table.nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a: any, b: any) => a?.nationality?.localeCompare(b?.nationality),
    },
    {
      title: t("table.manage"),
      dataIndex: "",
      key: "x",
      render: (_: any, record: { id: any }) => (
        <Space size="middle">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(updateUser(record?.id))}
          >
            {t("table.edit")}
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(deleteUser(record?.id), alert("Save Success"));
            }}
          >
            {t("table.delete")}
          </span>
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
          locale: paginationConfig,
        }}
      />
    </div>
  );
};

export default TableComponent;
