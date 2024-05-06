import { GetProp, TableProps, Table, message, Tag, Rate } from "antd";
import { useState, useEffect } from "react";
import { getCustomerListApi } from "@/api/Customer";
import { PageableRequestType } from "@/types/requestDataTypes";
import { SystemCustomerType } from "@/types/systemDataTypes";
import Setting from "@/setting";
import { MoneyCollectFilled } from "@ant-design/icons";
type ColumnsType<T> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<GetProp<TableProps, "pagination">, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
const columns: ColumnsType<SystemCustomerType> = [
  {
    title: "User ID",
    dataIndex: "userId",
    width: 80,
    align: "center",
    fixed: "left",
  },
  {
    title: "Customer Name",
    dataIndex: ["firstName", "lastName"],
    sorter: true,
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
  },
];

const UserTable = () => {
  const [data, setData] = useState<SystemCustomerType[]>();
  const [loading, setLoading] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  const [pageableParams, setPageableParams] = useState<PageableRequestType>({
    current: 1,
    pageSize: Setting.defaultPageSize,
  });

  const fetchData = () => {
    setLoading(true);
    getCustomerListApi(pageableParams)
      .then((res) => {
        setData(res.data.content);
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

  const handleTableChange: TableProps["onChange"] = (pagination, _filters, _sorter) => {
    setPageableParams(pagination);
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
