import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import ReactSvg from "../../assets/nodejs.png";
import authService from "../../api/auth.service";

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const keys = JSON.parse(localStorage.getItem("keyPath"));
  const [openKeys, setOpenKeys] = useState(keys ? keys[keys.length - 1] : []);
  const path = location.pathname;
  const [current, setCurrent] = useState(["dashboard"]);
  const [items, setItems] = useState([]);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    navigate(e.key);
    setOpenKeys(e.keyPath);

    const y = JSON.parse(localStorage.getItem("keyPath")) || [];

    localStorage.setItem("keyPath", JSON.stringify([...y, e.keyPath]));
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  useEffect(() => {
    const x = [...path.split("/")];
    console.log("ppppppppppppp", x);
    setCurrent(x.length > 2 ? x[x.length - 1] : "");
    const y = JSON.parse(localStorage.getItem("keyPath")) || [];

    setOpenKeys(y ? y[y.length - 1] : []);
  }, [path]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const getItems = async () => {
    const items2 = [
      (await authService.checkPermmision("users", "read")) &&
        getItem("Dashboard", "", <DashboardOutlined />),
      getItem("State", "state", <DashboardOutlined />),

      // getItem("Setting", "sub1", <MailOutlined />, [
      //   (await authService.checkPermmision("state", "read")) &&
      //     getItem("State", "state", <DashboardOutlined />),
      //   getItem("Option 2", "2"),
      //   getItem("Option 3", "3"),
      //   getItem("Option 4", "4"),
      // ]),

      // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      //   getItem("Option 5", "5"),
      //   getItem("Option 6", "6"),
      //   getItem("Submenu", "sub3", null, [
      //     getItem("Option 7", "7"),
      //     getItem("Option 8", "8"),
      //   ]),
      // ]),
      // getItem("Navigation Three", "sub4", <SettingOutlined />, [
      //   getItem("Option 9", "9"),
      //   getItem("Option 10", "10"),
      //   getItem("Option 11", "11"),
      //   getItem("Option 12", "12"),
      // ]),

      // getItem("setting", "15"),
      // getItem("setting", "16"),
    ];

    setItems(items2);
  };

  return (
    <SidebarStyle
      width={250}
      style={{
        height: "100vh",
        borderRight: "1px solid gray",
        position: "fixed",
        display: collapsed && "none",
        backgroundColor: "#00365C",
        zIndex: 110,
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <div
        className="flex justify-center items-center"
        style={{ width: 249, height: 180, background: "#00365C" }}
      >
        <NavLink to={"/home"}>
          <img
            src={ReactSvg}
            color="white"
            className="w-40  text-white border-red-800"
            alt="MK Logo"
          />
        </NavLink>
      </div>
      <div className="sidebar__menus">
        <Menu
          theme={"dark"}
          onClick={onClick}
          style={{
            backgroundColor: "transparent",
          }}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={current}
          mode="inline"
          items={items}
        />
      </div>
    </SidebarStyle>
  );
};

const SidebarStyle = styled(Sider)`
  .sidebar__menus {
    overflow: auto;
    overflow-x: hidden;
    height: calc(100vh - 100px);
  }
  .ant-menu-sub {
    background-color: transparent !important;
  }

  .ant-menu-item-selected {
    background-color: #19588b !important;
  }
  span {
    font-size: 16px !important;
    color: white !important;
  }
`;

export default Sidebar;
