import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Grid, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const menuItems = [
  {
    title: "Команды",
    icon: <TeamOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
    link: "/teams",
  },
  {
    title: "Сотрудники",
    icon: <TeamOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
    link: "/employees",
  },
  {
    title: "Кандидаты",
    icon: <UserOutlined style={{ fontSize: "24px", color: "#52c41a" }} />,
    link: "/candidates",
  },
];

export const HomePage = () => {
  const screens = useBreakpoint();

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {menuItems.map((item, index) => (
        <Link to={item.link} key={index} style={{ textDecoration: "none" }}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "10px",
              height: screens.xs ? "100px" : "150px",
              width: screens.xs ? "100px" : "150px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            <div>{item.icon}</div>
            <Text style={{ marginTop: "10px", fontSize: "14px" }}>
              {item.title}
            </Text>
          </Card>
        </Link>
      ))}
    </div>
  );
};
