import { loginApi } from "@/api/authentication";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, message, theme } from "antd";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "@/store/userInfoSlice";

type LoginType = "phone" | "account";

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>("account");
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();

  const onSubmit = (p1: any) => {
    console.log("111", p1);
    let payload = { username: p1.username, password: p1.password };

    loginApi(payload)
      .then((res) => {
        //TODO after login success
        // 1. update store, set login => true, set userInfo => user, set token => token...
        console.log("login res...", res.data.token);

        dispatch(userLogin(res.data.token));
        navigate("/");
      })
      .catch((err) => {
        console.log("err...", err);
        messageApi.open({
          type: "error",
          content: err.message,
        });
      });
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      {contextHolder}
      <LoginFormPage
        onFinish={async (values) => {
          await onSubmit(values);
          return true;
        }}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="React Admin"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        subTitle="Steven-React-Admin-Pro"
        activityConfig={{
          style: {
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(4px)",
          },
          title: "活动标题，可配置图片",
          subTitle: "活动介绍说明文字",
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
            >
              去看看
            </Button>
          ),
        }}
      >
        {/* <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
          <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
        </Tabs> */}
        {loginType === "account" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"User name"}
              rules={[
                {
                  required: true,
                  message: "Please enter username!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"密码: ant.design"}
              rules={[
                {
                  required: true,
                  message: "Please enter password！",
                },
              ]}
            />
          </>
        )}

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
