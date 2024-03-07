import React, { useState } from "react";
import { Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "/page1", <PieChartOutlined />),
  getItem("Option 2", "/page2", <DesktopOutlined />),
  getItem("Option 3", "/page3", <UserOutlined />, [
    getItem("Tom", "/page3/page301"),
    getItem("Bill", "/page3/page302"),
    getItem("Alex", "/page3/page303"),
  ]),
  getItem("Team", "page4", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
  getItem("Files", "9", <FileOutlined />),
];

const MainMenu: React.FC = () => {
  const navigateTo = useNavigate();

  const currentPath = useLocation();
  console.log("currentPath...", currentPath.pathname);
  const [openKeys, setOpenKeys] = useState([currentPath.pathname]);
  const menuItemClick = (e: { key: string }) => {
    navigateTo(e.key);
  };

  const handleMenuOpenChange = (keys: string[]) => {
    console.log("keys...", keys);
    setOpenKeys([keys[keys.length - 1]]);
  };

  return (
    <div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[currentPath.pathname]}
        mode="inline"
        items={items}
        onClick={menuItemClick}
        onOpenChange={handleMenuOpenChange}
        openKeys={openKeys}
      />
    </div>
  );
};

export default MainMenu;
