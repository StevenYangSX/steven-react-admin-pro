import React, { useEffect, useState } from "react";
import { getSystemRolesApi } from "@/api/systemRole";
import { message } from "antd";
import { Tree, Spin, Button, Divider, Table, Space, Modal, Input, Form, Row, Col } from "antd";
import type { TableProps, TreeDataNode, TreeProps } from "antd";
import {
  SystemMenuItem,
  SystemRoleListResponseType,
  SystemRoleTableType,
} from "@/types/systemDataTypes";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchSystemMenuList } from "@/store/slices/userInfoSlice";
import { HttpStatus } from "@/types/systemStateTypes";

const RoleManagement = () => {
  const columns: TableProps<SystemRoleTableType>["columns"] = [
    {
      title: "ID",
      dataIndex: "roleId",
      key: "roleId",
      render: (text: number) => <a>{text}</a>,
      align: "center",
      width: "150px",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
      width: "150px",
    },
    {
      title: "Access",
      dataIndex: "access",
      key: "access",
      align: "center",
    },
    {
      align: "center",
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button>Modify</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  /*
   * Data Definition Area
   */
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [roleTableData, setRoleTableData] = useState<SystemRoleTableType[]>([]);
  const [roleFormData, setRoleFormData] = useState<SystemRoleTableType[]>([]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [roleFormModalOpen, setRoleFormModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const menuList = useAppSelector((state) => state.userInfoReducer.menuList);
  const menuListHttpStatus = useAppSelector((state) => state.userInfoReducer.httpStatus);

  /*
   * Function Definition Area
   */

  /**
   * Fetch System Role data
   */
  const fetchSystemRolesList = async () => {
    try {
      const response = await getSystemRolesApi();
      console.log("check=> ", response.data);
      setRoleTableData(roleTableDataConverter(response.data));
      messageApi.success(response.message);
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  /**
   *
   * @param {SystemRoleListResponseType[]} originalData Fetched system role list from backend.
   * @returns {SystemRoleTableType[]} Modified RoleList Data for Table component usage.
   */
  const roleTableDataConverter = (originalData: SystemRoleListResponseType[]) => {
    let roleTableDataArray: SystemRoleTableType[] = [];
    originalData.map((item) => {
      roleTableDataArray.push({
        roleId: item.roleId,
        roleName: item.authority,
        access: item.menus.reduce((accumulator, currentValue, index) => {
          if (index === 0) {
            return currentValue.menuName;
          } else {
            return accumulator + " ," + currentValue.menuName;
          }
        }, ""),
      });
    });
    return roleTableDataArray;
  };

  /**
   *
   * @param {SystemMenuItem[]} menuList System menu list data
   * @returns {TreeDataNode[]} Modified data for Tree Selection component usage. Added key, title, and children properties.
   */
  function treeDataConverter(menuList: SystemMenuItem[]): TreeDataNode[] {
    return menuList.map((item) => ({
      key: item.menuId ?? 0,
      title: item.menuName,
      children: item.children ? treeDataConverter(item.children) : undefined,
    }));
  }

  useEffect(() => {
    fetchSystemRolesList();
    dispatch(fetchSystemMenuList());
  }, []);

  useEffect(() => {
    if (menuListHttpStatus === HttpStatus.Idle && menuList) {
      setTreeData(treeDataConverter(menuList));
    }
  }, [menuList, menuListHttpStatus]);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  const openRoleFormModal = () => {
    setRoleFormModalOpen(true);
  };

  const handleOk = () => {
    setRoleFormModalOpen(true);
  };

  const handleCancel = () => {
    setRoleFormModalOpen(false);
  };

  return (
    <>
      <Spin spinning={pageLoading} fullscreen={true} />
      {messageContextHolder}
      <Button type="primary" onClick={openRoleFormModal}>
        Add Role
      </Button>
      <Divider></Divider>
      <Table columns={columns} dataSource={roleTableData} bordered={true} />
      <Modal
        title="System Role Management"
        open={roleFormModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="systemRoleForm"
          layout="vertical"
          autoComplete="off"
          style={{ marginTop: "26px" }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item name="roleName" label="Role Name" rules={[{ required: true }]}>
                <Input placeholder="Displaying label of the menu item" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item name="access" label="Role Access" rules={[{ required: true }]}>
                <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default RoleManagement;
