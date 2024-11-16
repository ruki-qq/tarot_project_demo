import React from "react";
import { employees } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  Tag,
  Space,
  Avatar,
  Divider,
  Spin,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../business/employee";
import { isEmpty } from "../utils";

const { Text, Title } = Typography;

export const EmployeePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: employee = undefined,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => getEmployee(id),
  });

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (isError || isEmpty(employee)) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Title level={3}>Такого сотрудника не существует!</Title>
        <Button type="primary" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Buttons */}
      <Space style={{ marginBottom: "20px" }}>
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <Button
          type="primary"
          onClick={() => navigate(`/employee-matching/${employee.id}`)}
        >
          🔮 Сравнить
        </Button>
      </Space>

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
            {employee.full_name[0]}
          </Avatar>
          <Title level={4}>{employee.full_name}</Title>
          <Text type="secondary">{employee.position}</Text>

          {/* Description */}
          <div style={{ marginTop: "15px" }}>
            <Text>{employee.bio}</Text>
          </div>
        </Space>

        <Divider />

        <Space direction="vertical">
          <div style={{ marginTop: "15px" }}>
            Дата рождения: {employee.birth_date}
          </div>

          {employee.birth_time && (
            <div style={{ marginTop: "15px" }}>
              Время рождения: {employee.birth_time}
            </div>
          )}
        </Space>
        <Divider />

        {/* Contact Information */}
        <Space
          direction="vertical"
          style={{ marginTop: "20px", width: "100%" }}
        >
          {/* Skills Section */}
          <div style={{ marginTop: "10px" }}>
            <Text strong>Hard Skills: </Text>
            <Space wrap>
              {employee.hard_skills.split(", ").map((skill, index) => (
                <Tag color="blue" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Text strong>Soft Skills: </Text>
            <Space wrap>
              {employee.soft_skills.split(", ").map((skill, index) => (
                <Tag color="green" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
};
