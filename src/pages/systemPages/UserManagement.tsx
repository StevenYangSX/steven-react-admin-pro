import {
  getSystemAdminUserListApi,
  deleteSystemUserApi,
  updateSystemUserApi,
} from "@/api/systemUser";
import { getSystemRolesApi } from "@/api/systemRole";
import { addSystemUserApi } from "@/api/systemUser";
import { useState, useEffect } from "react";
import {
  Select,
  Spin,
  Button,
  Divider,
  Table,
  Space,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Tag,
  TableProps,
  message,
  SelectProps,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { SystemAdminUserDataType, SystemRoleListResponseType } from "@/types/systemDataTypes";
import { AddSystemUserRequestType, UpdateSystemUserRequestType } from "@/types/requestDataTypes";
const UserManagement = () => {
  const columns: TableProps<SystemAdminUserDataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      render: (text: number) => <a>{text}</a>,
      align: "center",
      width: "150px",
    },
    {
      title: "Nick Name",
      dataIndex: "nickname",
      key: "nickname",
      align: "center",
    },
    {
      title: "Account",
      dataIndex: "username",
      key: "username",
      align: "center",
      width: "150px",
    },

    {
      align: "center",
      title: "User's Role",
      key: "authorities",
      dataIndex: "authorities",
      render: (_, { authorities }) => (
        <>
          {authorities?.map((authority) => {
            return (
              <Tag color="geekblue" key={authority.authority}>
                {authority.authority.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      align: "center",
      title: "Action",
      key: "action",
      render: (_: any, record: SystemAdminUserDataType) => (
        <Space size="middle">
          <Button onClick={() => modifyUserButtonClicked(record)}>Modify</Button>
          <Button danger onClick={() => deleteRoleButtonClicked(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [messageApi, messageContextHolder] = message.useMessage();
  const [pageLoading, setPageLoading] = useState(false);
  const [userTableData, setUserTableData] = useState<SystemAdminUserDataType[]>([]);
  const [userFormModalOpen, setUserFormModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<SelectProps["options"]>([]);
  const [modal, confirmModalContextHolder] = Modal.useModal();
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const [modifyUserId, setModifyUserId] = useState<number>();

  const [modalFormUsage, setModalFormUsage] = useState<ModalFormUsageType>("ADD");
  type ModalFormUsageType = "ADD" | "MODIFY";
  const formInitialValues = {
    username: undefined,
    password: undefined,
    passwordConfirmed: undefined,
    nickname: undefined,
    userRole: undefined,
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    setPageLoading(true);
    try {
      if (modalFormUsage === "ADD") {
        const response = await addSystemUserApi(formValues as AddSystemUserRequestType);
        messageApi.success(response.message);
      }
      if (modalFormUsage === "MODIFY") {
        const response = await updateSystemUserApi({
          ...formValues,
          userId: modifyUserId,
        } as UpdateSystemUserRequestType);
        messageApi.success(response.message);
      }

      setUserFormModalOpen(false);
      fetchAdminUserList();
      form.resetFields();
    } catch (error: any) {
      messageApi.error(error.message);
    } finally {
      setConfirmLoading(false);
      setPageLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setUserFormModalOpen(false);
  };

  useEffect(() => {
    fetchAdminUserList();
    fetchSystemRolesList();
  }, []);

  useEffect(() => {
    form
      .validateFields()
      .then(() => {
        setSubmittable(true);
      })
      .catch(() => {
        setSubmittable(false);
      });
  }, [form, formValues]);

  /**
   * @param {SystemRoleTableType} currentUser A user to be modified
   */
  const modifyUserButtonClicked = (currentUser: SystemAdminUserDataType) => {
    // Open Modal With MODIFY Flag
    setModalFormUsage("MODIFY");
    setUserFormModalOpen(true);
    // Record Modiried User ID
    setModifyUserId(currentUser.userId);

    //Get roleIds from role Select component selectOptions
    let userRole: number[] = [];
    const authorityArray: string[] = [];
    currentUser.authorities?.map((item) => {
      authorityArray.push(item.authority);
    });
    selectOptions?.map((item) => {
      if (authorityArray.includes(item.label as string)) {
        userRole.push(item.value as number);
      }
    });

    //Set form data
    form.setFieldsValue({
      username: currentUser.username,
      password: undefined,
      passwordConfirmed: undefined,
      nickname: currentUser.nickname,
      userRole,
    });
  };

  /**
   *
   * @param {SystemRoleTableType} currentUser a user to be deleted
   */
  const deleteRoleButtonClicked = (currentUser: SystemAdminUserDataType) => {
    modal.confirm({
      title: "Confirm to delete",
      content: `Are you sure to delete role : ${currentUser.username} ? Deleted data cannot be recovered.`,
      onOk: async () => {
        try {
          const response = await deleteSystemUserApi({ userId: currentUser.userId });
          messageApi.success(response.message);
        } catch (error: any) {
          message.error(error.message);
        } finally {
          fetchAdminUserList();
        }
      },
    });
  };

  /**
   * Fetch System Role data
   */
  const fetchSystemRolesList = async () => {
    try {
      const response = await getSystemRolesApi();
      setSelectOptions(roleSelectionDataConverter(response.data));
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  function roleSelectionDataConverter(
    roleList: SystemRoleListResponseType[]
  ): SelectProps["options"] {
    let selectionArray: SelectProps["options"] = [];
    roleList.map((item) => {
      selectionArray?.push({ label: item.authority, value: item.roleId });
    });
    return selectionArray;
  }

  const fetchAdminUserList = async () => {
    try {
      const response = await getSystemAdminUserListApi();
      //Add key
      response.data.map((ele) => {
        ele.key = ele.userId;
      });
      setUserTableData(response.data);
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  const openUserFormModal = () => {
    setModalFormUsage("ADD");
    setUserFormModalOpen(true);
  };

  // const handleSelectionChange = (value: string[]) => {
  //   console.log(`selected ${value}`);
  // };

  // Custom validation function for confirming password
  const validatePasswordConfirmation = async (_: any, value: string) => {
    const password = form.getFieldValue("password");
    if (value && value !== password) {
      throw new Error("The two passwords that you entered do not match!");
    }
  };

  return (
    <>
      <Spin spinning={pageLoading} fullscreen={true} />
      {messageContextHolder}
      {confirmModalContextHolder}
      <Modal
        forceRender
        title="Title"
        open={userFormModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !submittable }}
      >
        <Form
          form={form}
          name="systemUserForm"
          layout="horizontal"
          autoComplete="off"
          style={{ marginTop: "26px" }}
          labelCol={{ flex: "140px" }}
          labelAlign="left"
          labelWrap
          initialValues={formInitialValues}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name="username"
                label="User Account"
                rules={[{ required: true, message: "Please input user login account!" }]}
              >
                <Input placeholder="Account used to login in the system" allowClear />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name="password"
                label="User Password"
                rules={[{ required: true, message: "Please input user password!" }]}
              >
                <Input.Password
                  allowClear
                  placeholder="Password to login in the system"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name="passwordConfirmed"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please input user password!" },
                  { validator: validatePasswordConfirmation },
                ]}
              >
                <Input.Password
                  allowClear
                  placeholder="Password to login in the system"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name="nickname"
                label="User Name"
                rules={[{ required: true, message: "Please input user's nickname" }]}
              >
                <Input placeholder="System user's nickname" allowClear />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name="userRole"
                label="User Role"
                rules={[{ required: true, message: "Please select user's role" }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select user's role"
                  // onChange={handleSelectionChange}
                  options={selectOptions}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button type="primary" onClick={openUserFormModal}>
        Add Admim User
      </Button>
      <Divider></Divider>
      <Table columns={columns} dataSource={userTableData} bordered={true} />
    </>
  );
};

export default UserManagement;
