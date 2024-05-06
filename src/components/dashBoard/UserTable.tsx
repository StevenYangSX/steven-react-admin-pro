import { TableProps, Table, message, Tag, Rate } from "antd";
import { useState, useEffect } from "react";
import { getCustomerListApi } from "@/api/Customer";
import { PageableRequestType } from "@/types/requestDataTypes";
import { SystemCustomerType } from "@/types/systemDataTypes";
import Setting from "@/setting";
import { MoneyCollectFilled } from "@ant-design/icons";
import { SorterResult } from "antd/lib/table/interface";
type ColumnsType<T> = TableProps<T>["columns"];

const columns: ColumnsType<SystemCustomerType> = [
  {
    title: "User ID",
    dataIndex: "userId",
    width: 100,
    align: "center",
    fixed: "left",
    sorter: {
      compare: (a, b) => a.userId - b.userId,
      multiple: 3,
    },
  },
  {
    title: "Customer Name",
    dataIndex: ["firstName", "lastName"],
    sorter: {
      compare: (a, b) => a.firstName.localeCompare(b.firstName),
      multiple: 2,
    },
    render: (_, record) => {
      return record.firstName + ` ` + record.lastName;
    },

    width: "20%",
    align: "center",
    fixed: "left",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "25%",
    align: "center",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: "25%",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "userStatus",
    width: "25%",
    align: "center",
    render: (_, record) => {
      return record.userStatus ? (
        <Tag color="success">Acitve</Tag>
      ) : (
        <Tag color="error">Inactive</Tag>
      );
    },
  },
  {
    title: "Membership",
    dataIndex: "membershipStatus",
    width: "25%",
    align: "center",
    render: (_, record) => {
      return record.membershipStatus ? <Tag color="success">YES</Tag> : <Tag color="error">NO</Tag>;
    },
  },
  {
    title: "Membership Level",
    dataIndex: "membershipLevel",
    width: "25%",
    align: "center",
    render: (_, record) => {
      return <Rate disabled defaultValue={record.membershipLevel} />;
    },
  },
  {
    title: "Current Balance",
    dataIndex: "remainingMoney",
    width: "25%",
    align: "center",
    fixed: "right",
    render: (_, record) => {
      return (
        <Tag icon={<MoneyCollectFilled />} color="default">
          {record.remainingMoney}
        </Tag>
      );
    },
    sorter: {
      compare: (a, b) => a.remainingMoney - b.remainingMoney,
      multiple: 1,
    },
  },
];

const UserTable = () => {
  const [data, setData] = useState<SystemCustomerType[]>();
  const [loading, setLoading] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  const [pageableParams, setPageableParams] = useState<PageableRequestType>({
    current: 1,
    pageSize: Setting.defaultPageSize,
    sort: undefined,
  });

  const fetchData = () => {
    setLoading(true);
    getCustomerListApi(pageableParams)
      .then((res) => {
        setData(res.data?.content);
        setLoading(false);
        setPageableParams({
          ...pageableParams,
          total: res.data.totalElements,
        });
      })
      .catch((error) => {
        messageApi.error(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [pageableParams.current, pageableParams.pageSize]);

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    _filters,
    sorter: SorterResult<SystemCustomerType> | SorterResult<SystemCustomerType>[]
  ) => {
    console.log("sorted...", sorter);
    setPageableParams({
      ...pageableParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
      sort: sorter,
    });
    // setTableParams({
    //   pagination,
    //   filters,
    //   ...sorter,
    // });

    if (pagination.pageSize !== pageableParams.pageSize) {
      setData([]);
    }
  };
  return (
    <div>
      {messageContextHolder}
      <Table
        columns={columns}
        rowKey={(record) => record.userId}
        dataSource={data}
        pagination={pageableParams}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1500, y: 640 }}
      />
    </div>
  );
};

export default UserTable;
