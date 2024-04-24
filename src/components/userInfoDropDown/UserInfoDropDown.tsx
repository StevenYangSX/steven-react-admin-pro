import React, { createContext } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space, Modal } from "antd";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { userLogout } from "@/store/slices/userInfoSlice";

import { useSelector } from "react-redux";
import { selectUserName } from "@/store/slices/userInfoSlice"; // Import the selector

const UserInfoDropDown: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const ReachableContext = createContext<string | null>(null);
  const userName = useSelector(selectUserName);
  const logoutConfirmation = "Are you sure to logout ?";
  const logoutModalConfig = {
    title: "User Logout",
    content: <ReachableContext.Consumer>{(name) => name}</ReachableContext.Consumer>,
  };

  const popModal = async (config: any) => {
    const userConfirmed = await modal.confirm(config);
    if (userConfirmed) {
      dispatch(userLogout());
    }
  };

  const dropDownItemOnClickHandler = (key: string, modalConfig?: object) => {
    switch (parseInt(key)) {
      case 1:
        break;
      case 2:
        popModal(modalConfig);

        break;
      default:
        console.error("No matched key");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "User Center",
      onClick: (menuItem) => dropDownItemOnClickHandler(menuItem.key),
    },
    {
      key: "2",
      danger: true,
      label: "Logout",
      onClick: (menuItem) => dropDownItemOnClickHandler(menuItem.key, logoutModalConfig),
    },
  ];

  return (
    <div style={{ margin: "0 16px 0 0 " }}>
      <ReachableContext.Provider value={logoutConfirmation}>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {userName}
              {/* <DownOutlined /> */}
            </Space>
          </a>
        </Dropdown>
        {contextHolder}
      </ReachableContext.Provider>
    </div>
  );
};

export default UserInfoDropDown;
