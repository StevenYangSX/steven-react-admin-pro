import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import MainMenu from "@/components/mainMenu/MainMenu";
import UserInfoDropDown from "@/components/userInfoDropDown/UserInfoDropDown";

const { Header, Content, Footer, Sider } = Layout;
const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width="230px"
      >
        <div className="demo-logo-vertical" />
        <MainMenu />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Breadcrumb style={{ margin: "0 0 0 16px" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <UserInfoDropDown />
        </Header>
        <Content style={{ margin: "16px 16px  0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center", padding: 0, lineHeight: "48px" }}>
          Created by Steven Yang
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
