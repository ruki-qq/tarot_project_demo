import React from "react";
import { employees } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Card, Space, Avatar, Divider } from "antd";

const { Text, Title } = Typography;

export const EmployeePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const employee = employees.find((employee) => employee.id === parseInt(id));

  if (typeof employee === "undefined") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Title level={3}>Такого сотрудника не существует!</Title>
        <Button type="primary" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Title level={3}>Employee not found!</Title>
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Back Button */}
      <Button style={{ marginBottom: "20px" }} onClick={() => navigate(-1)}>
        Назад
      </Button>

      {/* Employee Detail Card */}
      <Card
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header: Avatar and Name */}
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Avatar size={100} src={employee.avatar}>
            {employee.name[0]}
          </Avatar>
          <Title level={4}>{employee.name}</Title>
          <Text type="secondary">{employee.role}</Text>
        </Space>

        <Divider />

        {/* Contact Information */}
        <Space
          direction="vertical"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <div>
            <Text strong>Email:</Text> <Text>{employee.email}</Text>
          </div>
          <div>
            <Text strong>Phone:</Text> <Text>{employee.phone}</Text>
          </div>
        </Space>

        <Divider />

        {/* Bio */}
        <div style={{ marginTop: "20px" }}>
          <Title level={5}>Bio</Title>
          <Text>{employee.bio}</Text>
        </div>
      </Card>
    </div>
  );
};
