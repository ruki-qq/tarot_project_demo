import React from "react";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { ReactComponent as Logo } from "../assets/logo.svg";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export const Header = () => {
  const store = useStore();
  const navigate = useNavigate();

  const onLogout = () => {
    store.signOut().then(() => navigate("/"));
  };

  const headerMenu = (
    <Menu
      mode="horizontal"
      style={{
        backgroundColor: "#f5f5f5",
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Menu.Item>
        <Link to="/teams">Команды</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/employees">Сотрудники</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/candidates">Кандидаты</Link>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      style={{
        backgroundColor: "#f5f5f5",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
      {headerMenu}
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
        />
      </Dropdown>
    </AntHeader>
  );
};
