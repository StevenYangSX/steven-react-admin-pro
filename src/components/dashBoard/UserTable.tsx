// import { GetProp, TableProps,Table} from 'antd';
// import {useState,useEffect} from 'react'
// type ColumnsType<T> = TableProps<T>['columns'];
// type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
// interface DataType {
//     name: {
//       first: string;
//       last: string;
//     };
//     gender: string;
//     email: string;
//     login: {
//       uuid: string;
//     };
//   }
//   interface TableParams {
//     pagination?: TablePaginationConfig;
//     sortField?: string;
//     sortOrder?: string;
//     filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
//   }
//   const columns: ColumnsType<DataType> = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       sorter: true,
//       render: (name) => `${name.first} ${name.last}`,
//       width: '20%',
//     },
//     {
//       title: 'Gender',
//       dataIndex: 'gender',
//       filters: [
//         { text: 'Male', value: 'male' },
//         { text: 'Female', value: 'female' },
//       ],
//       width: '20%',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//     },
//   ];
//   const getRandomuserParams = (params: TableParams) => ({
//     results: params.pagination?.pageSize,
//     page: params.pagination?.current,
//     ...params,
//   });
// const UserTable = () => {
//     const [data, setData] = useState<DataType[]>();
//     const [loading, setLoading] = useState(false);
//     const [tableParams, setTableParams] = useState<TableParams>({
//       pagination: {
//         current: 1,
//         pageSize: 10,
//       },
//     });

//     const fetchData = () => {
//         setLoading(true);
//         fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
//           .then((res) => res.json())
//           .then(({ results }) => {
//             setData(results);
//             setLoading(false);
//             setTableParams({
//               ...tableParams,
//               pagination: {
//                 ...tableParams.pagination,
//                 total: 200,
//                 // 200 is mock data, you should read it from server
//                 // total: data.totalCount,
//               },
//             });
//           });
//       };

//       useEffect(() => {
//         fetchData();
//       }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

//       const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
//         setTableParams({
//           pagination,
//           filters,
//           ...sorter,
//         });

//         // `dataSource` is useless since `pageSize` changed
//         if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//           setData([]);
//         }
//       };
//   return (
//     <div>
//          <Table
//       columns={columns}
//       rowKey={(record) => record.login.uuid}
//       dataSource={data}
//       pagination={tableParams.pagination}
//       loading={loading}
//       onChange={handleTableChange}
//     />
//     </div>
//   )
// }

// export default UserTable
