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
import { addMenuItemApi, deleteMenuByIdApi } from "@/api/systemMenu";
import { AddSystemMenuItemRequestType } from "@/types/requestDataTypes";
import { fetchSystemMenuList } from "@/store/slices/userInfoSlice";

const MenuManagement = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [pageLoading, setPageLoading] = useState(false);
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
    },
    {
      title: "Menu Name",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },
    {
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.parentId === 0 ? (
            <div>
              <a>Add Submenu</a>
              <Divider type="vertical" />
            </div>
          ) : (
            <></>
          )}

          <a>Modify</a>
          <Divider type="vertical" />
          <a onClick={() => deleteMenuById(record.menuId)}>Delete</a>
        </Space>
      ),
    },
  ];

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

  let data = undefined;
  const menuData = useAppSelector((state) => state.userInfoReducer.menuList);
  const options = menuData?.map((item) => ({
    value: item.menuId, // Map the name property to value
    label: item.menuName, // Map the name property to label
  }));

  if (menuData) {
    data = menuData;
  }

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showAddMenuModal = () => {
    setOpen(true);
  };

  const handleOk = async (values: AddSystemMenuItemRequestType) => {
    //Need to access state to get radio group value
    if (menuTypeRadiovValue === 0 || menuTypeRadiovValue === 1) {
      values.menuType = menuTypeRadiovValue;
      console.log("valeus......", values);
      setConfirmLoading(true);
      try {
        const response = await addMenuItemApi(values);
        messageApi.success(response.data);
      } catch (error: any) {
        messageApi.error(error.message);
      } finally {
        setOpen(false);
        setConfirmLoading(false);
        dispatch(fetchSystemMenuList());
      }
    } else {
      messageApi.warning("Menu Type Value is Invalid!");
    }
  };

  const handleCancel = () => {
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

  useEffect(() => {
    console.log("check readiaoidad", menuTypeRadiovValue);
  }, [menuTypeRadiovValue]);

  return (
    <div>
      <Spin spinning={pageLoading} />
      {messageContextHolder}
      <Modal
        title="Add Level One Menu Item"
        open={open}
        width="55vw"
        footer={(_, e) => (
          <>
            <Form.Item>
              <Space>
                <SubmitButton form={form}>Submit</SubmitButton>
                <Button htmlType="reset">Reset</Button>
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
                  disabled={false}
                  placeholder="Parent Level Menu"
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item name="icon" label="Menu Icon" rules={[{ required: true }]}>
                <Input placeholder="Displaying icon of the menu item" />
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
              <Form.Item name="menuType" label="Item Type">
                <Radio.Group onChange={onRadioChange} value={menuTypeRadiovValue} defaultValue={0}>
                  <Radio value={0}>Menu</Radio>
                  <Radio value={1}>API</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button onClick={showAddMenuModal}>Add Level-One Menu</Button>
      <Divider></Divider>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default MenuManagement;
