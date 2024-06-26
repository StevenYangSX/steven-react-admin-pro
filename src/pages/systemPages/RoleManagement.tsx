import React, { useEffect, useState } from "react";
import {
  getSystemRolesApi,
  addSystemRoleApi,
  deleteSystemRoleApi,
  modifySystemRoleApi,
} from "@/api/systemRole";
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
import { AddSystemRoleRequestType, ModifySystemRoleRequestType } from "@/types/requestDataTypes";

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
      render: (_: any, record: SystemRoleTableType) => (
        <Space size="middle">
          <Button onClick={() => modifyRoleButtonClicked(record)}>Modify</Button>
          <Button danger onClick={() => deleteRoleButtonClicked(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  /*
   * Data Definition Area
   */
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [roleTableData, setRoleTableData] = useState<SystemRoleTableType[]>([]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [roleFormModalOpen, setRoleFormModalOpen] = useState(false);
  const [form] = Form.useForm();
  const watchFormFieldRoleName = Form.useWatch("roleName", form);
  const watchFormFieldAccess = Form.useWatch("access", form);
  const dispatch = useAppDispatch();
  const menuList = useAppSelector((state) => state.userInfoReducer.menuList);
  const menuListHttpStatus = useAppSelector((state) => state.userInfoReducer.httpStatus);
  const initialRoleFormData = { roleNmae: undefined, access: [1] };
  const [modal, confirmModalContextHolder] = Modal.useModal();
  const [modifyRoleId, setModifyRoleId] = useState<number>();
  const [modalFormUsage, setModalFormUsage] = useState<ModalFormUsageType>("ADD");
  type ModalFormUsageType = "ADD" | "MODIFY";
  /*
   * Function Definition Area
   */

  /**
   *
   * @param {SystemRoleTableType} role a role to be deleted
   */
  const deleteRoleButtonClicked = (role: SystemRoleTableType) => {
    modal.confirm({
      title: "Confirm to delete",
      content: `Are you sure to delete role : ${role.roleName} ? Deleted data cannot be recovered.`,
      onOk: async () => {
        try {
          const response = await deleteSystemRoleApi({ roleId: role.roleId });
          messageApi.success(response.message);
        } catch (error: any) {
          message.error(error.message);
        } finally {
          fetchSystemRolesList();
        }
      },
    });
  };

  /**
   *
   * @param {SystemRoleTableType} role A role to be modified
   */
  const modifyRoleButtonClicked = (role: SystemRoleTableType) => {
    // Open Modal With MODIFY Flag
    setModalFormUsage("MODIFY");
    setRoleFormModalOpen(true);
    // Record Modiried Role ID
    setModifyRoleId(role.roleId);

    /*
    This part is to solve "checked value" & "halfChecked value" problem in
    tree selection component.
    Need to find all "half-checked" menuIds. Remove them from checkedKyes array.
    */
    let test: number[] = [];
    role.menus.map((ele) => {
      if (ele.parentId === 0) {
        test.push(ele.menuId ?? 0);
      } else {
        test.push(ele.menuId ?? 0);
        let indexToDetele = test.indexOf(ele.parentId);
        if (indexToDetele !== -1) {
          test.splice(indexToDetele, 1);
        }
      }
    });
    setCheckedKeys(test);

    // But our backend still need those "half-checked" menuId, since we must have
    // the first-level (half-checked) menuIds.
    const selectedData = role.menus.map((ele) => ele.menuId) as React.Key[];
    form.setFieldValue("access", selectedData);

    form.setFieldValue("roleName", role.roleName);
  };

  /**
   * Fetch System Role data
   */
  const fetchSystemRolesList = async () => {
    setPageLoading(true);
    try {
      const response = await getSystemRolesApi();
      setRoleTableData(roleTableDataConverter(response.data));
      // messageApi.success(response.message);
    } catch (error: any) {
      messageApi.error(error.message);
    } finally {
      setPageLoading(false);
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
        key: item.roleId,
        roleId: item.roleId,
        roleName: item.authority,
        menus: item.menus,
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
      disabled: item.menuName === "Home",
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
      setCheckedKeys([1]);
    }
  }, [menuList, menuListHttpStatus]);

  useEffect(() => {
    form
      .validateFields()
      .then(() => {
        setSubmittable(true);
      })
      .catch(() => {
        setSubmittable(false);
      });
  }, [form, watchFormFieldRoleName, watchFormFieldAccess]);
  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue, e) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
    const checked = checkedKeysValue as number[];
    const halfChecked = e.halfCheckedKeys as number[];
    const allCheckedMenuIds = [...checked, ...halfChecked];
    form.setFieldValue("access", allCheckedMenuIds);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue) => {
    setSelectedKeys(selectedKeysValue);
  };

  const openRoleFormModal = () => {
    setModalFormUsage("ADD");
    setRoleFormModalOpen(true);
  };

  const addSystemRole = async (payload: AddSystemRoleRequestType) => {
    setConfirmLoading(true);
    try {
      const response = await addSystemRoleApi(payload);
      messageApi.success(response.message);
      setRoleFormModalOpen(false);
      fetchSystemRolesList();
    } catch (error: any) {
      messageApi.error(error.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const modifySystemRole = async (payload: ModifySystemRoleRequestType) => {
    setConfirmLoading(true);
    try {
      const response = await modifySystemRoleApi(payload);
      messageApi.success(response.message);
      setRoleFormModalOpen(false);
      fetchSystemRolesList();
    } catch (error: any) {
      messageApi.error(error.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleOk = () => {
    if (modalFormUsage === "ADD") {
      addSystemRole(form.getFieldsValue());
      return;
    }
    if (modalFormUsage === "MODIFY") {
      modifySystemRole({ ...form.getFieldsValue(), roleId: modifyRoleId });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCheckedKeys([1]);
    setRoleFormModalOpen(false);
  };

  return (
    <>
      <Spin spinning={pageLoading} fullscreen={true} />
      {messageContextHolder}
      {confirmModalContextHolder}
      <Button type="primary" onClick={openRoleFormModal}>
        Add Role
      </Button>
      <Divider></Divider>
      <Table columns={columns} dataSource={roleTableData} bordered={true} />
      <Modal
        forceRender
        title={modalFormUsage + " System Role"}
        open={roleFormModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okButtonProps={{ disabled: !submittable }}
      >
        <Form
          form={form}
          name="systemRoleForm"
          layout="horizontal"
          autoComplete="off"
          style={{ marginTop: "26px" }}
          initialValues={initialRoleFormData}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name="roleName"
                label="Role Name"
                rules={[{ required: true, message: "Please input role name!" }]}
              >
                <Input placeholder="Displaying label of the menu item" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name="access"
                label="Role Access"
                rules={[{ required: true, message: "Please check role's permitted pages." }]}
              >
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
