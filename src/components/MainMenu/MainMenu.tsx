import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import Icon from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "@/store";
import MenuItem from "antd/es/menu/MenuItem";
import { SystemMenuItem, SysterUserInfo } from "@/types/systemDataTypes";
import DynamicIcon from "../dynamicIcon/DynamicIcon";
type MenuItem = Required<MenuProps>["items"][number];

function menuListItemConverter(systemMenuList: SystemMenuItem[]) {
  let result: any = [];
  systemMenuList.forEach((element) => {
    if (!element.children || element.children.length === 0) {
      result.push(
        getItem(
          element.menuName,
          element.path,
          <DynamicIcon iconName={element.icon} />,
          undefined,
          element.uniqAuth
        )
      );
    } else {
      result.push(
        getItem(
          element.menuName,
          element.path,
          <DynamicIcon iconName={element.icon} />,
          menuListItemConverter(element.children),
          element.uniqAuth
        )
      );
    }
  });

  return result;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  uniqAuth?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    uniqAuth,
  } as MenuItem;
}

const MainMenu: React.FC = () => {
  const navigateTo = useNavigate();

  const [menuItems, setMenuItems] = useState<SystemMenuItem[]>([]);

  const currentPath = useLocation();
  const [openKeys, setOpenKeys] = useState([currentPath.pathname]);

  // Get menuList from store (storage)
  const systemMenuList = useSelector((state: RootState) => state.userInfoReducer.menuList);
  // Get userInfo from store (storage)
  const userInfo: any = useSelector((state: RootState) => state.userInfoReducer.userInfo);

  const menuItemClick = (e: { key: string }) => {
    navigateTo(e.key);
  };

  const userAccessFilter = (systemMenuList: SystemMenuItem[]) => {
    let temp = systemMenuList.filter((ele) => {
      return userInfo.access.includes(ele.uniqAuth);
    });
    temp.map((ele) => {
      if (ele.children && ele.children.length) {
        ele.children = ele.children.filter((item) => {
          return userInfo.access.includes(item.uniqAuth);
        });
      }
    });
    return temp;
  };

  const handleMenuOpenChange = (keys: string[]) => {
    setOpenKeys([keys[keys.length - 1]]);
  };

  useEffect(() => {
    console.log("system....listlkkkklllllll", systemMenuList);
    if (systemMenuList) {
      //   TODO : userAccessFilter has problem! When menu added, user access will not updated!
      setMenuItems(userAccessFilter(menuListItemConverter(systemMenuList)));
    }
  }, [systemMenuList]);

  useEffect(() => {
    let pathPrefix = currentPath.pathname.split("/");
    setOpenKeys(["/" + pathPrefix[1]]);
  }, [currentPath.pathname]);
  return (
    <div>
      <Menu
        style={{ userSelect: "none" }}
        theme="dark"
        defaultSelectedKeys={[currentPath.pathname]}
        selectedKeys={[currentPath.pathname]}
        mode="inline"
        items={menuItems}
        onClick={menuItemClick}
        onOpenChange={handleMenuOpenChange}
        openKeys={openKeys}
        selectable={false}
      />
    </div>
  );
};

export default MainMenu;
