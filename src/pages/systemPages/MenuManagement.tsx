import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  Col,
  Row,
  Select,
  InputNumber,
  message,
  Radio,
  Spin,
} from "antd";
import type { TableProps, FormInstance, RadioChangeEvent } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { SystemMenuItem } from "@/types/systemDataTypes";
import { addMenuItemApi, deleteMenuByIdApi, modifyMenuItemApi } from "@/api/systemMenu";
import { AddOrModifySystemMenuItemRequestType } from "@/types/requestDataTypes";
import {
  fetchSystemMenuList,
  fetchUserAccessList,
  selectMenuById,
} from "@/store/slices/userInfoSlice";
import IconSelectionModal from "@/components/iconSelectionModal/IconSelectionModal";
import { SearchProps } from "antd/es/input/Search";
import { store, RootState } from "@/store"; // Import your RootState type

const MenuManagement = () => {
  const { Search } = Input;
  const [messageApi, messageContextHolder] = message.useMessage();
  const [pageLoading, setPageLoading] = useState(false);
  const [parentIdSelectionDisabled, setParentIdSelectionDisabled] = useState(false);
  const [submitType, setSubmitType] = useState(0); // 0 for add, 1 for modify
  const [modifyMenuId, setModifyMenuId] = useState<undefined | number>(undefined);
  const dispatch = useAppDispatch();
  const deleteMenuById = async (menuId: number | undefined) => {
    if (!pageLoading) {
      if (menuId) {
        setPageLoading(true);
        try {
          const response = await deleteMenuByIdApi({ menuId });
          messageApi.success(response.message);
        } catch (error: any) {
          messageApi.error(error.message);
        } finally {
          setPageLoading(false);
          dispatch(fetchSystemMenuList());
        }
      }
    }
  };
  const columns: TableProps<SystemMenuItem>["columns"] = [
    {
      title: "ID",
      dataIndex: "menuId",
      key: "menuId",
      render: (text) => <a>{text}</a>,
      align: "center",
    },
    {
      title: "Menu Name",
      dataIndex: "menuName",
      key: "menuName",
      align: "center",
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      align: "center",
    },
    {
      align: "center",
      title: "Authentication Tag",
      key: "uniqAuth",
      dataIndex: "uniqAuth",
      render: (_, { uniqAuth }) => (
        <>
          <Tag color="geekblue" key={uniqAuth}>
            {uniqAuth.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      align: "center",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.parentId === 0 ? (
            <div>
              <Button type="primary" onClick={() => addSubmenuClickHandler(record.menuId)}>
                Add Submenu
              </Button>
            </div>
          ) : (
            <></>
          )}

          <Button onClick={() => modifyMenuItem(record.menuId)}>Modify</Button>

          <Button onClick={() => deleteMenuById(record.menuId)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  type ModalFormUsage = "ADD-FIRST-LEVEL" | "ADD-SECOND-LEVEL" | "MODIFY";

  const addSubmenuClickHandler = (menuId: number | undefined) => {
    showAddMenuModal(menuId, "ADD-SECOND-LEVEL");
  };

  const modifyMenuItem = (menuId: number | undefined) => {
    if (menuId) {
      // Access the current state from the Redux store
      const state: RootState = store.getState();
      // Use the custom selector function to get the menu item by menuId
      const selectedMenuItem = selectMenuById(state, menuId);
      showAddMenuModal(menuId, "MODIFY", selectedMenuItem);
    }
  };

  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children,
  }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        onClick={() => handleOk(values)}
        loading={confirmLoading}
      >
        {children}
      </Button>
    );
  };

  const formInitialValues = {
    menuNameL: "",
    path: "",
    menuType: 0,
    uniqAuth: "",
    parendId: undefined,
    icon: "",
    sort: undefined,
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const menuData = useAppSelector((state) => state.userInfoReducer.menuList);
  const userStateError = useAppSelector((state) => state.userInfoReducer.error);
  const iconName = useAppSelector((state) => state.iconSelectioReducer.iconName);
  // for not showing the type error
  let data = undefined;
  if (menuData) {
    data = menuData;
  }
  const options = menuData?.map((item) => ({
    value: item.menuId, // Map the name property to value
    label: item.menuName, // Map the name property to label
  }));
  options?.unshift({ value: 0, label: "First Level Menu" });

  useEffect(() => {
    dispatch(fetchSystemMenuList());
    if (userStateError) {
      messageApi.error(userStateError.message);
    }
  }, []);

  type ModalFormParentIdField = number | undefined;
  /**
   * Show a modal that contains menu form
   *
   * @param {ModalFormParentIdField} menuId : The passed in menuId
   * @param {ModalFormUsage} modalUsage: the usage of this shoing modal:for modify, add first level, or add sencod level
   */
  const showAddMenuModal = (
    menuId: ModalFormParentIdField = undefined,
    modalUsage: ModalFormUsage,
    selectedMenuItem: object | undefined = undefined
  ) => {
    setOpen(true);
    switch (modalUsage) {
      case "ADD-FIRST-LEVEL":
        setSubmitType(0);
        setModifyMenuId(undefined);
        setParentIdSelectionDisabled(false);
        form.setFieldValue("parentId", menuId);
        return;
      case "ADD-SECOND-LEVEL":
        setSubmitType(0);
        setModifyMenuId(undefined);
        setParentIdSelectionDisabled(true);
        form.setFieldValue("parentId", menuId);
        return;
      case "MODIFY":
        setSubmitType(1);
        setModifyMenuId(menuId);
        setParentIdSelectionDisabled(false);
        fillFormData(selectedMenuItem);
        return;
    }
  };

  const fillFormData = (selectedMenuItem: any) => {
    form.setFieldsValue({
      menuName: selectedMenuItem.menuName,
      path: selectedMenuItem.path,
      uniqAuth: selectedMenuItem.uniqAuth,
      parentId: selectedMenuItem.parentId,
      icon: selectedMenuItem.icon,
      sort: selectedMenuItem.sort,
      menuType: selectedMenuItem.menuType,
    });
  };

  const handleOk = async (values: AddOrModifySystemMenuItemRequestType) => {
    setConfirmLoading(true);
    try {
      //   submitType === 0 : add new data
      if (submitType === 0) {
        const response = await addMenuItemApi(values);
        messageApi.success(response.message);
      } else {
        //   submitType === 1 : modify existed data
        let payload: AddOrModifySystemMenuItemRequestType = { ...values, menuId: modifyMenuId };
        const response = await modifyMenuItemApi(payload);
        messageApi.success(response.message);
      }
    } catch (error: any) {
      messageApi.error(error.message);
    } finally {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(fetchSystemMenuList());
      dispatch(fetchUserAccessList(0));
      form.resetFields();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  interface SubmitButtonProps {
    form: FormInstance;
  }

  const [menuTypeRadiovValue, setMenuTypeRadiovValue] = useState(0);

  const onRadioChange = (e: RadioChangeEvent) => {
    setMenuTypeRadiovValue(e.target.value);
  };

  const [form] = Form.useForm();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    if (info?.source !== "clear") {
      setIconModalShow(true);
    }
  };

  const [iconModalShow, setIconModalShow] = useState(false);

  // Define the type for the callback function prop
  type OnChildDataChange = (data: boolean) => void;

  // Define the callback function to handle data from the child component
  const handleModalShowChange: OnChildDataChange = (data) => {
    setIconModalShow(data);
  };

  useEffect(() => {
    form.setFieldValue("icon", iconName);
  }, [iconName]);

  return (
    <div>
      <Spin spinning={pageLoading} fullscreen={true} />
      {messageContextHolder}
      <IconSelectionModal onModalShowChange={handleModalShowChange} iconModalShow={iconModalShow} />
      <Modal
        forceRender
        title="Add Menu Item"
        open={open}
        width="55vw"
        onCancel={handleCancel}
        footer={(_, e) => (
          <>
            <Form.Item>
              <Space>
                <SubmitButton form={form}>Submit</SubmitButton>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Reset
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </>
        )}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          style={{ marginTop: "26px" }}
          initialValues={formInitialValues}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item name="menuName" label="Menu Label" rules={[{ required: true }]}>
                <Input placeholder="Displaying label of the menu item" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="path" label="Route Path" rules={[{ required: true }]}>
                <Input placeholder="Route path of the menu item" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item name="uniqAuth" label="Authentication Tag" rules={[{ required: true }]}>
                <Input placeholder="Authentication tag" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="parentId" label="Parent Level" rules={[{ required: true }]}>
                <Select
                  options={options}
                  disabled={parentIdSelectionDisabled}
                  placeholder="Parent Level Menu"
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item name="icon" label="Menu Icon">
                <Search
                  placeholder="Displaying icon of the menu item"
                  allowClear
                  onSearch={onSearch}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sort" label="Menu Sort" rules={[{ required: true }]}>
                {/* <Input placeholder="Order of the menu item. More means upper" type="number" /> */}
                <InputNumber
                  min={1}
                  max={1000}
                  placeholder="Order of the menu item. More means upper"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item name="menuType" label="Item Type" rules={[{ required: true }]}>
                <Radio.Group onChange={onRadioChange} value={menuTypeRadiovValue}>
                  <Radio value={0}>Menu</Radio>
                  <Radio value={1}>API</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button onClick={() => showAddMenuModal(0, "ADD-FIRST-LEVEL")} type="primary">
        Add Menu Item
      </Button>
      <Divider></Divider>
      <Table columns={columns} dataSource={data} bordered={true} />
    </div>
  );
};

export default MenuManagement;
